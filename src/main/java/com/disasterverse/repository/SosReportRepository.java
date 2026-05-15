package com.disasterverse.repository;

import com.disasterverse.entity.SosReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SosReportRepository extends JpaRepository<SosReport, UUID> {
    List<SosReport> findByOrderByCreatedAtDesc();
    long countByStatus(SosReport.SosStatus status);
}