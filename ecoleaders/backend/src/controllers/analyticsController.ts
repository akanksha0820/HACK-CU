import { Request, Response } from 'express';
import { getAnalyticsSnapshots } from '../services/analyticsService';

export const getAnalytics = async (_req: Request, res: Response) => {
  const snapshots = await getAnalyticsSnapshots();
  res.json(snapshots);
};
