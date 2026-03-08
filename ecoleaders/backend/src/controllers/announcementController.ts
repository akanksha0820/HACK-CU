import { Request, Response } from 'express';
import { createAnnouncement, listAnnouncements } from '../services/announcementService';

export const getAnnouncements = async (_req: Request, res: Response) => {
  const announcements = await listAnnouncements();
  res.json(announcements);
};

export const postAnnouncement = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId: string = req.userId;
    const announcement = await createAnnouncement({ ...req.body, createdBy: userId });
    res.status(201).json(announcement);
  } catch (err: any) {
    res.status(500).json({ message: err.message || 'Error creating announcement' });
  }
};
