#DisasterVerse

**A full-stack disaster management system — built for speed, designed for crisis.**  
Live alerts · SOS coordination · Roblox disaster simulations · Admin command center

---

## What is DisasterVerse?

DisasterVerse is a real-time disaster response web platform that connects citizens, responders, and administrators during emergencies. Users can file SOS reports with geolocation, administrators can broadcast and manage disaster alerts, and the community can train for emergencies through integrated Roblox simulations — all from a single, live dashboard.

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     BROWSER (React)                     │
│                                                         │
│   AuthPage ──► AuthContext (JWT in localStorage)        │
│       │                                                 │
│       ▼                                                 │
│   Navbar ─────────────────────────────────────┐         │
│       │                                       │         │
│   ┌───▼──────────┐  ┌──────────────┐  ┌─────▼──────┐   │
│   │ LiveDashboard│  │  SOSNetwork  │  │ Simulation │   │
│   │              │  │              │  │  Showcase  │   │
│   │ useAlerts()  │  │ (community   │  │  (Roblox   │   │
│   │ useSOS()     │  │  map view)   │  │   links)   │   │
│   │ useDashboard │  │              │  │            │   │
│   └──────┬───────┘  └──────────────┘  └────────────┘   │
│          │                                              │
└──────────┼──────────────────────────────────────────────┘
           │  fetch() + Bearer Token
           ▼
┌─────────────────────────────────────────────────────────┐
│              REST API  (Spring Boot / Render)            │
│                                                         │
│   /auth/signup   /auth/login                            │
│   /alerts        /alerts/active                         │
│   /sos           /sos/status/:id                        │
│   /dashboard/stats                                      │
│                                                         │
│         Spring Security ── JWT Filter                   │
│                  │                                      │
│         Service Layer (Business Logic)                  │
│                  │                                      │
│         JPA Repository ── PostgreSQL                    │
└─────────────────────────────────────────────────────────┘
```

---

## Implementation Details

### Frontend Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS + shadcn/ui tokens |
| Animation | motion/react (Framer Motion) |
| Icons | Lucide React |
| State | React Context + custom hooks |
| Auth | JWT persisted to localStorage |

### Backend Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Java + Spring Boot |
| Security | Spring Security + JWT Bearer |
| Database | PostgreSQL via JPA/Hibernate |
| Deployment | Render (free tier) |

### Data Flow

```
User Action
    │
    ▼
Custom Hook (useAlerts / useSOS / useDashboard)
    │
    ▼
lib/api.ts  →  fetch(BASE_URL + path, { Authorization: Bearer <token> })
    │
    ▼
Spring Boot Controller
    │
    ├── 401  →  Invalid / missing token
    ├── 403  →  Access denied (role check)
    ├── 404  →  Resource not found
    ├── 409  →  Conflict (duplicate email)
    └── 200  →  { success: true, data: ... }
```

### Role-Based Access

```
PUBLIC              USER (token)         ADMIN (token)
────────────        ────────────         ────────────
GET /alerts         POST /alerts         PATCH /sos/status/:id
GET /alerts/active  POST /sos            GET /dashboard/stats
                    GET /sos
```

---

## API Endpoints

```
AUTH ──────────────────────────────────────────────────────
  POST  /api/v1/auth/signup       Register + receive token
  POST  /api/v1/auth/login        Login + receive token

ALERTS ────────────────────────────────────────────────────
  GET   /api/v1/alerts            All alerts       [public]
  GET   /api/v1/alerts/active     Active only      [public]
  POST  /api/v1/alerts            Create alert     [token]

SOS ───────────────────────────────────────────────────────
  GET   /api/v1/sos               All SOS reports  [token]
  POST  /api/v1/sos               Submit SOS       [token]
  PATCH /api/v1/sos/status/:id    Update status    [token]
         └── PENDING → ACTIVE → RESOLVED

DASHBOARD ─────────────────────────────────────────────────
  GET   /api/v1/dashboard/stats   Aggregated counts [token]
```

**Enum values**

```
disasterType:  EARTHQUAKE | FLOOD | FIRE | HURRICANE
               TORNADO | TSUNAMI | LANDSLIDE | OTHER

severity:      LOW | MEDIUM | HIGH | CRITICAL

sosStatus:     PENDING → ACTIVE → RESOLVED
```

---

## Project Structure

```
DisasterVerse/
├── src/
│   ├── lib/
│   │   └── api.ts                  ← All fetch calls + types
│   ├── contexts/
│   │   └── AuthContext.tsx         ← JWT session management
│   ├── hooks/
│   │   └── useData.ts              ← useAlerts / useSOS / useDashboard
│   ├── pages/
│   │   └── AuthPage.tsx            ← Login + Signup
│   └── components/ui/
│       ├── Navbar.tsx              ← Sticky nav + user chip
│       ├── LiveDashboard.tsx       ← Command center (alerts + SOS)
│       ├── SOSNetwork.tsx          ← Community map view
│       ├── SimulationShowcase.tsx  ← Roblox simulations
│       ├── HeroSection.tsx
│       ├── Statistics.tsx
│       └── Footer.tsx
├── App.tsx                         ← Auth guard + layout
└── styles/
    └── theme.css                   ← shadcn design tokens
```

---

## Simulations

| Scenario | Difficulty | Platform |
|----------|-----------|----------|
| Flood Survival Challenge | Expert | Roblox |
| Thunderstorm Evacuation | Advanced | Roblox |

---

## Running Locally

```bash
# Frontend
pnpm install
pnpm dev                    # http://localhost:5173

# API (already live)
https://disasterverse-backend-nnez.onrender.com
```

> **Note** — The Render backend spins down after inactivity. First request may take ~30 seconds to cold-start.

---

<div align="center">

Built for disaster preparedness · Powered by community response

</div>