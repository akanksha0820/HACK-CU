import { Request, Response } from 'express';
import User from '../models/User';
import { mockUsers } from '../mockData';

const useMock = process.env.SKIP_DB === 'true';

export const listVolunteers = async (_req: Request, res: Response) => {
  if (useMock) {
    const volunteers = mockUsers.filter((u) => ['volunteer', 'coordinator'].includes(u.role)).map(({ password, ...rest }) => rest);
    return res.json(volunteers);
  }
  const volunteers = await User.find({ role: { $in: ['volunteer', 'coordinator'] } }).select('-password');
  res.json(volunteers);
};
