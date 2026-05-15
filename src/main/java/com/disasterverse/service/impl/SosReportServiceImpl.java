package com.disasterverse.service.impl;

import com.disasterverse.dto.request.SosRequest;
import com.disasterverse.dto.request.UpdateSosStatusRequest;
import com.disasterverse.dto.response.SosResponse;
import com.disasterverse.entity.SosReport;
import com.disasterverse.entity.User;
import com.disasterverse.exception.ResourceNotFoundException;
import com.disasterverse.repository.SosReportRepository;
import com.disasterverse.repository.UserRepository;
import com.disasterverse.service.SosReportService;
import com.disasterverse.websocket.SosPublisher;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SosReportServiceImpl implements SosReportService {

    private final SosReportRepository sosReportRepository;
    private final UserRepository userRepository;
    private final SosPublisher sosPublisher;

    @Override
    @Transactional
    public SosResponse createSosReport(SosRequest request, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", userEmail));

        SosReport report = SosReport.builder()
                .user(user)
                .message(request.getMessage())
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .status(SosReport.SosStatus.PENDING)
                .build();

        SosReport saved = sosReportRepository.save(report);
        SosResponse response = SosResponse.from(saved);

        // Broadcast via WebSocket
        sosPublisher.publishSos(response);

        return response;
    }

    @Override
    @Transactional(readOnly = true)
    public List<SosResponse> getAllSosReports() {
        return sosReportRepository.findByOrderByCreatedAtDesc()
                .stream()
                .map(SosResponse::from)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SosResponse updateSosStatus(UUID id, UpdateSosStatusRequest request) {
        SosReport report = sosReportRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("SosReport", "id", id));

        report.setStatus(request.getStatus());
        SosReport updated = sosReportRepository.save(report);
        SosResponse response = SosResponse.from(updated);

        // Broadcast status update via WebSocket
        sosPublisher.publishSos(response);

        return response;
    }
}