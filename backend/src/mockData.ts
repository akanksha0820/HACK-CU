// Lightweight in-memory data for demo mode (SKIP_DB=true)
import { Types } from 'mongoose';

const oid = () => new Types.ObjectId().toString();

export const mockUsers = [
  { _id: oid(), name: 'Alex Admin', email: 'admin@eco.com', password: 'password123', role: 'admin', completedTrainings: [] },
  { _id: oid(), name: 'Casey Coordinator', email: 'coord1@eco.com', password: 'password123', role: 'coordinator', completedTrainings: [] },
  { _id: oid(), name: 'Jordan Coordinator', email: 'coord2@eco.com', password: 'password123', role: 'coordinator', completedTrainings: [] },
  { _id: oid(), name: 'Ava Volunteer', email: 'ava@eco.com', password: 'password123', role: 'volunteer', completedTrainings: ['safety'] },
  { _id: oid(), name: 'Ben Volunteer', email: 'ben@eco.com', password: 'password123', role: 'volunteer', completedTrainings: [] },
] as any[];

export const mockEvents = [
  {
    _id: oid(),
    title: 'Community Compost Workshop',
    description: 'Teach neighbors how to compost and reduce waste.',
    date: new Date(Date.now() + 86400000),
    location: 'Boulder Civic Area',
    capacity: 20,
    attendees: [] as string[],
    createdBy: mockUsers[1]._id,
    requiredTrainings: [],
    tags: ['composting', 'education'],
    estimatedVolunteerHours: 2,
    attendanceMarked: false,
  },
  {
    _id: oid(),
    title: 'Saturday Creek Cleanup',
    description: 'Remove trash along the creek; gloves provided.',
    date: new Date(Date.now() + 2 * 86400000),
    location: 'Boulder Creek',
    capacity: 80,
    attendees: [] as string[],
    createdBy: mockUsers[2]._id,
    requiredTrainings: ['safety'],
    tags: ['cleanup', 'safety'],
    estimatedVolunteerHours: 3,
    attendanceMarked: false,
  },
];

export const mockCarpools = [
  {
    _id: oid(),
    eventId: mockEvents[1]._id,
    driver: mockUsers[3]._id,
    seatsAvailable: 4,
    riders: [] as string[],
    meetingPoint: 'CU Boulder Lot 214',
    departureTime: new Date(Date.now() + 36 * 3600000),
    pickupZone: 'CU campus',
    status: 'open',
  },
];

export const mockAnnouncements = [
  { _id: oid(), title: 'Saturday cleanup reminder', message: 'Meet at 9am at the bridge.', audienceType: 'all', createdBy: mockUsers[2]._id, createdAt: new Date(), priority: 'normal' },
  { _id: oid(), title: 'Orientation', message: 'Complete onboarding before your first shift.', audienceType: 'all', createdBy: mockUsers[1]._id, createdAt: new Date(), priority: 'high' },
];

export const mockTrainingModules = [
  { _id: 'welcome', title: 'Welcome to Eco-Leaders', required: true, estimatedMinutes: 5, contentBlocks: [{ type: 'text', value: 'Mission + values' }] },
  { _id: 'safety', title: 'Event Safety Basics', required: true, estimatedMinutes: 7, contentBlocks: [{ type: 'text', value: 'Safety checklist' }] },
  { _id: 'guidelines', title: 'Community Guidelines', required: false, estimatedMinutes: 4, contentBlocks: [{ type: 'text', value: 'Inclusivity and comms' }] },
];

export const mockTrainingProgress: any[] = [];

export const mockChatRooms = [
  { _id: 'general', name: 'general', description: 'All hands updates' },
  { _id: 'composting', name: 'composting', description: 'Compost crew chatter' },
  { _id: 'event-logistics', name: 'event-logistics', description: 'Coordinators and leads' },
];

export const mockChatMessages: any[] = [
  { _id: oid(), channel: 'general', sender: mockUsers[3]._id, content: 'Anyone bringing extra gloves?', createdAt: new Date() },
  { _id: oid(), channel: 'carpool-coordination', sender: mockUsers[4]._id, content: 'I can drive 2 seats from CU area.', createdAt: new Date() },
];

export const mockBadges: any[] = [];

export const mockSiteTemplates: any[] = [];
