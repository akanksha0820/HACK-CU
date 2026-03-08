import { Request, Response } from 'express';
import { createAnnouncement, listAnnouncements } from '../services/announcementService';
import { mockAnnouncements } from '../mockData';

const useMock = process.env.SKIP_DB === 'true';

export const getAnnouncements = async (_req: Request, res: Response) => {
  if (useMock) return res.json(mockAnnouncements);
  const announcements = await listAnnouncements();
  res.json(announcements);
};

export const postAnnouncement = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId: string = req.userId;
    if (useMock) {
      const ann = { _id: new Date().getTime().toString(), ...req.body, createdBy: userId, createdAt: new Date() };
      mockAnnouncements.unshift(ann);
      return res.status(201).json(ann);
    }
    const announcement = await createAnnouncement({ ...req.body, createdBy: userId });
    res.status(201).json(announcement);
  } catch (err: any) {
    res.status(500).json({ message: err.message || 'Error creating announcement' });
  }
};
