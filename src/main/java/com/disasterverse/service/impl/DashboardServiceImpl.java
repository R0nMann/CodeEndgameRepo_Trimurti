package com.disasterverse.service.impl;

import com.disasterverse.dto.response.DashboardStatsResponse;
import com.disasterverse.entity.SosReport;
import com.disasterverse.repository.DisasterAlertRepository;
import com.disasterverse.repository.SosReportRepository;
import com.disasterverse.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final DisasterAlertRepository disasterAlertRepository;
    private final SosReportRepository sosReportRepository;

    @Override
    @Transactional(readOnly = true)
    public DashboardStatsResponse getStats() {
        long totalAlerts = disasterAlertRepository.count();
        long activeAlerts = disasterAlertRepository.countByActiveTrue();

        long totalSosReports = sosReportRepository.count();
        long pendingSos = sosReportRepository.countByStatus(SosReport.SosStatus.PENDING);
        long activeSos = sosReportRepository.countByStatus(SosReport.SosStatus.ACTIVE);
        long resolvedSos = sosReportRepository.countByStatus(SosReport.SosStatus.RESOLVED);

        return DashboardStatsResponse.builder()
                .totalAlerts(totalAlerts)
                .activeAlerts(activeAlerts)
                .totalSosReports(totalSosReports)
                .pendingSosReports(pendingSos)
                .activeSosReports(activeSos)
                .resolvedSosReports(resolvedSos)
                .build();
    }
}