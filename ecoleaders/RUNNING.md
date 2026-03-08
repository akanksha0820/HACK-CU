# Eco-Leaders Runbook

This file gives copy-pasteable commands to run the stack in three modes: Docker (recommended), Local with Mongo, and Local Mock (no Mongo). Commands are for Windows PowerShell; replace `npm.cmd` with `npm` on macOS/Linux.

## 1) Full stack with Docker (Mongo + backend + frontend)
```powershell
cd ecoleaders
# Optional: set secrets for backend
$Env:JWT_SECRET="changeme"
$Env:GEMINI_API_KEY=""         # optional
$Env:ELEVENLABS_API_KEY=""     # optional
$Env:CLIENT_URL="http://localhost:5173"

docker-compose up --build
```
What happens:
- mongo on port 27017 (internal, named volume)
- backend on http://localhost:3000 (MONGODB_URI points to `mongo`)
- frontend on http://localhost:5173 (Vite dev, proxy to backend)

Stop: `docker-compose down` (add `-v` to drop DB volume).

## 2) Local with your MongoDB (Atlas or local)
Backend
```powershell
cd ecoleaders/backend
copy .env.example .env   # edit with your MONGODB_URI, JWT_SECRET, keys
npm.cmd install
npm.cmd run build
node dist/index.js
```

Frontend (new terminal)
```powershell
cd ecoleaders/frontend
npm.cmd install
npm.cmd run dev
```
Visit http://localhost:5173.

Seed data (only when MONGODB_URI is real):
```powershell
cd ecoleaders/backend
npx.cmd ts-node src/seed.ts
```

## 3) Local mock/demo (no Mongo needed)
Uses in-memory data; good for instant demos.
```powershell
cd ecoleaders/backend
set SKIP_DB=true
npm.cmd run build
set SKIP_DB=true
node dist/index.js
```
Frontend: same as above. All pages/auth work with mock data.

## Auth & demo accounts
- admin@eco.com / password123
- coord1@eco.com / password123
- coord2@eco.com / password123
- ava@eco.com / password123 (volunteer)
Or register a new account (auth is required).

## Environment variables (backend/.env)
```
PORT=3000
CLIENT_URL=http://localhost:5173
MONGODB_URI=...              # required unless SKIP_DB=true
JWT_SECRET=changeme
GEMINI_API_KEY=...           # optional
ELEVENLABS_API_KEY=...       # optional
VITE_API_BASE_URL=http://localhost:3000
```

## Common issues & fixes
- **Atlas not reachable**: open IP access to your machine or use Docker Mongo. If SRV times out, use the standard (non-SRV) connection string with `directConnection=true`.
- **PowerShell blocks npm/ts-node**: always call `npm.cmd` / `npx.cmd`.
- **Compile errors**: run `npm.cmd run build` in backend before `node dist/index.js`.
- **Socket failures in demo**: mock data still shows content; actions show success/error banners.

## Quick health checks
Backend env loaded:
```powershell
cd ecoleaders/backend
node -e "require('dotenv').config(); console.log(process.env.MONGODB_URI ? 'MONGODB_URI set' : 'MONGODB_URI missing')"
```

Backend up (production build):
```powershell
cd ecoleaders/backend
npm.cmd run build
node dist/index.js
```

Frontend up:
```powershell
cd ecoleaders/frontend
npm.cmd run dev
```
