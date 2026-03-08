export const sampleEvents = [
  {
    _id: 'evt1',
    title: 'Community Compost Workshop',
    description: 'Teach neighbors how to compost and reduce waste.',
    date: new Date(Date.now() + 86400000).toISOString(),
    location: 'Boulder Civic Area',
    capacity: 20,
    attendees: [{ _id: 'u1', name: 'Ava Volunteer' }],
    tags: ['composting', 'education'],
    coordinator: 'Casey Coordinator',
  },
  {
    _id: 'evt2',
    title: 'Saturday Creek Cleanup',
    description: 'Remove trash along the creek; gloves provided.',
    date: new Date(Date.now() + 2 * 86400000).toISOString(),
    location: 'Boulder Creek',
    capacity: 80,
    attendees: [{ _id: 'u2', name: 'Ben Volunteer' }],
    tags: ['cleanup', 'safety'],
    coordinator: 'Jordan Coordinator',
  },
];

export const sampleCarpools = [
  {
    _id: 'cp1',
    driver: { _id: 'u3', name: 'Chloe' },
    seatsAvailable: 4,
    riders: [{ _id: 'u1', name: 'Ava' }],
    meetingPoint: 'CU Boulder Lot 214',
    departureTime: new Date(Date.now() + 36 * 3600000).toISOString(),
    pickupZone: 'CU campus',
  },
  {
    _id: 'cp2',
    driver: { _id: 'u4', name: 'Diego' },
    seatsAvailable: 3,
    riders: [],
    meetingPoint: 'North Boulder Park',
    departureTime: new Date(Date.now() + 40 * 3600000).toISOString(),
    pickupZone: 'North Boulder',
  },
];

export const sampleAnnouncements = [
  { title: 'Safety briefing tonight', body: '6pm on Zoom. Check your inbox for link.', priority: 'urgent' },
  { title: 'Orientation', body: 'Complete onboarding before your first shift.', priority: 'normal' },
  { title: 'Weather update', body: 'Light rain expected Saturday—bring jacket.', priority: 'high' },
];

export const sampleChatMessages = [
  { channel: 'general', sender: 'Ava', content: 'Anyone bringing extra gloves?', createdAt: new Date().toISOString() },
  { channel: 'carpool-coordination', sender: 'Diego', content: 'I have 2 seats from CU area.', createdAt: new Date().toISOString() },
];
