# AGENTS.md

## Project Overview
Veterinary clinic management system. Monorepo with separate `back/` (API) and `front/` (React SPA) directories.

## Developer Commands

### Backend (`back/`)
```bash
npm run dev      # Development (ts-node-dev, port 3001)
npm run build    # TypeScript compilation
npm start        # Production (Node.js)
```
Swagger docs available at `http://localhost:3001/api-docs`

### Frontend (`front/`)
```bash
npm run dev      # Vite dev server (port 5173)
npm run build    # Production build
npm run lint     # ESLint
```

### Docker
```bash
docker compose up --build   # Full stack (backend, frontend, postgres)
```

## Architecture

### Backend (Express + TypeORM + SQLite)
- Entry: `back/src/index.ts`
- Routes: `/api/users`, `/api/pets`, `/api/veterinarians`, `/api/consultations`, `/api/invoices`, `/api/appointments`
- Pattern: Controller → Repository → Entity
- Swagger configured at startup

### Frontend (React 19 + Vite + Tailwind v4 + Zustand)
- Entry: `front/src/main.tsx`
- Routing: `App.tsx`
- State: Zustand stores in `src/store/`
- Components: `src/component/`, Pages: `src/pages/`

## Database (SQLite)
- SQLite via `better-sqlite3`
- Database file: `back/veterinaria.db`

## Quirks
- Changed from PostgreSQL to SQLite for local development without Docker
- Tailwind v4 uses Vite plugin (`@tailwindcss/vite`), not PostCSS config
- No test framework configured (no jest, vitest, etc.)

## File Organization
```
back/src/
  controllers/    # Request handlers
  routes/         # Express routers
  repositories/   # Data access layer
  entities/       # TypeORM entities
  config/         # Swagger setup

front/src/
  component/      # Reusable UI (Drawer, Forms, Table, Sidebar, Navbar)
  pages/          # Route pages (Users, Pets, Appointments, Payments)
  store/          # Zustand state
  hooks/          # Custom hooks
```
