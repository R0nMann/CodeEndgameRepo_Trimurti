import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { authApi, AuthUser } from "../lib/api";

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore session from localStorage
    const stored = localStorage.getItem("dv_user");
    if (stored) {
      try {
        const parsed: AuthUser = JSON.parse(stored);
        setUser(parsed);
      } catch {
        localStorage.removeItem("dv_user");
        localStorage.removeItem("dv_token");
      }
    }
    setLoading(false);
  }, []);

  const persist = (u: AuthUser) => {
    localStorage.setItem("dv_user", JSON.stringify(u));
    localStorage.setItem("dv_token", u.token);
    setUser(u);
  };

  const login = async (email: string, password: string) => {
    const u = await authApi.login({ email, password });
    persist(u);
  };

  const signup = async (fullName: string, email: string, password: string) => {
    const u = await authApi.signup({ fullName, email, password });
    persist(u);
  };

  const logout = () => {
    localStorage.removeItem("dv_user");
    localStorage.removeItem("dv_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, signup, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}