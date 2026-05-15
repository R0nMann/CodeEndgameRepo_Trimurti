package com.disasterverse.dto.response;

import com.disasterverse.entity.DisasterAlert;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AlertResponse {
    private UUID id;
    private String title;
    private String description;
    private DisasterAlert.DisasterType disasterType;
    private DisasterAlert.Severity severity;
    private Double latitude;
    private Double longitude;
    private Boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static AlertResponse from(DisasterAlert alert) {
        return AlertResponse.builder()
                .id(alert.getId())
                .title(alert.getTitle())
                .description(alert.getDescription())
                .disasterType(alert.getDisasterType())
                .severity(alert.getSeverity())
                .latitude(alert.getLatitude())
                .longitude(alert.getLongitude())
                .active(alert.getActive())
                .createdAt(alert.getCreatedAt())
                .updatedAt(alert.getUpdatedAt())
                .build();
    }
}