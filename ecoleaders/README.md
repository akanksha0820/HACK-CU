# Eco-Leaders Volunteer Hub (demo v2)

Role-aware volunteer, coordinator, and admin/AI workspaces with dashboards, announcements, chatrooms, carpools, training, analytics, and Gemini-powered helpers. Default mode is **in-memory** (no Mongo, no Docker) so the demo is always populated and clickable.

## TL;DR run commands
```powershell
# from repo root
npm run setup           # installs backend + frontend deps
npm run dev             # starts backend (3000) + frontend (5173)
```
Then open http://localhost:5173.

Demo logins (password: `password123`):
- ava@eco.com — volunteer
- bob@eco.com — coordinator
- jim@eco.com — admin

## Features that are live in this demo
- Volunteer dashboard widgets with working CTA links and alerts.
- Opportunities + Calendar: sign-up + notify-me popups; categories for volunteer/advocacy/private.
- Announcement center: feed with “Send push” + “Queue another” to show success toasts.
- Chatrooms: seeded channels, local posting, Gemini “Ask for recap” per channel (uses `VITE_GEMINI_API_KEY` if set, otherwise a demo summary).
- Carpools: seeded offers/requests; create and join show success alerts.
- Training hub, profile/badges, coordinator dashboard, reports/AI pages populated with sample data for a “live” feel.

## Environment
Copy `backend/.env.example` to `backend/.env` (no real keys needed for the demo):
```
PORT=3000
CLIENT_URL=http://localhost:5173
USE_DB=false               # keep false for the in-memory demo
JWT_SECRET=changeme
MONGODB_URI=mongodb://localhost:27017/ecoleaders   # only if USE_DB=true
GEMINI_API_KEY=            # optional, used by backend helpers
ELEVENLABS_API_KEY=        # optional, used by backend helpers
VITE_API_BASE_URL=http://localhost:3000
```
For front-end Gemini recaps, create `frontend/.env` with:
```
VITE_GEMINI_API_KEY=your-key   # optional; demo text shown if missing
```

## Optional: real Mongo
Set `USE_DB=true` and `MONGODB_URI=...` in `backend/.env`, then `npm run dev` in `ecoleaders/backend`. Collections auto-seed if empty. Otherwise everything runs in-memory.

## Commands you might need
```powershell
npm run dev           # start both servers from repo root
npm run dev:backend   # backend only (from repo root)
npm run dev:frontend  # frontend only (from repo root)
```

## What changed from the starter
- Removed Docker requirement; in-memory by default.
- Hardcoded demo users; auth gate now requires login (no auto-login).
- Buttons across dashboard, calendar, opportunities, carpools, announcements fire success alerts instead of no-ops.
- Announcements page simplified to a feed with push/send actions.
- Chatrooms gained Gemini recap per channel (falls back to a demo summary without a key).
- Seeded pages so nothing looks empty on first load.
