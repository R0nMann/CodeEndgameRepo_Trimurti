// import { useState } from "react";
// import { useAlerts, useSOS, useDashboard } from "../hooks/useData";
// import { DisasterType, Severity, SOSStatus } from "../lib/api";
// import { useAuth } from "../contexts/AuthContext";

// const SEVERITY_COLOR: Record<Severity, string> = {
//   CRITICAL: "#ef4444",
//   HIGH: "#f97316",
//   MEDIUM: "#eab308",
//   LOW: "#22c55e",
// };

// const STATUS_COLOR: Record<SOSStatus, string> = {
//   PENDING: "#eab308",
//   ACTIVE: "#f97316",
//   RESOLVED: "#22c55e",
// };

// // ─── Create Alert Form ───────────────────────────────────────────────────────

// function CreateAlertForm({ onCreated }: { onCreated: () => void }) {
//   const { createAlert } = useAlerts();
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [disasterType, setDisasterType] = useState<DisasterType>("EARTHQUAKE");
//   const [severity, setSeverity] = useState<Severity>("MEDIUM");
//   const [lat, setLat] = useState("");
//   const [lng, setLng] = useState("");
//   const [busy, setBusy] = useState(false);
//   const [err, setErr] = useState("");

//   const submit = async () => {
//     if (!title.trim()) return setErr("Title is required");
//     setBusy(true);
//     setErr("");
//     try {
//       await createAlert({
//         title,
//         description: description || undefined,
//         disasterType,
//         severity,
//         latitude: lat ? parseFloat(lat) : undefined,
//         longitude: lng ? parseFloat(lng) : undefined,
//       });
//       setTitle("");
//       setDescription("");
//       setLat("");
//       setLng("");
//       onCreated();
//     } catch (e: unknown) {
//       setErr(e instanceof Error ? e.message : "Failed");
//     } finally {
//       setBusy(false);
//     }
//   };

//   return (
//     <div className="dv-card">
//       <h3 className="dv-section-title">🚨 Create Alert</h3>
//       <div className="dv-grid-2">
//         <input className="dv-input" placeholder="Title *" value={title} onChange={e => setTitle(e.target.value)} />
//         <input className="dv-input" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
//         <select className="dv-input" value={disasterType} onChange={e => setDisasterType(e.target.value as DisasterType)}>
//           {(["EARTHQUAKE", "FLOOD", "FIRE", "HURRICANE", "TORNADO", "TSUNAMI", "LANDSLIDE", "OTHER"] as DisasterType[]).map(t => (
//             <option key={t} value={t}>{t}</option>
//           ))}
//         </select>
//         <select className="dv-input" value={severity} onChange={e => setSeverity(e.target.value as Severity)}>
//           {(["LOW", "MEDIUM", "HIGH", "CRITICAL"] as Severity[]).map(s => (
//             <option key={s} value={s}>{s}</option>
//           ))}
//         </select>
//         <input className="dv-input" placeholder="Latitude (optional)" value={lat} onChange={e => setLat(e.target.value)} />
//         <input className="dv-input" placeholder="Longitude (optional)" value={lng} onChange={e => setLng(e.target.value)} />
//       </div>
//       {err && <p className="dv-error">{err}</p>}
//       <button className="dv-btn" onClick={submit} disabled={busy}>
//         {busy ? "Submitting…" : "Submit Alert"}
//       </button>
//     </div>
//   );
// }

// // ─── Submit SOS Form ─────────────────────────────────────────────────────────

// function SubmitSOSForm({ onCreated }: { onCreated: () => void }) {
//   const { submitSOS } = useSOS();
//   const [message, setMessage] = useState("");
//   const [lat, setLat] = useState("");
//   const [lng, setLng] = useState("");
//   const [busy, setBusy] = useState(false);
//   const [err, setErr] = useState("");

