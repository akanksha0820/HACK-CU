# Eco-Leaders Volunteer Hub

## Overview

This project provides a complete, production‑ready boilerplate for **Eco‑Leaders Volunteer Hub**, a web‑based platform designed to coordinate and empower volunteers for environmental nonprofit organizations like Eco‑Cycle. It integrates modern technologies while remaining extensible for hackathon or professional use.

### Key Features

- **Event calendar & sign‑ups** – Volunteers browse, filter, and sign up for upcoming events; staff manage rosters and track attendance.
- **Push notifications** – Replaces email blasts with real‑time web notifications (requires service worker support) and optional mobile push integration.
- **Community chat rooms** – Topic‑specific channels (e.g. composting, environmental education) powered by Socket.IO.
- **Carpool coordination** – Volunteers can create and join carpool requests for events.
- **Training resources & onboarding** – Static and dynamic content to help new Eco‑Leaders get up to speed.
- **Admin dashboards** – Staff can create events, manage volunteer opportunities, send announcements, and monitor metrics.
- **AI site generator** – A unique “Create your nonprofit site” button that uses Google’s Gemini API to generate a custom website template for another nonprofit by cloning and adapting the existing application. This demonstrates your mastery of the Gemini API.
- **Audio announcements** – Integrates with **ElevenLabs** to generate natural‑sounding audio for announcements, training, or accessibility features.
- **Cloud deployment** – Ships with a ready‑to‑deploy configuration for Vultr’s cloud compute service, though any container‑friendly provider will work.
- **Database** – Uses MongoDB Atlas with Mongoose models for users, events, chat messages, carpools, and site metadata.

> **Note**: API keys and secrets are **never** committed. Create a `.env` file (see `.env.example`) to provide your own API keys for Gemini, ElevenLabs, MongoDB Atlas, and other services.

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite, React Router, Socket.IO client, Axios
- **Backend**: Node.js 18, Express, TypeScript, Socket.IO, Mongoose (MongoDB Atlas), dotenv
- **AI/Audio**: Google Gemini API, ElevenLabs API
- **Deployment**: Designed for containerized environments such as Vultr Cloud, but also runs locally on macOS and Windows

## Project Structure

```
ecoleaders/
├── backend/               # Express server
│   ├── src/
│   │   ├── config/        # Configuration helpers (db, env)
│   │   ├── controllers/   # Request handlers
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # API route definitions
│   │   ├── services/      # Business logic (Gemini, ElevenLabs, Notifications)
│   │   └── index.ts       # Entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── frontend/              # React client
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── api.ts         # API client configuration
│   │   └── tailwind.css   # Tailwind entry
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.ts
├── docker-compose.yml      # Optional container orchestration (MongoDB + app)
└── README.md (you are here)
```

## Quickstart

The following steps assume that you have **Node.js 18+** and **npm** installed. Mac and Windows instructions differ slightly in environment setup but the commands remain the same.

### 1. Clone the repository

```bash
git clone <your-fork-url>
cd ecoleaders
```

### 2. Configure environment variables

Both the frontend and backend rely on environment variables for API keys and endpoints. Copy `.env.example` to `.env` in the backend folder and fill in the values:

```bash
cd backend
cp .env.example .env
nano .env # or edit with your preferred editor
```

Values you need to provide:

- `PORT`: Port for the Express server (default 3000)
- `MONGODB_URI`: MongoDB Atlas connection string
- `JWT_SECRET`: Secret for JWT token signing (any strong random string)
- `GEMINI_API_KEY`: Your Google Gemini API key
- `ELEVENLABS_API_KEY`: Your ElevenLabs API key
- `VITE_API_BASE_URL`: Base URL used by the frontend to call your backend (set in `frontend/.env`)

### 3. Install dependencies

Install backend dependencies:

```bash
cd backend
npm install
```

Install frontend dependencies:

```bash
cd ../frontend
npm install
```

### 4. Run the application (Development Mode)

**Terminal 1 – Backend**

```bash
cd backend
npm run dev
```

This runs the TypeScript Express server with hot reload (powered by ts-node-dev). It will listen on the port specified in your `.env`.

**Terminal 2 – Frontend**

```bash
cd frontend
npm run dev
```

