import { useEffect } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

// Import your existing components
import Navbar from "./components/Navbar";
import {HeroSection} from "./components/HeroSection";
import LiveDashboard from "./components/LiveDashboard";
import {SOSNetwork} from "./components/SOSNetwork";
import {SimulationShowcase} from "./components/SimulationShowcase";
import {Footer} from "./components/Footer";

// Auth page
import AuthPage from "./pages/AuthPage";

// ─── Protected App Shell ─────────────────────────────────────────────────────

function AppShell() {
  const { isAuthenticated, loading, logout, user } = useAuth();

  // Show nothing while checking stored session
  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0f",
        color: "#fff",
        fontFamily: "sans-serif",
        fontSize: "1rem",
        letterSpacing: "0.1em",
      }}>
        Loading…
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <div className="app">
      <Navbar user={user} onLogout={logout} />
      <main>
        <HeroSection />
        <LiveDashboard />
        <SOSNetwork />
        {/* Simulation section - add your Roblox iframe links here */}
        <SimulationShowcase />
      </main>
      <Footer />
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <AuthProvider>
      <AppShell />
    </AuthProvider>
  );
}