//   const submit = async () => {
//     if (!message.trim()) return setErr("Message is required");
//     setBusy(true);
//     setErr("");
//     try {
//       await submitSOS({
//         message,
//         latitude: lat ? parseFloat(lat) : undefined,
//         longitude: lng ? parseFloat(lng) : undefined,
//       });
//       setMessage("");
//       setLat("");
//       setLng("");
//       onCreated();
//     } catch (e: unknown) {
//       setErr(e instanceof Error ? e.message : "Failed");
//     } finally {
//       setBusy(false);
//     }
//   };

//   return (
//     <div className="dv-card">
//       <h3 className="dv-section-title">🆘 Submit SOS</h3>
//       <div className="dv-grid-2">
//         <input
//           className="dv-input"
//           style={{ gridColumn: "1/-1" }}
//           placeholder="Describe your situation *"
//           value={message}
//           onChange={e => setMessage(e.target.value)}
//         />
//         <input className="dv-input" placeholder="Latitude (optional)" value={lat} onChange={e => setLat(e.target.value)} />
//         <input className="dv-input" placeholder="Longitude (optional)" value={lng} onChange={e => setLng(e.target.value)} />
//       </div>
//       {err && <p className="dv-error">{err}</p>}
//       <button className="dv-btn dv-btn-orange" onClick={submit} disabled={busy}>
//         {busy ? "Submitting…" : "Send SOS"}
//       </button>
//     </div>
//   );
// }

// // ─── Main Dashboard ──────────────────────────────────────────────────────────

// export default function LiveDashboard() {
//   const { alerts, activeAlerts, loading: aLoading, refetch: refetchAlerts } = useAlerts();
//   const { reports, loading: sLoading, refetch: refetchSOS, updateStatus } = useSOS();
//   const { stats, loading: dLoading, refetch: refetchStats } = useDashboard();

//   const { user } = useAuth(); // ✅ ADDED

//   const refresh = () => {
//     refetchAlerts();
//     refetchSOS();
//     refetchStats();
//   };

//   const handleStatusUpdate = async (id: string, status: SOSStatus) => {
//     try {
//       await updateStatus(id, status);
//       refetchStats();
//     } catch (e: unknown) {
//       alert(e instanceof Error ? e.message : "Failed");
//     }
//   };

//   return (
//     <section id="dashboard" style={{ background: "#0a0a0f", padding: "80px 24px", minHeight: "100vh" }}>
//       <div style={{ maxWidth: 1100, margin: "0 auto" }}>
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40 }}>
//           <h2 style={{ color: "#fff", fontSize: "2rem", fontWeight: 700, margin: 0, letterSpacing: "-0.03em" }}>
//             Live Command Center
//           </h2>
//           <button className="dv-btn dv-btn-ghost" onClick={refresh}>↻ Refresh</button>
//         </div>

//         {/* Stats */}
//         {stats && (
//           <div className="dv-stats-grid">
//             {[
//               { label: "Total Alerts", value: stats.totalAlerts, color: "#ef4444" },
//               { label: "Active Alerts", value: stats.activeAlerts, color: "#f97316" },
//               { label: "Total SOS", value: stats.totalSosReports, color: "#eab308" },
//               { label: "Pending SOS", value: stats.pendingSosReports, color: "#f97316" },
//               { label: "Active SOS", value: stats.activeSosReports, color: "#ef4444" },
//               { label: "Resolved SOS", value: stats.resolvedSosReports, color: "#22c55e" },
//             ].map(s => (
//               <div key={s.label} className="dv-stat-card">
//                 <div className="dv-stat-value" style={{ color: s.color }}>{s.value}</div>
//                 <div className="dv-stat-label">{s.label}</div>
//               </div>
//             ))}
//           </div>
//         )}

//         {dLoading && <p className="dv-loading">Loading stats…</p>}

//         <div className="dv-two-col">
//           <CreateAlertForm onCreated={refresh} />
//           <SubmitSOSForm onCreated={refresh} />
//         </div>

