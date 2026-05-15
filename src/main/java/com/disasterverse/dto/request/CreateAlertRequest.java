package com.disasterverse.dto.request;

import com.disasterverse.entity.DisasterAlert;

import jakarta.validation.constraints.NotBlank;
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
public class CreateAlertRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    @NotNull(message = "Disaster type is required")
    private DisasterAlert.DisasterType disasterType;

    @NotNull(message = "Severity is required")
    private DisasterAlert.Severity severity;

    private Double latitude;
    private Double longitude;
}