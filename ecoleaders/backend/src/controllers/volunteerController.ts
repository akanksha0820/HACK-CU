import { Request, Response } from 'express';
import User from '../models/User';

export const listVolunteers = async (_req: Request, res: Response) => {
  const volunteers = await User.find({ role: { $in: ['volunteer', 'coordinator'] } }).select('-password');
  res.json(volunteers);
};