//         {/* Active Alerts */}
//         <div className="dv-card">
//           <h3 className="dv-section-title">⚡ Active Alerts ({activeAlerts.length})</h3>
//           {aLoading ? <p className="dv-loading">Loading…</p> : (
//             <div className="dv-list">
//               {activeAlerts.length === 0 && <p className="dv-empty">No active alerts.</p>}
//               {activeAlerts.map(a => (
//                 <div key={a.id} className="dv-list-item">
//                   <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
//                     <span className="dv-tag" style={{ background: SEVERITY_COLOR[a.severity] + "22", color: SEVERITY_COLOR[a.severity], border: `1px solid ${SEVERITY_COLOR[a.severity]}44` }}>
//                       {a.severity}
//                     </span>
//                     <span className="dv-tag dv-tag-type">{a.disasterType}</span>
//                     <strong style={{ color: "#fff" }}>{a.title}</strong>
//                   </div>
//                   {a.description && <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.83rem", margin: "6px 0 0" }}>{a.description}</p>}
//                   <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", margin: "4px 0 0" }}>
//                     {new Date(a.createdAt).toLocaleString()}
//                     {a.latitude && ` · ${a.latitude.toFixed(4)}, ${a.longitude?.toFixed(4)}`}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* All Alerts */}
//         <div className="dv-card">
//           <h3 className="dv-section-title">📋 All Alerts ({alerts.length})</h3>
//           {aLoading ? <p className="dv-loading">Loading…</p> : (
//             <div className="dv-list">
//               {alerts.length === 0 && <p className="dv-empty">No alerts yet.</p>}
//               {alerts.map(a => (
//                 <div key={a.id} className="dv-list-item">
//                   <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
//                     <span className="dv-tag" style={{ background: SEVERITY_COLOR[a.severity] + "22", color: SEVERITY_COLOR[a.severity], border: `1px solid ${SEVERITY_COLOR[a.severity]}44` }}>{a.severity}</span>
//                     <span className="dv-tag dv-tag-type">{a.disasterType}</span>
//                     <span className="dv-tag" style={{ background: a.active ? "#22c55e22" : "#6b728022", color: a.active ? "#22c55e" : "#9ca3af" }}>
//                       {a.active ? "ACTIVE" : "INACTIVE"}
//                     </span>
//                     <strong style={{ color: "#fff" }}>{a.title}</strong>
//                   </div>
//                   <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", margin: "4px 0 0" }}>
//                     {new Date(a.createdAt).toLocaleString()}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* SOS Reports */}
//         <div className="dv-card">
//           <h3 className="dv-section-title">🆘 SOS Reports ({reports.length})</h3>
//           {sLoading ? <p className="dv-loading">Loading…</p> : (
//             <div className="dv-list">
//               {reports.length === 0 && <p className="dv-empty">No SOS reports.</p>}
//               {reports.map(r => (
//                 <div key={r.id} className="dv-list-item">
//                   <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
//                     <span className="dv-tag" style={{ background: STATUS_COLOR[r.status] + "22", color: STATUS_COLOR[r.status], border: `1px solid ${STATUS_COLOR[r.status]}44` }}>
//                       {r.status}
//                     </span>
//                     {r.userFullName && (
//                       <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.83rem" }}>
//                         {r.userFullName}
//                       </span>
//                     )}
//                   </div>

//                   <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.9rem", margin: "6px 0 4px" }}>
//                     {r.message}
//                   </p>

//                   <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", margin: 0 }}>
//                     {new Date(r.createdAt).toLocaleString()}
//                     {r.latitude && ` · ${r.latitude.toFixed(4)}, ${r.longitude?.toFixed(4)}`}
//                   </p>

//                   {/* ✅ ROLE-BASED ACCESS CONTROL ADDED HERE */}
//                   {user?.role === "ADMIN" && r.status !== "RESOLVED" && (
//                     <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
//                       {r.status === "PENDING" && (
//                         <button
//                           className="dv-btn dv-btn-sm dv-btn-orange"
//                           onClick={() => handleStatusUpdate(r.id, "ACTIVE")}
//                         >
//                           Mark Active
//                         </button>
//                       )}

