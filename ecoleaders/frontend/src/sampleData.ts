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
    category: 'volunteer',
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
    category: 'volunteer',
    required: ['Event Safety Basics'],
  },
  {
    _id: 'evt3',
    title: 'Zero Waste Advocacy Night',
    description: 'Prep talking points and meet legislators.',
    date: new Date(Date.now() + 3 * 86400000).toISOString(),
    location: 'Downtown Library',
    capacity: 50,
    attendees: [],
    tags: ['advocacy'],
    coordinator: 'Casey Coordinator',
    category: 'advocacy',
  },
  {
    _id: 'evt4',
    title: 'Partner Private Briefing',
    description: 'Invite-only strategy session.',
    date: new Date(Date.now() + 4 * 86400000).toISOString(),
    location: 'Eco-Cycle HQ',
    capacity: 12,
    attendees: [],
    tags: ['private'],
    coordinator: 'Alex Admin',
    category: 'private',
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

export const sampleRideRequests = [
  {
    _id: 'rq1',
    event: 'Saturday Creek Cleanup',
    neighborhood: 'Gunbarrel',
    window: 'Arrive 8:40-8:55 AM',
    returnNeeded: true,
    notes: 'Can meet at Safeway lot',
  },
  {
    _id: 'rq2',
    event: 'Zero Waste Advocacy Night',
    neighborhood: 'CU Campus',
    window: 'Arrive 5:30-5:45 PM',
    returnNeeded: false,
    notes: 'Bike + bus ok if no car',
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
  { channel: 'general', sender: 'Bob', content: 'Weather looks clear for Saturday cleanup.', createdAt: new Date().toISOString() },
  { channel: 'composting', sender: 'Kim', content: 'Reminder: keep greens/browns ratio 1:3.', createdAt: new Date().toISOString() },
  { channel: 'environmental-education', sender: 'Priya', content: 'Who can run the kids activity table?', createdAt: new Date().toISOString() },
  { channel: 'event-logistics', sender: 'Casey', content: 'Need 3 volunteers for check-in by 8:30am.', createdAt: new Date().toISOString() },
  { channel: 'advocacy', sender: 'Liam', content: 'Talking points doc updated with HB-1234 info.', createdAt: new Date().toISOString() },
  { channel: 'carpool-coordination', sender: 'Riley', content: 'Driving from Longmont, 3 seats, leaving 7:50.', createdAt: new Date().toISOString() },
  { channel: 'new-volunteers', sender: 'Maya', content: 'Hi! First event this weekend—any tips?', createdAt: new Date().toISOString() },
];
