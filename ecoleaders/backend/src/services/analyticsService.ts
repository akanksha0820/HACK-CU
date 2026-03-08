import Event from '../models/Event';
import Announcement from '../models/Announcement';
import TrainingProgress from '../models/TrainingProgress';
import Carpool from '../models/Carpool';
import User from '../models/User';

export async function getDashboardMetrics() {
  const [events, announcements, trainings, carpools, users] = await Promise.all([
    Event.countDocuments(),
    Announcement.countDocuments(),
    TrainingProgress.countDocuments({ status: 'completed' }),
    Carpool.countDocuments(),
    User.countDocuments(),
  ]);
  return {
    totals: { events, announcements, trainingsCompleted: trainings, carpools, users },
  };
}

export async function getAnalyticsSnapshots() {
  // Simple mocked snapshots for demo
  const volunteerSignupTrend = [
    { label: 'Week -4', value: 42 },
    { label: 'Week -3', value: 58 },
    { label: 'Week -2', value: 63 },
    { label: 'Week -1', value: 71 },
    { label: 'This Week', value: 79 },
  ];
  const attendanceRateByCategory = [
    { category: 'Composting', rate: 0.82 },
    { category: 'Cleanup', rate: 0.76 },
    { category: 'Education', rate: 0.68 },
    { category: 'Advocacy', rate: 0.74 },
  ];
  return { volunteerSignupTrend, attendanceRateByCategory };
}