//                       <button
//                         className="dv-btn dv-btn-sm dv-btn-green"
//                         onClick={() => handleStatusUpdate(r.id, "RESOLVED")}
//                       >
//                         Mark Resolved
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }

import { useState } from "react";
import { motion } from "motion/react";
import {
  AlertTriangle, Send, RefreshCw, Zap, ClipboardList,
  PhoneCall, CheckCircle2, Clock, Activity, ShieldAlert,
  MapPin, Calendar, ChevronRight,
} from "lucide-react";
import { useAlerts, useSOS, useDashboard } from "../hooks/useData";
import { DisasterType, Severity, SOSStatus } from "../lib/api";
import { useAuth } from "../contexts/AuthContext";

// ─── Severity & Status helpers ────────────────────────────────────────────────

const SEVERITY_TW: Record<Severity, { bg: string; text: string; border: string }> = {
  CRITICAL: { bg: "bg-red-500/20",    text: "text-red-400",    border: "border-red-500/30"    },
  HIGH:     { bg: "bg-orange-500/20", text: "text-orange-400", border: "border-orange-500/30" },
  MEDIUM:   { bg: "bg-yellow-500/20", text: "text-yellow-400", border: "border-yellow-500/30" },
  LOW:      { bg: "bg-green-500/20",  text: "text-green-400",  border: "border-green-500/30"  },
};

const STATUS_TW: Record<SOSStatus, { bg: string; text: string; border: string }> = {
  PENDING:  { bg: "bg-yellow-500/20", text: "text-yellow-400", border: "border-yellow-500/30" },
  ACTIVE:   { bg: "bg-orange-500/20", text: "text-orange-400", border: "border-orange-500/30" },
  RESOLVED: { bg: "bg-green-500/20",  text: "text-green-400",  border: "border-green-500/30"  },
};

// ─── Shared input / button classes ───────────────────────────────────────────

const inputCls =
  "w-full bg-slate-800/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all duration-200";

const primaryBtn =
  "flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-semibold hover:opacity-90 active:scale-95 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed";

const orangeBtn =
  "flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-semibold hover:opacity-90 active:scale-95 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed";

const ghostBtn =
  "flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/60 border border-white/10 text-slate-300 text-sm font-medium hover:bg-slate-700/60 hover:text-white transition-all duration-200";

const smGreenBtn =
  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-semibold hover:bg-green-500/30 transition-all duration-200";

const smOrangeBtn =
  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-semibold hover:bg-orange-500/30 transition-all duration-200";

// ─── Card wrapper ─────────────────────────────────────────────────────────────

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative rounded-2xl backdrop-blur-lg bg-slate-900/50 border border-white/10 hover:border-white/[0.15] transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
}

// ─── Create Alert Form ────────────────────────────────────────────────────────

