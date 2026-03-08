# HACK-CU

Eco-Leaders Volunteer Hub v2: a role-aware volunteer, coordinator, and admin/AI platform with dashboards, announcements, chatrooms, carpools, training, analytics, and Gemini/ElevenLabs integrations.

## Tech Stack
- Frontend: React 18, TypeScript, Vite, Tailwind CSS
- Backend: Node.js, Express, TypeScript, Socket.IO, Mongoose
- Optional: Docker Compose for local orchestration

## Project Structure
```
ecoleaders/
  backend/   # Express + TypeScript API
  frontend/  # React + Vite client
```

## Quickstart (Local)
1. Backend
```bash
cd ecoleaders/backend
npm install
cp .env.example .env
npm run dev
```
Optional: `npm run seed` (requires MongoDB) to load demo admin/coordinators/volunteers, events, announcements, chatrooms, training modules, carpools, badges.

2. Frontend
```bash
cd ecoleaders/frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and proxies API calls to the backend.

## Docker (Recommended)
Runs Mongo, backend, and frontend together.
```bash
cd ecoleaders
# optional: export secrets for backend
# set JWT_SECRET, GEMINI_API_KEY, ELEVENLABS_API_KEY, CLIENT_URL=http://localhost:5173
docker-compose up --build
```
Services:
- `mongo` on 27017 (internal)
- `backend` on http://localhost:3000 (MONGODB_URI points to `mongo`)
- `frontend` on http://localhost:5173 (Vite dev, proxied to backend)

## Notes
- Do not commit `.env` files. Secrets belong in local environment variables.
- If you need to change the API base URL, update `VITE_API_BASE_URL`.
- See `ecoleaders/README.md` for detailed feature tour, roles, and API surface.
