package com.disasterverse.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardStatsResponse {
    private long totalAlerts;
    private long activeAlerts;
    private long totalSosReports;
    private long pendingSosReports;
    private long activeSosReports;
    private long resolvedSosReports;
}