This starts Vite’s dev server, usually on `localhost:5173`. The frontend proxies API requests to the backend (see `vite.config.ts`).

Visit `http://localhost:5173` in your browser to see the application.

### 5. Run in production locally

For a production build:

```bash
# Build frontend
cd frontend
npm run build

# Build backend (TypeScript → JavaScript)
cd ../backend
npm run build

# Start the backend with Node (serves compiled JS and static frontend)
npm start

# Frontend build files are automatically copied into backend/public during build
```

### 6. Docker deployment (optional)

If you wish to run MongoDB and the application in containers (e.g., on Vultr or another cloud provider), use the provided `docker-compose.yml`.

```bash
docker-compose up --build
```

This starts MongoDB, the backend, and serves the static frontend. Be sure to set environment variables either in the compose file or via an `.env` file.

### 7. Platform‑specific tips

- **macOS**: Use Homebrew to install Node.js (`brew install node`). On macOS, hot reload works seamlessly with `nodemon` or `ts-node-dev`.
- **Windows**: Install Node.js from the [official website](https://nodejs.org/). When editing `.env` files, avoid trailing spaces and ensure paths use forward slashes (`/`). Consider running your terminal as Administrator to avoid port conflicts.

## Developing Further

This boilerplate is intentionally modular. Extend it by adding additional API routes, React pages/components, and services. The following sections explain how key pieces work.

### Backend Highlights

**Routing**: All API routes are defined under `src/routes`. The main route file mounts sub‑routers: `/api/auth`, `/api/events`, `/api/chat`, `/api/carpool`, `/api/site`, and `/api/ai`.

**Models**: Mongoose schemas define Users, Events, Carpool, ChatMessage, and SiteTemplate. You can extend these models to add fields like roles, permissions, or analytics.

**Services**:

- `geminiService.ts` – Contains functions for invoking the Gemini API to generate text. The provided implementation uses the official REST endpoint; replace this with your own Gemini client if needed.
- `elevenLabsService.ts` – Wraps ElevenLabs API calls to synthesize speech. It returns audio files that you can send to clients as attachments or store in the database.
- `notificationService.ts` – Contains helpers for sending Socket.IO events and web push notifications. Extend this to integrate with mobile push providers (e.g., FCM or APNs).

**Authentication**: The boilerplate uses JWT for stateless auth. Passwords are hashed with bcrypt. Token verification happens through middleware. Feel free to integrate OAuth or other mechanisms.

**AI Site Generator**: The `siteController` exposes an endpoint `/api/site/generate` that accepts a JSON payload describing the target nonprofit (name, mission, key content). It calls the Gemini API via `geminiService.generateSiteMarkup`, which returns HTML/CSS/JS content. The controller stores the generated template in MongoDB and returns it to the caller. The frontend triggers this via the “Create Site” button. Users can download or deploy the returned zip.

### Frontend Highlights

**Routing**: React Router defines pages for home, events, carpool, chat, training, admin, and the AI site generator. Protected routes check for authentication and roles.

**State management**: A simple context provider handles auth and global state. For a larger project you can integrate Redux or Zustand.

**API client**: `src/api.ts` wraps Axios with the base URL and authorization header injection.

**Chat & Notifications**: Socket.IO client listens for server events (e.g., new chat messages, announcements) and updates UI state in real time.

**Tailwind**: Utility classes enable responsive, accessible UI. Feel free to customize `tailwind.config.js` with your brand colors.

## Troubleshooting

- **MongoDB connection errors**: Verify that your `MONGODB_URI` is correct and that your network allows connections to Atlas. On Windows, check if your firewall blocks outgoing ports.
- **API key errors**: The Gemini and ElevenLabs stubs will throw descriptive errors if keys are missing. Ensure they are defined in `.env`.
- **CORS issues**: The backend enables CORS for the frontend origin in development. If you deploy the frontend separately from the backend, update the allowed origin in `src/index.ts`.

## Contributing

Pull requests are welcome! Please open an issue first to discuss what you would like to change. This project intentionally leaves some advanced features as TODOs to encourage your creativity during hackathons.

---

### License

This project is open‑sourced under the MIT License. See `LICENSE` for details.