function CreateAlertForm({ onCreated }: { onCreated: () => void }) {
  const { createAlert } = useAlerts();
  const [title, setTitle]               = useState("");
  const [description, setDescription]   = useState("");
  const [disasterType, setDisasterType] = useState<DisasterType>("EARTHQUAKE");
  const [severity, setSeverity]         = useState<Severity>("MEDIUM");
  const [lat, setLat]                   = useState("");
  const [lng, setLng]                   = useState("");
  const [busy, setBusy]                 = useState(false);
  const [err, setErr]                   = useState("");

  const submit = async () => {
    if (!title.trim()) return setErr("Title is required");
    setBusy(true); setErr("");
    try {
      await createAlert({
        title, description: description || undefined,
        disasterType, severity,
        latitude:  lat ? parseFloat(lat) : undefined,
        longitude: lng ? parseFloat(lng) : undefined,
      });
      setTitle(""); setDescription(""); setLat(""); setLng("");
      onCreated();
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Failed");
    } finally { setBusy(false); }
  };

  return (
    <Card className="p-6">
      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 rounded-2xl" />
      <div className="relative">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4 text-red-400" />
          </div>
          <h3 className="text-white font-bold text-base">Create Alert</h3>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <input className={inputCls} placeholder="Title *"      value={title}       onChange={e => setTitle(e.target.value)} />
          <input className={inputCls} placeholder="Description"  value={description} onChange={e => setDescription(e.target.value)} />
          <select className={`${inputCls} bg-slate-800/60`} value={disasterType} onChange={e => setDisasterType(e.target.value as DisasterType)}>
            {(["EARTHQUAKE","FLOOD","FIRE","HURRICANE","TORNADO","TSUNAMI","LANDSLIDE","OTHER"] as DisasterType[]).map(t => (
              <option key={t} value={t} className="bg-slate-900">{t}</option>
            ))}
          </select>
          <select className={`${inputCls} bg-slate-800/60`} value={severity} onChange={e => setSeverity(e.target.value as Severity)}>
            {(["LOW","MEDIUM","HIGH","CRITICAL"] as Severity[]).map(s => (
              <option key={s} value={s} className="bg-slate-900">{s}</option>
            ))}
          </select>
          <input className={inputCls} placeholder="Latitude"  value={lat} onChange={e => setLat(e.target.value)} />
          <input className={inputCls} placeholder="Longitude" value={lng} onChange={e => setLng(e.target.value)} />
        </div>

        {err && (
          <p className="text-red-400 text-xs mb-3 flex items-center gap-1">
            <ShieldAlert className="w-3 h-3" />{err}
          </p>
        )}

        <button className={primaryBtn} onClick={submit} disabled={busy}>
          <Send className="w-3.5 h-3.5" />
          {busy ? "Submitting…" : "Submit Alert"}
        </button>
      </div>
    </Card>
  );
}

// ─── Submit SOS Form ──────────────────────────────────────────────────────────

