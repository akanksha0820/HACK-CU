import { Request, Response } from 'express';
import { awardBadge, listBadges } from '../services/badgeService';
import { mockBadges } from '../mockData';

const useMock = process.env.SKIP_DB === 'true';

export const getBadges = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId: string = req.userId;
  if (useMock) {
    return res.json(mockBadges.filter((b) => b.userId === userId));
  }
  const badges = await listBadges(userId);
  res.json(badges);
};

export const postBadge = async (req: Request, res: Response) => {
  const { userId, badgeName, description } = req.body;
  if (useMock) {
    const badge = { userId, badgeName, description, awardedAt: new Date() };
    mockBadges.push(badge);
    return res.status(201).json(badge);
  }
  const badge = await awardBadge(userId, badgeName, { description });
  res.status(201).json(badge);
};
