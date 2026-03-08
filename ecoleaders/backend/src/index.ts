import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import bcrypt from 'bcryptjs';
import authRoutes from './routes/authRoutes';
import eventRoutes from './routes/eventRoutes';
import carpoolRoutes from './routes/carpoolRoutes';
import siteRoutes from './routes/siteRoutes';
import aiRoutes from './routes/aiRoutes';
import announcementRoutes from './routes/announcementRoutes';
import trainingRoutes from './routes/trainingRoutes';
import dashboardRoutes from './routes/dashboardRoutes';
import analyticsRoutes from './routes/analyticsRoutes';
import volunteerRoutes from './routes/volunteerRoutes';
import attendanceRoutes from './routes/attendanceRoutes';
import chatroomRoutes from './routes/chatroomRoutes';
import notificationRoutes from './routes/notificationRoutes';
import badgeRoutes from './routes/badgeRoutes';
import { initSocket } from './services/notificationService';
import User from './models/User';
import Event from './models/Event';
import Announcement from './models/Announcement';
import TrainingModule from './models/TrainingModule';
import ChatRoom from './models/ChatRoom';
import Carpool from './models/Carpool';
import { mockUsers, mockEvents, mockAnnouncements, mockTrainingModules, mockChatRooms, mockCarpools } from './mockData';

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  },
});

app.use((req, res, next) => {
  console.log(`[Request] ${req.method} ${req.originalUrl}`);
  next();
});

// Initialize Socket.IO handlers
initSocket(io);

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json({ limit: '10mb' }));

const skipDb = process.env.SKIP_DB === 'true';

if (!skipDb) {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ecoleaders';
  mongoose
    .connect(mongoUri)
    .then(async () => {
      console.log(`Connected to MongoDB at ${mongoUri}`);
      if (process.env.AUTO_SEED !== 'false') {
        await seedIfEmpty();
      }
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err.message);
      console.error('Check MONGODB_URI in backend/.env or ensure local MongoDB is running on 27017.');
      process.exit(1);
    });
} else {
  console.log('SKIP_DB=true → running in demo/mock mode (no MongoDB connection).');
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/carpool', carpoolRoutes);
app.use('/api/site', siteRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/training', trainingRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/chatrooms', chatroomRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/badges', badgeRoutes);

// Serve static frontend in production
if (process.env.NODE_ENV === 'production') {
  // compiled frontend build will be copied to backend/public via build script
  const path = require('path');
  app.use(express.static(path.join(__dirname, '../public')));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

async function seedIfEmpty() {
  const [userCount, eventCount, annCount, trainCount, chatCount, carpoolCount] = await Promise.all([
    User.countDocuments(),
    Event.countDocuments(),
    Announcement.countDocuments(),
    TrainingModule.countDocuments(),
    ChatRoom.countDocuments(),
    Carpool.countDocuments(),
  ]);

  // Users
  if (userCount === 0) {
    const password = await bcrypt.hash('password123', 10);
    const users = mockUsers.map((u) => ({
      name: u.name,
      email: u.email,
      password,
      role: u.role,
      completedTrainings: u.completedTrainings || [],
    }));
    await User.insertMany(users);
    console.log('Seeded users');
  }

  const usersByEmail: Record<string, any> = {};
  (await User.find()).forEach((u) => (usersByEmail[u.email] = u));

  // Events
  if (eventCount === 0) {
    const events = mockEvents.map((ev) => ({
      title: ev.title,
      description: ev.description,
      date: ev.date,
      location: ev.location,
      capacity: ev.capacity,
      createdBy: usersByEmail['coord1@eco.com']?._id || Object.values(usersByEmail)[0]?._id,
      requiredTrainings: ev.requiredTrainings || [],
      tags: ev.tags || [],
      category: ev.category || 'volunteer',
      estimatedVolunteerHours: ev.estimatedVolunteerHours || 2,
      attendanceMarked: false,
    }));
    await Event.insertMany(events);
    console.log('Seeded events');
  }

  // Announcements
  if (annCount === 0) {
    const anns = mockAnnouncements.map((a) => ({
      title: a.title,
      message: a.message,
      audienceType: a.audienceType || 'all',
      priority: a.priority || 'normal',
      createdBy: Object.values(usersByEmail)[0]?._id,
    }));
    await Announcement.insertMany(anns);
    console.log('Seeded announcements');
  }

  // Training modules
  if (trainCount === 0) {
    await TrainingModule.insertMany(mockTrainingModules);
    console.log('Seeded training modules');
  }

  // Chat rooms
  if (chatCount === 0) {
    await ChatRoom.insertMany(mockChatRooms);
    console.log('Seeded chat rooms');
  }

  // Carpools
  if (carpoolCount === 0) {
    const events = await Event.find();
    const eventId = events[0]?._id;
    await Carpool.insertMany(
      mockCarpools.map((c) => ({
        eventId: eventId,
        driver: Object.values(usersByEmail)[3]?._id || Object.values(usersByEmail)[0]?._id,
        seatsAvailable: c.seatsAvailable,
        meetingPoint: c.meetingPoint,
        departureTime: c.departureTime,
        pickupZone: c.pickupZone,
        status: c.status,
        riders: [],
      })),
    );
    console.log('Seeded carpools');
  }
}
