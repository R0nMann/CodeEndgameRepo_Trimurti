package com.disasterverse.service.impl;

import com.disasterverse.dto.request.CreateAlertRequest;
import com.disasterverse.dto.response.AlertResponse;
import com.disasterverse.entity.DisasterAlert;
import com.disasterverse.exception.ResourceNotFoundException;
import com.disasterverse.repository.DisasterAlertRepository;
import com.disasterverse.service.DisasterAlertService;
import com.disasterverse.websocket.AlertPublisher;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DisasterAlertServiceImpl implements DisasterAlertService {

    private final DisasterAlertRepository disasterAlertRepository;
    private final AlertPublisher alertPublisher;

    @Override
    @Transactional
    public AlertResponse createAlert(CreateAlertRequest request) {
        DisasterAlert alert = DisasterAlert.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .disasterType(request.getDisasterType())
                .severity(request.getSeverity())
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .active(true)
                .build();

        DisasterAlert saved = disasterAlertRepository.save(alert);
        AlertResponse response = AlertResponse.from(saved);

        // Broadcast via WebSocket
        alertPublisher.publishAlert(response);

        return response;
    }

    @Override
    @Transactional(readOnly = true)
    public List<AlertResponse> getAllAlerts() {
        return disasterAlertRepository.findAll()
                .stream()
                .map(AlertResponse::from)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<AlertResponse> getActiveAlerts() {
        return disasterAlertRepository.findByActiveTrue()
                .stream()
                .map(AlertResponse::from)
                .collect(Collectors.toList());
    }
}