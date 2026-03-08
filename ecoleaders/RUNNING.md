# Runbook (copy/paste friendly)

## One-time setup
```powershell
# from repo root
npm run setup           # installs backend + frontend deps
```

## Start everything (in-memory demo, no Mongo needed)
```powershell
npm run dev             # starts backend on 3000 + frontend on 5173
```
Open http://localhost:5173 in your browser.

## Demo logins
```
Email              Password      Role
ava@eco.com        password123   volunteer
bob@eco.com        password123   coordinator
jim@eco.com        password123   admin
```

## Optional: enable Gemini recaps/AI
```powershell
# frontend Gemini for chat recaps / site gen
Set-Content ecoleaders/frontend/.env \"VITE_GEMINI_API_KEY=your-key\"
```

## Optional: use real Mongo instead of in-memory
```powershell
Copy-Item ecoleaders/backend/.env.example ecoleaders/backend/.env
notepad ecoleaders/backend/.env   # set USE_DB=true and MONGODB_URI=<your uri>
npm run dev:backend               # starts Express with Mongo
npm run dev:frontend              # start UI if you want separate terminals
```

## Quick health checks
```powershell
Invoke-RestMethod http://localhost:3000/api/events
Invoke-RestMethod -Method Post http://localhost:3000/api/auth/login `
  -Headers @{\"Content-Type\"=\"application/json\"} `
  -Body '{\"email\":\"ava@eco.com\",\"password\":\"password123\"}'
```
