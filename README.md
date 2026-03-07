# HACK-CU

Eco-Leaders Volunteer Hub: a full-stack web platform to coordinate volunteer events, carpools, chat, training, and admin tools.

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

2. Frontend
```bash
cd ecoleaders/frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and proxies API calls to the backend.

## Docker (Optional)
```bash
cd ecoleaders
docker-compose up --build
```

## Notes
- Do not commit `.env` files. Secrets belong in local environment variables.
- If you need to change the API base URL, update `VITE_API_BASE_URL`.