function SubmitSOSForm({ onCreated }: { onCreated: () => void }) {
  const { submitSOS } = useSOS();
  const [message, setMessage] = useState("");
  const [lat, setLat]         = useState("");
  const [lng, setLng]         = useState("");
  const [busy, setBusy]       = useState(false);
  const [err, setErr]         = useState("");

  const submit = async () => {
    if (!message.trim()) return setErr("Message is required");
    setBusy(true); setErr("");
    try {
      await submitSOS({ message, latitude: lat ? parseFloat(lat) : undefined, longitude: lng ? parseFloat(lng) : undefined });
      setMessage(""); setLat(""); setLng("");
      onCreated();
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Failed");
    } finally { setBusy(false); }
  };

  return (
    <Card className="p-6">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5 rounded-2xl" />
      <div className="relative">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
            <PhoneCall className="w-4 h-4 text-orange-400" />
          </div>
          <h3 className="text-white font-bold text-base">Submit SOS</h3>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <textarea
            className={`${inputCls} col-span-2 resize-none h-20`}
            placeholder="Describe your situation *"
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <input className={inputCls} placeholder="Latitude"  value={lat} onChange={e => setLat(e.target.value)} />
          <input className={inputCls} placeholder="Longitude" value={lng} onChange={e => setLng(e.target.value)} />
        </div>

        {err && (
          <p className="text-red-400 text-xs mb-3 flex items-center gap-1">
            <ShieldAlert className="w-3 h-3" />{err}
          </p>
        )}

        <button className={orangeBtn} onClick={submit} disabled={busy}>
          <Send className="w-3.5 h-3.5" />
          {busy ? "Submitting…" : "Send SOS"}
        </button>
      </div>
    </Card>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function LiveDashboard() {
  const { alerts, activeAlerts, loading: aLoading, refetch: refetchAlerts } = useAlerts();
  const { reports, loading: sLoading, refetch: refetchSOS, updateStatus }   = useSOS();
  const { stats,   loading: dLoading, refetch: refetchStats }                = useDashboard();
  const { user } = useAuth();

  const refresh = () => { refetchAlerts(); refetchSOS(); refetchStats(); };

  const handleStatusUpdate = async (id: string, status: SOSStatus) => {
    try { await updateStatus(id, status); refetchStats(); }
    catch (e: unknown) { alert(e instanceof Error ? e.message : "Failed"); }
  };

  const statCards = stats ? [
    { label: "Total Alerts",  value: stats.totalAlerts,      icon: ClipboardList, color: "text-red-400",    glow: "from-red-500/10"    },
    { label: "Active Alerts", value: stats.activeAlerts,     icon: Zap,           color: "text-orange-400", glow: "from-orange-500/10" },
    { label: "Total SOS",     value: stats.totalSosReports,  icon: PhoneCall,     color: "text-yellow-400", glow: "from-yellow-500/10" },
    { label: "Pending SOS",   value: stats.pendingSosReports,icon: Clock,         color: "text-orange-400", glow: "from-orange-500/10" },
    { label: "Active SOS",    value: stats.activeSosReports, icon: Activity,      color: "text-red-400",    glow: "from-red-500/10"    },
    { label: "Resolved",      value: stats.resolvedSosReports,icon: CheckCircle2, color: "text-green-400",  glow: "from-green-500/10"  },
  ] : [];

  return (
    <section id="dashboard" className="py-20 px-4 bg-slate-950 relative overflow-hidden">

      {/* Ambient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(239,68,68,0.06),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(6,182,212,0.04),transparent_50%)]" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Live Command Center
            </h2>
            <p className="text-slate-400 text-base">Monitor alerts, manage SOS reports, coordinate response</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={refresh}
            className={ghostBtn}
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Refresh</span>
          </motion.button>
        </motion.div>

        {/* ── Stats Grid ── */}
        {dLoading && (
          <p className="text-slate-500 text-sm text-center mb-10 animate-pulse">Loading stats…</p>
        )}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {statCards.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${s.glow} to-transparent rounded-xl blur-lg group-hover:blur-xl transition-all duration-300`} />
                <div className="relative p-5 rounded-xl backdrop-blur-lg bg-slate-900/50 border border-white/10 hover:border-white/20 transition-all duration-300 text-center">
                  <s.icon className={`w-5 h-5 ${s.color} mx-auto mb-2`} />
                  <div className={`text-3xl font-bold ${s.color} mb-1`}>{s.value}</div>
                  <div className="text-slate-500 text-xs uppercase tracking-wider">{s.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* ── Forms Row ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          <CreateAlertForm onCreated={refresh} />
          <SubmitSOSForm   onCreated={refresh} />
        </motion.div>

        {/* ── Active Alerts ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <Card className="p-6">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent rounded-2xl" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-yellow-400" />
                </div>
                <h3 className="text-white font-bold text-base">Active Alerts</h3>
                <span className="ml-auto px-2 py-0.5 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-xs font-bold">
                  {activeAlerts.length}
                </span>
              </div>

              {aLoading ? (
                <p className="text-slate-500 text-sm text-center py-8 animate-pulse">Loading…</p>
              ) : activeAlerts.length === 0 ? (
                <p className="text-slate-600 text-sm text-center py-8">No active alerts right now.</p>
              ) : (
                <div className="space-y-3">
                  {activeAlerts.map((a, i) => {
                    const sev = SEVERITY_TW[a.severity];
                    return (
                      <motion.div
                        key={a.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-3 p-4 rounded-xl bg-slate-800/40 border border-white/[0.06] hover:border-white/10 transition-all duration-200"
                      >
                        <ChevronRight className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap gap-2 mb-1.5">
                            <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold border ${sev.bg} ${sev.text} ${sev.border}`}>
                              {a.severity}
                            </span>
                            <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                              {a.disasterType}
                            </span>
                          </div>
                          <p className="text-white text-sm font-semibold truncate">{a.title}</p>
                          {a.description && <p className="text-slate-500 text-xs mt-0.5 line-clamp-1">{a.description}</p>}
                          <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-600">
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(a.createdAt).toLocaleString()}</span>
                            {a.latitude && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{a.latitude.toFixed(3)}, {a.longitude?.toFixed(3)}</span>}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* ── All Alerts ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <Card className="p-6">
            <div className="relative">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-slate-700/60 border border-white/10 flex items-center justify-center">
                  <ClipboardList className="w-4 h-4 text-slate-300" />
                </div>
                <h3 className="text-white font-bold text-base">All Alerts</h3>
                <span className="ml-auto px-2 py-0.5 rounded-full bg-slate-700/60 border border-white/10 text-slate-400 text-xs font-bold">
                  {alerts.length}
                </span>
              </div>

              {aLoading ? (
                <p className="text-slate-500 text-sm text-center py-8 animate-pulse">Loading…</p>
              ) : alerts.length === 0 ? (
                <p className="text-slate-600 text-sm text-center py-8">No alerts yet.</p>
              ) : (
                <div className="space-y-2">
                  {alerts.map((a, i) => {
                    const sev = SEVERITY_TW[a.severity];
                    return (
                      <motion.div
                        key={a.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.04 }}
                        className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-800/30 border border-white/[0.05] hover:border-white/10 transition-all duration-200"
                      >
                        <div className="flex flex-wrap gap-1.5 flex-shrink-0">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${sev.bg} ${sev.text} ${sev.border}`}>
                            {a.severity}
                          </span>
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                            {a.disasterType}
                          </span>
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${a.active ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-slate-700/40 text-slate-500 border-white/[0.05]"}`}>
                            {a.active ? "ACTIVE" : "INACTIVE"}
                          </span>
                        </div>
                        <p className="text-slate-300 text-sm flex-1 truncate">{a.title}</p>
                        <span className="text-slate-600 text-xs flex-shrink-0 hidden sm:block">
                          {new Date(a.createdAt).toLocaleDateString()}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* ── SOS Reports ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="p-6">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent rounded-2xl" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
                  <PhoneCall className="w-4 h-4 text-orange-400" />
                </div>
                <h3 className="text-white font-bold text-base">SOS Reports</h3>
                <span className="ml-auto px-2 py-0.5 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-bold">
                  {reports.length}
                </span>
              </div>

              {sLoading ? (
                <p className="text-slate-500 text-sm text-center py-8 animate-pulse">Loading…</p>
              ) : reports.length === 0 ? (
                <p className="text-slate-600 text-sm text-center py-8">No SOS reports yet.</p>
              ) : (
                <div className="space-y-3">
                  {reports.map((r, i) => {
                    const st = STATUS_TW[r.status];
                    return (
                      <motion.div
                        key={r.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="p-4 rounded-xl bg-slate-800/40 border border-white/[0.06] hover:border-white/10 transition-all duration-200"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold border ${st.bg} ${st.text} ${st.border}`}>
                            {r.status}
                          </span>
                          {r.userFullName && (
                            <span className="text-slate-500 text-xs font-medium">
                              {r.userFullName}
                            </span>
                          )}
                        </div>

                        <p className="text-slate-200 text-sm leading-relaxed mb-2">{r.message}</p>

                        <div className="flex items-center gap-3 text-[11px] text-slate-600">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(r.createdAt).toLocaleString()}
                          </span>
                          {r.latitude && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {r.latitude.toFixed(3)}, {r.longitude?.toFixed(3)}
                            </span>
                          )}
                        </div>

                        {/* Admin-only status controls */}
                        {user?.role === "ADMIN" && r.status !== "RESOLVED" && (
                          <div className="flex gap-2 mt-3 pt-3 border-t border-white/[0.05]">
                            {r.status === "PENDING" && (
                              <button className={smOrangeBtn} onClick={() => handleStatusUpdate(r.id, "ACTIVE")}>
                                <Activity className="w-3 h-3" /> Mark Active
                              </button>
                            )}
                            <button className={smGreenBtn} onClick={() => handleStatusUpdate(r.id, "RESOLVED")}>
                              <CheckCircle2 className="w-3 h-3" /> Mark Resolved
                            </button>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </Card>
        </motion.div>

      </div>
    </section>
  );
}