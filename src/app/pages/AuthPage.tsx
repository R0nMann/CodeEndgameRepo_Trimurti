import { useState, FormEvent } from "react";
import { useAuth } from "../contexts/AuthContext";

type Mode = "login" | "signup";

export default function AuthPage() {
  const { login, signup } = useAuth();
  const [mode, setMode] = useState<Mode>("login");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await signup(fullName, email, password);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-root">
      <div className="auth-bg" />
      <div className="auth-card">
        <div className="auth-logo">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <polygon points="20,2 38,36 2,36" fill="#ef4444" opacity="0.9" />
            <rect x="18" y="14" width="4" height="12" fill="white" />
            <rect x="18" y="29" width="4" height="4" fill="white" />
          </svg>
          <span>DisasterVerse</span>
        </div>

        <h2 className="auth-title">
          {mode === "login" ? "Sign In to Command Center" : "Create Your Account"}
        </h2>
        <p className="auth-subtitle">
          {mode === "login"
            ? "Monitor alerts, manage SOS reports, coordinate response."
            : "Join the disaster response network."}
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === "signup" && (
            <div className="field">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Jane Smith"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          )}
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Please wait…" : mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className="auth-switch">
          {mode === "login" ? (
            <>
              No account?{" "}
              <button onClick={() => { setMode("signup"); setError(""); }}>
                Sign up
              </button>
            </>
          ) : (
            <>
              Already registered?{" "}
              <button onClick={() => { setMode("login"); setError(""); }}>
                Sign in
              </button>
            </>
          )}
        </p>
      </div>

      <style>{`
        .auth-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0a0a0f;
          font-family: 'DM Sans', 'Segoe UI', sans-serif;
          position: relative;
          overflow: hidden;
        }
        .auth-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 20% 40%, rgba(239,68,68,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 80% 70%, rgba(251,146,60,0.08) 0%, transparent 60%);
        }
        .auth-card {
          position: relative;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 48px 40px;
          width: 100%;
          max-width: 420px;
          backdrop-filter: blur(12px);
        }
        .auth-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 28px;
          font-size: 1.1rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.02em;
        }
        .auth-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff;
          margin: 0 0 8px;
          letter-spacing: -0.03em;
        }
        .auth-subtitle {
          font-size: 0.875rem;
          color: rgba(255,255,255,0.45);
          margin: 0 0 28px;
          line-height: 1.5;
        }
        .auth-form { display: flex; flex-direction: column; gap: 16px; }
        .field { display: flex; flex-direction: column; gap: 6px; }
        .field label {
          font-size: 0.8rem;
          font-weight: 600;
          color: rgba(255,255,255,0.6);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .field input {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 11px 14px;
          color: #fff;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .field input:focus { border-color: rgba(239,68,68,0.6); }
        .field input::placeholder { color: rgba(255,255,255,0.25); }
        .auth-error {
          background: rgba(239,68,68,0.12);
          border: 1px solid rgba(239,68,68,0.3);
          border-radius: 8px;
          padding: 10px 14px;
          color: #fca5a5;
          font-size: 0.85rem;
        }
        .auth-btn {
          background: #ef4444;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 13px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, opacity 0.2s;
          margin-top: 4px;
        }
        .auth-btn:hover:not(:disabled) { background: #dc2626; }
        .auth-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .auth-switch {
          text-align: center;
          margin-top: 20px;
          font-size: 0.875rem;
          color: rgba(255,255,255,0.4);
        }
        .auth-switch button {
          background: none;
          border: none;
          color: #f87171;
          font-weight: 600;
          cursor: pointer;
          padding: 0;
          font-size: inherit;
        }
        .auth-switch button:hover { color: #ef4444; }
      `}</style>
    </div>
  );
}