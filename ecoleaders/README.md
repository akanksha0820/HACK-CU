# Eco-Leaders Volunteer Hub (v2)

Eco-Leaders is a role-aware volunteer operations and community platform for Eco-Cycle. It centralizes recruitment, onboarding, rides, announcements, chat, analytics, and AI-powered content/voice.

## What’s new in v2
- **Role-aware apps:** volunteer, coordinator, admin/AI workspaces with a shared app shell (sidebar + topbar).
- **Volunteer depth:** live-feeling dashboard widgets, rich opportunities & calendar, announcement center with reactions + voice, Slack-lite chatrooms, serious carpools, training hub with progress and quizzes, profile/badges.
- **Staff power:** coordinator dashboard KPIs, event manager (auto chat + announcement), volunteer manager segments, attendance → hours/badges, reports/analytics (recharts).
- **Admin / AI:** AI Assistant Console + nonprofit site generator (intake → Gemini content → preview/export), content studio hooks, badge issuance.
- **AI + voice:** Gemini for descriptions/summaries/recommendations/chat catch-up/site gen; ElevenLabs for audio announcements/onboarding/reminders. Toggle via env.
- **Seeded demo:** seed script creates 1 admin, 2 coordinators, 8 volunteers, events, announcements, chatrooms/messages, training modules, carpools, badges.
- **Auth required:** login/registration gate protects app routes; no auto-login. JWT stored in localStorage.
- **Offline-friendly demo data:** pages fall back to seeded/sample content so buttons and lists are never empty during demos.

## Tech stack
- Frontend: React 18, TypeScript, Vite, Tailwind, React Router, Socket.IO client, lucide icons, recharts.
- Backend: Node 18, Express, TypeScript, Socket.IO, Mongoose (MongoDB Atlas), dotenv, bcrypt, JWT.
- AI/Voice: Gemini API, ElevenLabs API (pluggable mock if no keys).

## Project structure (high level)
```
backend/      Express API + services + seed
frontend/     React app (public pages + role-based app shell)
docker-compose.yml  Optional local stack (MongoDB + app)
```

## Data models (expanded)
- **User**: role (volunteer|coordinator|admin), phone, avatarUrl, interests, neighborhood, onboardingStatus, completedTrainings[], emergencyContact, volunteerHours, badges[], notificationPreferences, availabilityPreferences, accessibilityNeeds.
- **Event**: category, status, visibility, coordinatorIds[], requiredTrainings[], tags[], chatroomId, checklist, reminderSent, attendanceMarked, estimatedVolunteerHours.
- **Announcement**: audienceType, audienceIds, channelIds, eventId, priority, pushEnabled, audioUrl, shortSummary, acknowledgedBy[], createdAt, expiresAt.
- **TrainingModule / TrainingProgress**, **ChatRoom**, **Carpool** (returnTrip, zones, accessibility), **BadgeAward**, **SiteTemplate**, **ChatMessage**.

## API surface (new/expanded)
- `/api/announcements` (list/create, broadcast via sockets)
- `/api/training` (modules, progress upsert)
- `/api/dashboard` (volunteer + coordinator dashboards)
- `/api/analytics` (snapshot metrics)
- `/api/volunteers` (staff roster view)
- `/api/attendance` (mark attendance → hours/badges)
- `/api/chatrooms` (rooms + messages)
- `/api/notifications` (announcement feed)
- `/api/badges` (issue/list)
- `/api/events`, `/api/carpool`, `/api/site`, `/api/ai` (Gemini/ElevenLabs helpers)

## Seed data
Run `npm run seed` in `backend` to create:
- Users: admin (`admin@eco.com`), coordinators (`coord1@eco.com`, `coord2@eco.com`), volunteers (`ava@eco.com`, `ben@eco.com`, ...). Password for all: `password123`.
- Events: Community Compost Workshop, Saturday Creek Cleanup.
- Announcements: reminder + onboarding note.
- Training modules: Welcome, Event Safety Basics, Community Guidelines.
- Chatrooms: general, composting, event-logistics (messages on connect).
- Carpools: example offer for Creek Cleanup.
- Badges: awarded on attendance action (stub).  
Make sure `MONGODB_URI` is set before seeding (falls back to `mongodb://127.0.0.1:27017/ecoleaders` if unset).

## Environment
Create `backend/.env` from `.env.example` and provide:
```
PORT=3000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=supersecret
GEMINI_API_KEY=your_key_here
ELEVENLABS_API_KEY=your_key_here
CLIENT_URL=http://localhost:5173
VITE_API_BASE_URL=http://localhost:3000
```
Frontend uses `/api` proxy by default; set `VITE_API_BASE_URL` if hosting separately.

## Install & run
```
cd backend && npm install
npm run dev          # dev API with hot reload
npm run seed         # load demo data (requires Mongo up)

cd ../frontend && npm install
npm run dev          # Vite dev server (5173)
```
Visit `http://localhost:5173`; register or use demo accounts above (auth is required).

## Demo flow (suggested)
1) Login as volunteer (`ava@eco.com`), open **Dashboard**: see upcoming event, announcements, chat, carpools, training progress, stats.  
2) Browse **Opportunities** and **Calendar**; observe required training gate on signup.  
3) Check **Announcements** and play voice (if ElevenLabs key present) or see stub.  
4) Open **Carpools** and request a seat; explore **Chatrooms** (#carpool-coordination).  
5) Switch to coordinator (`coord1@eco.com`), open **Coordinator Dashboard**, create an event in **Event Manager** (auto chat + announcement), send a broadcast, mark attendance to award hours/badge.  
6) Explore **Reports** (analytics snapshot) and **AI Tools** to generate a nonprofit site with Gemini.

## Testing (lightweight)
- Backend: focus on business rules (training gate for signup, announcement audience, attendance → hours/badge). Add jest or vitest as needed.
- Frontend: render tests for dashboards/widgets, role-based routes, form validation; snapshot charts if using recharts.

## Notes
- AI/voice fall back gracefully if keys are missing (stub responses).
- Socket.IO delivers chat and announcements in real time; push hooks are ready for extension.
- Solana usage is limited to badge proof metadata (no payments).
