import { Request, Response } from 'express';
import { getModules, getUserProgress, upsertProgress } from '../services/trainingService';
import { mockTrainingModules, mockTrainingProgress } from '../mockData';

const useMock = process.env.SKIP_DB === 'true';

export const listModules = async (_req: Request, res: Response) => {
  if (useMock) return res.json(mockTrainingModules);
  const modules = await getModules();
  res.json(modules);
};

export const listProgress = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId: string = req.userId;
  if (useMock) {
    const progress = mockTrainingProgress.filter((p) => p.userId === userId);
    return res.json(progress);
  }
  const progress = await getUserProgress(userId);
  res.json(progress);
};

export const updateProgress = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId: string = req.userId;
  const { moduleId, status, score } = req.body;
  if (useMock) {
    const existing = mockTrainingProgress.find((p) => p.userId === userId && p.moduleId === moduleId);
    const payload = {
      userId,
      moduleId,
      status,
      score,
      startedAt: new Date(),
      completedAt: status === 'completed' ? new Date() : undefined,
    };
    if (existing) {
      Object.assign(existing, payload);
      return res.json(existing);
    }
    mockTrainingProgress.push(payload);
    return res.json(payload);
  }
  const result = await upsertProgress(userId, moduleId, {
    status,
    score,
    startedAt: new Date(),
    completedAt: status === 'completed' ? new Date() : undefined,
  });
  res.json(result);
};
