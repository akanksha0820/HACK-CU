import { Router } from 'express';
import { authenticate } from '../middleware/authMiddleware';
import { listAnnouncements } from '../services/announcementService';

const router = Router();

router.get('/', authenticate, async (_req, res) => {
  const announcements = await listAnnouncements();
  res.json({ announcements });
});

export default router;
