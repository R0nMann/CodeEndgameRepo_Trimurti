package com.disasterverse.enums;

/**
 * Represents the type of disaster for an alert.
 * Mirrors DisasterAlert.DisasterType — used for OpenAPI docs and external references.
 */
public enum DisasterType {
    EARTHQUAKE,
    FLOOD,
    FIRE,
    HURRICANE,
    TORNADO,
    TSUNAMI,
    LANDSLIDE,
    OTHER
}