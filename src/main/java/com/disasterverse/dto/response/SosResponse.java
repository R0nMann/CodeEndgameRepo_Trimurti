package com.disasterverse.dto.response;

import com.disasterverse.entity.SosReport;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SosResponse {
    private UUID id;
    private UUID userId;
    private String userFullName;
    private String message;
    private Double latitude;
    private Double longitude;
    private SosReport.SosStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static SosResponse from(SosReport report) {
        return SosResponse.builder()
                .id(report.getId())
                .userId(report.getUser().getId())
                .userFullName(report.getUser().getFullName())
                .message(report.getMessage())
                .latitude(report.getLatitude())
                .longitude(report.getLongitude())
                .status(report.getStatus())
                .createdAt(report.getCreatedAt())
                .updatedAt(report.getUpdatedAt())
                .build();
    }
}