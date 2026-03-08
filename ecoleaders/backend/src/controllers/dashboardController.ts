import { Request, Response } from 'express';
import { getDashboardMetrics } from '../services/analyticsService';
import { recommendEventsForUser } from '../services/recommendationService';
import Announcement from '../models/Announcement';
import Event from '../models/Event';
import Carpool from '../models/Carpool';

export const getVolunteerDashboard = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId: string = req.userId;
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
};

export const getCoordinatorDashboard = async (_req: Request, res: Response) => {
  const metrics = await getDashboardMetrics();
  res.json(metrics);
};
