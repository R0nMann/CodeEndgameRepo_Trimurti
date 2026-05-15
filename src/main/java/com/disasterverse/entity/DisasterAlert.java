package com.disasterverse.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "disaster_alerts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DisasterAlert extends BaseEntity {

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DisasterType disasterType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Severity severity;

    private Double latitude;
    private Double longitude;

    @Column(nullable = false)
    @Builder.Default
    private Boolean active = true;

    public enum DisasterType {
        EARTHQUAKE, FLOOD, FIRE, HURRICANE, TORNADO, TSUNAMI, LANDSLIDE, OTHER
    }

    public enum Severity {
        LOW, MEDIUM, HIGH, CRITICAL
    }
}