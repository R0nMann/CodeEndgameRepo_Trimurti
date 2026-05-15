package com.disasterverse.service;

import com.disasterverse.dto.request.SosRequest;
import com.disasterverse.dto.request.UpdateSosStatusRequest;
import com.disasterverse.dto.response.SosResponse;

import java.util.List;
import java.util.UUID;

public interface SosReportService {
    SosResponse createSosReport(SosRequest request, String userEmail);
    List<SosResponse> getAllSosReports();
    SosResponse updateSosStatus(UUID id, UpdateSosStatusRequest request);
}