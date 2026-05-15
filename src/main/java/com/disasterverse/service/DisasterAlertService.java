package com.disasterverse.service;

import com.disasterverse.dto.request.CreateAlertRequest;
import com.disasterverse.dto.response.AlertResponse;

import java.util.List;

public interface DisasterAlertService {
    AlertResponse createAlert(CreateAlertRequest request);
    List<AlertResponse> getAllAlerts();
    List<AlertResponse> getActiveAlerts();
}