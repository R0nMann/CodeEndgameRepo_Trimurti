import { useState, useEffect, useCallback } from "react";
import {
  alertsApi, Alert, DisasterType, Severity,
  sosApi, SOSReport, SOSStatus,
  dashboardApi, DashboardStats,
} from "../lib/api";

// ─── Alerts Hook ─────────────────────────────────────────────────────────────

export function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [activeAlerts, setActiveAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAlerts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [all, active] = await Promise.all([
        alertsApi.getAll(),
        alertsApi.getActive(),
      ]);
      setAlerts(all);
      setActiveAlerts(active);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to fetch alerts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAlerts(); }, [fetchAlerts]);

  const createAlert = async (body: {
    title: string;
    description?: string;
    disasterType: DisasterType;
    severity: Severity;
    latitude?: number;
    longitude?: number;
  }) => {
    const newAlert = await alertsApi.create(body);
    setAlerts((prev) => [newAlert, ...prev]);
    if (newAlert.active) setActiveAlerts((prev) => [newAlert, ...prev]);
    return newAlert;
  };

  return { alerts, activeAlerts, loading, error, refetch: fetchAlerts, createAlert };
}

// ─── SOS Hook ────────────────────────────────────────────────────────────────

export function useSOS() {
  const [reports, setReports] = useState<SOSReport[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchReports = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await sosApi.getAll();
      setReports(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to fetch SOS reports");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchReports(); }, [fetchReports]);

  const submitSOS = async (body: {
    message: string;
    latitude?: number;
    longitude?: number;
  }) => {
    const report = await sosApi.create(body);
    setReports((prev) => [report, ...prev]);
    return report;
  };

  const updateStatus = async (id: string, status: SOSStatus) => {
    const updated = await sosApi.updateStatus(id, status);
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: updated.status } : r))
    );
    return updated;
  };

  return { reports, loading, error, refetch: fetchReports, submitSOS, updateStatus };
}

// ─── Dashboard Hook ───────────────────────────────────────────────────────────

export function useDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await dashboardApi.getStats();
      setStats(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to fetch stats");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchStats(); }, [fetchStats]);

  return { stats, loading, error, refetch: fetchStats };
}