# HACK-CU – Eco-Leaders Volunteer Hub (demo)

Role-aware volunteer, coordinator, and admin/AI web app. The default experience is **in-memory** (no Mongo, no Docker) so every page is pre-populated and every button responds out of the box.

## Quick start
```powershell
npm run setup   # installs backend + frontend deps
npm run dev     # starts backend on :3000 and frontend on :5173
```
Open http://localhost:5173.

Demo logins (password `password123`):
- ava@eco.com — volunteer
- bob@eco.com — coordinator
- jim@eco.com — admin

## Stack
- Frontend: React 18, TypeScript, Vite, Tailwind, React Router, lucide icons, recharts, Socket.IO client.
- Backend: Node 18, Express, TypeScript, Socket.IO, optional Mongoose (only if `USE_DB=true`), bcrypt/JWT, dotenv.
- AI/Voice hooks: Gemini API (summaries, recaps, site gen), ElevenLabs (audio). Safe fallbacks when keys are absent.
- Notifications: browser Notification API (local) with service worker–ready hook; endpoints prepared for future web-push.

## Architecture and data flow
- App shells: public marketing shell and authenticated shell (sidebar + topbar). Navigation is role-aware (volunteer / coordinator / admin).
- Data mode: in-memory mock data by default; flip `USE_DB=true` in `backend/.env` to connect to MongoDB and auto-seed.
- APIs: `/api/events`, `/api/carpool`, `/api/announcements`, `/api/training`, `/api/dashboard`, `/api/analytics`, `/api/chatrooms`, `/api/notifications`, `/api/badges`, `/api/site`, `/api/ai`, plus `/api/demo/signups` for shared signup list in demo mode.
- Realtime: Socket.IO server is initialized; current UI uses local data but can be wired to sockets without structural changes.

## Feature snapshot
- Volunteer app: dashboard widgets, opportunities, calendar with categories, announcement center with push + voice, chatrooms with Gemini recap, carpools, training hub, profile/badges.
- Coordinator app: dashboard KPIs, event manager, volunteer manager, announcements, reports/analytics.
- Admin/AI: AI tools console, nonprofit site generator workflow, integrations placeholder, badge panel.
- Shared demo signups: opportunities sign-up writes to `/api/demo/signups` so all users see the live signup list while the server runs.
- Push notifications (demo): Announcements “Send push” and Calendar “Notify me” trigger browser notifications with announcement/event text after permission is granted.

## Environment options
- Frontend: `frontend/.env` → `VITE_GEMINI_API_KEY=...` (optional; demo text shown if missing).
- Backend: copy `ecoleaders/backend/.env.example` to `ecoleaders/backend/.env`. Key flags:
  - `USE_DB=false` (default) to stay in-memory; set to `true` and add `MONGODB_URI` to use Mongo.
  - `GEMINI_API_KEY`, `ELEVENLABS_API_KEY` optional.
  - `VITE_API_BASE_URL=http://localhost:3000` for dev proxy.

## Repo layout
```
ecoleaders/
  backend/    Express + TS API (mock by default; Mongo optional)
  frontend/   React + Vite client
scripts/dev.js   one-command runner for both servers
.github/workflows/deploy.yml   builds + publishes frontend to gh-pages
```

## Deployment (GitHub Pages)
- Pages should point to branch `gh-pages`, folder `/`.
- Workflow `Deploy Frontend to GitHub Pages` (on pushes to master) builds `ecoleaders/frontend`, copies `404.html` for SPA routing, and publishes `dist/` to `gh-pages`.
- Vite base is set to `/HACK-CU/` for correct asset paths on Pages. If you fork/rename, set `BASE_PATH` env or update `vite.config.ts`.

## How we built it (process)
1) Started from the skeleton, split public vs. authenticated shells, and added role-aware nav.
2) Seeded realistic data (events, carpools, chat, announcements, training, badges) so pages feel “alive.”
3) Simplified auth to hardcoded demo users for zero-setup logins; JWT pipeline remains for future real auth.
4) Added shared signup list API for opportunities to demonstrate multi-user state without DB.
5) Layered AI/voice hooks with safe fallbacks (Gemini/ElevenLabs keys optional).
6) Added browser notification helpers and wired them into Announcements and Calendar.

More depth: see `ecoleaders/README.md` for feature-by-feature notes and `ecoleaders/RUNNING.md` for extended runbook.
