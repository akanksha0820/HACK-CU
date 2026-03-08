import { Request, Response } from 'express';
import { getModules, getUserProgress, upsertProgress } from '../services/trainingService';

export const listModules = async (_req: Request, res: Response) => {
  const modules = await getModules();
  res.json(modules);
};

export const listProgress = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId: string = req.userId;
  const progress = await getUserProgress(userId);
  res.json(progress);
};

export const updateProgress = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId: string = req.userId;
  const { moduleId, status, score } = req.body;
  const result = await upsertProgress(userId, moduleId, {
    status,
    score,
    startedAt: new Date(),
    completedAt: status === 'completed' ? new Date() : undefined,
  });
  res.json(result);
};
