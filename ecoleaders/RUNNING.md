# Eco-Leaders Runbook (simplified)

Everything runs without Mongo by default (in-memory demo data). Set `USE_DB=true` only if you want to connect to a real Mongo instance.

## Fast start (in-memory)
```powershell
# Backend
cd ecoleaders/backend
npm.cmd install
npm.cmd run dev   # or: npm.cmd run build && node dist/index.js

# Frontend (new terminal)
cd ecoleaders/frontend
npm.cmd install
npm.cmd run dev
```
Open http://localhost:5173. Log in with `guest / guest` or create an account.

## Optional: real Mongo
If you set `USE_DB=true`, also set `MONGODB_URI` in `backend/.env`. Auto-seed runs when the database is empty.
```powershell
$Env:USE_DB="true"
$Env:MONGODB_URI="your-mongo-uri"
cd ecoleaders/backend
npm.cmd run dev
```

## Auth & demo accounts
- guest / guest (always available)
- admin@eco.com / password123
- coord1@eco.com / password123
- coord2@eco.com / password123
- ava@eco.com / password123

## Common checks
```powershell
# backend health
Invoke-RestMethod http://localhost:3000/api/events

# login
Invoke-RestMethod -Method Post http://localhost:3000/api/auth/login `
  -Headers @{ "Content-Type"="application/json" } `
  -Body '{"email":"guest","password":"guest"}'
```
