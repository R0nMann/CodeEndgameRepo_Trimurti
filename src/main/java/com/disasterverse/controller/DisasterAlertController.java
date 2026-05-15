package com.disasterverse.controller;

import com.disasterverse.dto.request.CreateAlertRequest;
import com.disasterverse.dto.response.AlertResponse;
import com.disasterverse.dto.response.ApiResponse;
import com.disasterverse.service.DisasterAlertService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/alerts")
@RequiredArgsConstructor
@Tag(name = "Disaster Alerts", description = "Create and fetch disaster alerts")
public class DisasterAlertController {

    private final DisasterAlertService disasterAlertService;

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Create a new disaster alert", security = @SecurityRequirement(name = "BearerAuth"))
    public ResponseEntity<ApiResponse<AlertResponse>> createAlert(
            @Valid @RequestBody CreateAlertRequest request) {
        AlertResponse response = disasterAlertService.createAlert(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success("Alert created successfully", response));
    }

    @GetMapping
    @Operation(summary = "Get all disaster alerts")
    public ResponseEntity<ApiResponse<List<AlertResponse>>> getAllAlerts() {
        List<AlertResponse> alerts = disasterAlertService.getAllAlerts();
        return ResponseEntity.ok(ApiResponse.success("Alerts fetched successfully", alerts));
    }

    @GetMapping("/active")
    @Operation(summary = "Get all active disaster alerts")
    public ResponseEntity<ApiResponse<List<AlertResponse>>> getActiveAlerts() {
        List<AlertResponse> alerts = disasterAlertService.getActiveAlerts();
        return ResponseEntity.ok(ApiResponse.success("Active alerts fetched successfully", alerts));
    }
}