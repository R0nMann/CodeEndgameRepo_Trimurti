package com.disasterverse.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "sos_reports")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SosReport extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String message;

    private Double latitude;
    private Double longitude;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private SosStatus status = SosStatus.PENDING;

    public enum SosStatus {
        PENDING, ACTIVE, RESOLVED
    }
}