package com.disasterverse.controller;

import com.disasterverse.dto.request.SosRequest;
import com.disasterverse.dto.request.UpdateSosStatusRequest;
import com.disasterverse.dto.response.ApiResponse;
import com.disasterverse.dto.response.SosResponse;
import com.disasterverse.service.SosReportService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/sos")
@RequiredArgsConstructor
@Tag(name = "SOS Reports", description = "Create and manage SOS emergency reports")
public class SosReportController {

    private final SosReportService sosReportService;

    @PostMapping
    @Operation(summary = "Submit a new SOS report", security = @SecurityRequirement(name = "BearerAuth"))
    public ResponseEntity<ApiResponse<SosResponse>> createSosReport(
            @Valid @RequestBody SosRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        SosResponse response = sosReportService.createSosReport(request, userDetails.getUsername());
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success("SOS report submitted successfully", response));
    }

    @GetMapping
    @Operation(summary = "Get all SOS reports", security = @SecurityRequirement(name = "BearerAuth"))
    public ResponseEntity<ApiResponse<List<SosResponse>>> getAllSosReports() {
        List<SosResponse> reports = sosReportService.getAllSosReports();
        return ResponseEntity.ok(ApiResponse.success("SOS reports fetched successfully", reports));
    }

    @PatchMapping("/status/{id}")
    @Operation(summary = "Update SOS report status", security = @SecurityRequirement(name = "BearerAuth"))
    public ResponseEntity<ApiResponse<SosResponse>> updateSosStatus(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateSosStatusRequest request) {
        SosResponse response = sosReportService.updateSosStatus(id, request);
        return ResponseEntity.ok(ApiResponse.success("SOS status updated successfully", response));
    }
}