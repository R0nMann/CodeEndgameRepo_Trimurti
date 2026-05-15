const BASE_URL = "https://disasterverse-backend-nnez.onrender.com/api/v1";

function getToken(): string | null {
  return localStorage.getItem("dv_token");
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  const data = await res.json();

  if (!data.success) {
    throw new Error(data.message || "Request failed");
  }
  return data.data as T;
}

// ─── Auth ────────────────────────────────────────────────────────────────────

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  role: string;
  token: string;
}

export const authApi = {
  signup: (body: { fullName: string; email: string; password: string }) =>
    request<AuthUser>("/auth/signup", { method: "POST", body: JSON.stringify(body) }),

  login: (body: { email: string; password: string }) =>
    request<AuthUser>("/auth/login", { method: "POST", body: JSON.stringify(body) }),
};

// ─── Alerts ──────────────────────────────────────────────────────────────────

export type DisasterType =
  | "EARTHQUAKE" | "FLOOD" | "FIRE" | "HURRICANE"
  | "TORNADO" | "TSUNAMI" | "LANDSLIDE" | "OTHER";

export type Severity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface Alert {
  id: string;
  title: string;
  description?: string;
  disasterType: DisasterType;
  severity: Severity;
  latitude?: number;
  longitude?: number;
  active: boolean;
  createdAt: string;
  updatedAt?: string;
}

export const alertsApi = {
  getAll: () => request<Alert[]>("/alerts"),
  getActive: () => request<Alert[]>("/alerts/active"),
  create: (body: {
    title: string;
    description?: string;
    disasterType: DisasterType;
    severity: Severity;
    latitude?: number;
    longitude?: number;
  }) => request<Alert>("/alerts", { method: "POST", body: JSON.stringify(body) }),
};

// ─── SOS ─────────────────────────────────────────────────────────────────────

export type SOSStatus = "PENDING" | "ACTIVE" | "RESOLVED";

export interface SOSReport {
  id: string;
  userId?: string;
  userFullName?: string;
  message: string;
  latitude?: number;
  longitude?: number;
  status: SOSStatus;
  createdAt: string;
  updatedAt?: string;
}

export const sosApi = {
  getAll: () => request<SOSReport[]>("/sos"),
  create: (body: { message: string; latitude?: number; longitude?: number }) =>
    request<SOSReport>("/sos", { method: "POST", body: JSON.stringify(body) }),
  updateStatus: (id: string, status: SOSStatus) =>
    request<SOSReport>(`/sos/status/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
};

// ─── Dashboard ───────────────────────────────────────────────────────────────

export interface DashboardStats {
  totalAlerts: number;
  activeAlerts: number;
  totalSosReports: number;
  pendingSosReports: number;
  activeSosReports: number;
  resolvedSosReports: number;
}

export const dashboardApi = {
  getStats: () => request<DashboardStats>("/dashboard/stats"),
};