package com.disasterverse.dto.request;

import com.disasterverse.entity.SosReport;

import jakarta.validation.constraints.NotNull;
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
public class UpdateSosStatusRequest {

    @NotNull(message = "Status is required")
    private SosReport.SosStatus status;
}