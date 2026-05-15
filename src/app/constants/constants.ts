export const APP_NAME = "DisasterVerse";

export const API_BASE_URL =
  "https://disasterverse-backend-nnez.onrender.com/api/v1";

export const DISASTER_TYPES = [
  "EARTHQUAKE",
  "FLOOD",
  "FIRE",
  "HURRICANE",
  "TORNADO",
  "TSUNAMI",
  "LANDSLIDE",
  "OTHER",
] as const;

export const SEVERITY_LEVELS = [
  "LOW",
  "MEDIUM",
  "HIGH",
  "CRITICAL",
] as const;

export const SOS_STATUS = [
  "PENDING",
  "ACTIVE",
  "RESOLVED",
] as const;