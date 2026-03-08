import { Request, Response } from 'express';
import { getDashboardMetrics } from '../services/analyticsService';
import { recommendEventsForUser } from '../services/recommendationService';
import Announcement from '../models/Announcement';
import Event from '../models/Event';
import Carpool from '../models/Carpool';
import { mockAnnouncements, mockCarpools, mockEvents } from '../mockData';

const useMock = process.env.SKIP_DB === 'true';

export const getVolunteerDashboard = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId: string = req.userId;
  if (useMock) {
    const metrics = await getDashboardMetrics();
    return res.json({
      metrics,
      recommendations: mockEvents.slice(0, 2).map((ev) => ({ event: ev, score: 1, reason: 'Popular this week' })),
      announcements: mockAnnouncements.slice(0, 3),
      events: mockEvents,
      carpools: mockCarpools,
    });
  } else {
    const [metrics, recommendations, announcements, events, carpools] = await Promise.all([
      getDashboardMetrics(),
      recommendEventsForUser(userId),
      Announcement.find().sort({ createdAt: -1 }).limit(3),
      Event.find().sort({ date: 1 }).limit(5),
      Carpool.find().limit(3).populate('driver', 'name'),
    ]);
    res.json({
      metrics,
      recommendations,
      announcements,
      events,
      carpools,
    });
  }
};

export const getCoordinatorDashboard = async (_req: Request, res: Response) => {
  const metrics = await getDashboardMetrics();
  res.json(metrics);
};
