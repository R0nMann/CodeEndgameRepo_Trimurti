// import { useState } from "react";
// import { AuthUser } from "../../lib/api";

// interface NavbarProps {
//   user: AuthUser | null;
//   onLogout: () => void;
// }

// export default function Navbar({ user, onLogout }: NavbarProps) {
//   const [menuOpen, setMenuOpen] = useState(false);

//   const navLinks = [
//     { label: "Dashboard", href: "#dashboard" },
//     { label: "SOS Network", href: "#sos-network" },
//     { label: "Simulation", href: "#simulations" },
//   ];

//   return (
//     <nav className="navbar">
//       <div className="nav-inner">
//         {/* Logo */}
//         <a href="#" className="nav-logo">
//           <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
//             <polygon points="20,2 38,36 2,36" fill="#ef4444" />
//             <rect x="18" y="14" width="4" height="12" fill="white" />
//             <rect x="18" y="29" width="4" height="4" fill="white" />
//           </svg>
//           <span>DisasterVerse</span>
//         </a>

//         {/* Desktop Links */}
//         <div className="nav-links">
//           {navLinks.map(l => (
//             <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
//           ))}
//         </div>

//         {/* User / Logout */}
//         <div className="nav-right">
//           {user && (
//             <span className="nav-user">
//               <span className="nav-user-dot" />
//               {user.fullName}
//               <span className="nav-role">{user.role}</span>
//             </span>
//           )}
//           <button className="nav-logout" onClick={onLogout}>Sign Out</button>
//           {/* Mobile hamburger */}
//           <button className="nav-hamburger" onClick={() => setMenuOpen(o => !o)}>
//             {menuOpen ? "✕" : "☰"}
//           </button>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       {menuOpen && (
//         <div className="nav-mobile">
//           {navLinks.map(l => (
//             <a key={l.href} href={l.href} className="nav-mobile-link" onClick={() => setMenuOpen(false)}>
//               {l.label}
//             </a>
//           ))}
//           <button className="nav-mobile-logout" onClick={onLogout}>Sign Out</button>
//         </div>
//       )}

//     </nav>
//   );
// }
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, LayoutDashboard, Radio, Gamepad2, Menu, X, LogOut } from "lucide-react";
import { AuthUser } from "../../lib/api";

interface NavbarProps {
  user: AuthUser | null;
  onLogout: () => void;
}

const navLinks = [
  { label: "Dashboard",   href: "#dashboard",   icon: LayoutDashboard },
  { label: "SOS Network", href: "#sos-network",  icon: Radio           },
  { label: "Simulation",  href: "#simulations",  icon: Gamepad2        },
];

export default function Navbar({ user, onLogout }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-6">

        {/* ── Logo ── */}
        <a href="#" className="flex items-center gap-2.5 flex-shrink-0 group">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-red-500/30 rounded-lg blur-md group-hover:blur-lg transition-all duration-300" />
            <div className="relative w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
          </div>
          <span className="hidden sm:block font-bold text-white text-[15px] tracking-tight">
            Disaster
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
              Verse
            </span>
          </span>
        </a>

        {/* ── Desktop Links ── */}
        <div className="hidden md:flex items-center gap-1 flex-1">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
            >
              <l.icon className="w-3.5 h-3.5" />
              {l.label}
            </a>
          ))}
        </div>

        {/* ── Right Side ── */}
        <div className="flex items-center gap-3 ml-auto">

          {/* Live badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-red-500/20">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
            <span className="text-xs text-red-400 font-semibold tracking-widest">LIVE</span>
          </div>

          {/* User chip */}
          {user && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 border border-white/[0.08]">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">
                {user.fullName.charAt(0).toUpperCase()}
              </div>
              <span className="text-xs text-slate-300 font-medium">
                {user.fullName.split(" ")[0]}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-500/20 border border-red-500/20 text-red-400 font-bold tracking-wider">
                {user.role}
              </span>
            </div>
          )}

          {/* Sign out – desktop */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onLogout}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold hover:bg-red-500/20 transition-all duration-200"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </motion.button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg bg-slate-900/60 border border-white/[0.08] text-slate-300 hover:text-white transition-colors"
          >
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-white/[0.06] bg-slate-950/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all"
                >
                  <l.icon className="w-4 h-4" />
                  {l.label}
                </a>
              ))}

              <div className="pt-3 mt-2 border-t border-white/[0.06] space-y-2">
                {/* User row */}
                {user && (
                  <div className="flex items-center gap-2 px-3 py-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white">
                      {user.fullName.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm text-slate-300">{user.fullName}</span>
                    <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-red-500/20 border border-red-500/20 text-red-400 font-bold">
                      {user.role}
                    </span>
                  </div>
                )}

                <button
                  onClick={onLogout}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold hover:bg-red-500/20 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}