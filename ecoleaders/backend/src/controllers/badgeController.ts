import { Request, Response } from 'express';
import { awardBadge, listBadges } from '../services/badgeService';

export const getBadges = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId: string = req.userId;
  const badges = await listBadges(userId);
  res.json(badges);
};

export const postBadge = async (req: Request, res: Response) => {
  const { userId, badgeName, description } = req.body;
  const badge = await awardBadge(userId, badgeName, { description });
  res.status(201).json(badge);
};
