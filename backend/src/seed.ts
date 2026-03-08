import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User';
import Event from './models/Event';
import Announcement from './models/Announcement';
import TrainingModule from './models/TrainingModule';
import ChatRoom from './models/ChatRoom';
import Carpool from './models/Carpool';

dotenv.config();

async function run() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI missing');
  await mongoose.connect(uri);

  await Promise.all([
    User.deleteMany({}),
    Event.deleteMany({}),
    Announcement.deleteMany({}),
    TrainingModule.deleteMany({}),
    ChatRoom.deleteMany({}),
    Carpool.deleteMany({}),
  ]);

  const password = await bcrypt.hash('password123', 10);
  const [admin, coord1, coord2, ...volunteers] = await User.insertMany([
    { name: 'Alex Admin', email: 'admin@eco.com', role: 'admin', password },
    { name: 'Casey Coordinator', email: 'coord1@eco.com', role: 'coordinator', password },
    { name: 'Jordan Coordinator', email: 'coord2@eco.com', role: 'coordinator', password },
    { name: 'Ava Volunteer', email: 'ava@eco.com', role: 'volunteer', password, interests: ['cleanup', 'composting'] },
    { name: 'Ben Volunteer', email: 'ben@eco.com', role: 'volunteer', password, interests: ['education'] },
    { name: 'Chloe Volunteer', email: 'chloe@eco.com', role: 'volunteer', password },
    { name: 'Diego Volunteer', email: 'diego@eco.com', role: 'volunteer', password },
    { name: 'Ella Volunteer', email: 'ella@eco.com', role: 'volunteer', password },
    { name: 'Finn Volunteer', email: 'finn@eco.com', role: 'volunteer', password },
    { name: 'Gwen Volunteer', email: 'gwen@eco.com', role: 'volunteer', password },
  ]);

  const events = await Event.insertMany([
    {
      title: 'Community Compost Workshop',
      description: 'Teach neighbors how to compost and reduce waste.',
      date: new Date(Date.now() + 86400000),
      location: 'Boulder Civic Area',
      capacity: 50,
      createdBy: coord1._id,
      category: 'composting',
      requiredTrainings: [],
      tags: ['composting', 'education'],
    },
    {
      title: 'Saturday Creek Cleanup',
      description: 'Remove trash along the creek; gloves and bags provided.',
      date: new Date(Date.now() + 2 * 86400000),
      location: 'Boulder Creek',
      capacity: 80,
      createdBy: coord2._id,
      category: 'cleanup',
      requiredTrainings: ['safety'],
      tags: ['cleanup', 'safety'],
    },
  ]);

  await Announcement.insertMany([
    { title: 'Saturday cleanup reminder', message: 'Meet at 9am at the bridge.', audienceType: 'all', createdBy: coord2._id },
    { title: 'Orientation', message: 'Complete onboarding before your first shift.', audienceType: 'all', createdBy: coord1._id },
  ]);

  await TrainingModule.insertMany([
    { title: 'Welcome to Eco-Leaders', required: true, estimatedMinutes: 5, contentBlocks: [{ type: 'text', value: 'Mission + values' }] },
    { title: 'Event Safety Basics', required: true, estimatedMinutes: 7, contentBlocks: [{ type: 'text', value: 'Safety checklist' }] },
    { title: 'Community Guidelines', required: false, estimatedMinutes: 4, contentBlocks: [{ type: 'text', value: 'Inclusivity and comms' }] },
  ]);

  const chatRooms = await ChatRoom.insertMany([
    { name: 'general', description: 'All hands updates' },
    { name: 'composting', description: 'Compost crew chatter' },
    { name: 'event-logistics', description: 'Coordinators and leads' },
  ]);

  await Carpool.insertMany([
    {
      eventId: events[1]._id,
      driver: volunteers[0]._id,
      seatsAvailable: 4,
      meetingPoint: 'CU Boulder Lot 214',
      departureTime: new Date(Date.now() + 36 * 3600000),
      pickupZone: 'CU campus',
    },
  ]);

  console.log('Seed complete');
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
