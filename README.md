# HACK-CU – Eco-Leaders Volunteer Hub (demo)

Full-stack demo for the Eco-Leaders Volunteer Hub (volunteer + coordinator + admin/AI). The default experience is **in-memory** (no Mongo, no Docker) so every page is populated and every button responds.

## Run it (copy/paste)
```powershell
npm run setup   # installs backend + frontend deps
npm run dev     # starts backend on 3000 and frontend on 5173
```
Open http://localhost:5173.

Demo logins (password `password123`):
- ava@eco.com (volunteer)
- bob@eco.com (coordinator)
- jim@eco.com (admin)

## Optional flags
- `frontend/.env` → `VITE_GEMINI_API_KEY=...` to use your Gemini key for chat recaps + site gen (otherwise a demo summary is shown).
- `backend/.env` (copy from `.env.example`) → set `USE_DB=true` and `MONGODB_URI` to run against Mongo instead of in-memory.

## Repo layout
```
ecoleaders/
  backend/   Express + TypeScript API (in-memory by default)
  frontend/  React + Vite client
scripts/dev.js   Starts both servers with one command
```

More details: `ecoleaders/README.md` (feature tour) and `ecoleaders/RUNNING.md` (runbook).
