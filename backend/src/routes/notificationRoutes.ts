import { Router } from 'express';
import { authenticate } from '../middleware/authMiddleware';
import { listAnnouncements } from '../services/announcementService';
import { mockAnnouncements } from '../mockData';

const router = Router();

router.get('/', authenticate, async (_req, res) => {
  if (process.env.SKIP_DB === 'true') {
    return res.json({ announcements: mockAnnouncements });
  }
  const announcements = await listAnnouncements();
  res.json({ announcements });
});

// Demo push registration stub
router.post('/register', authenticate, async (_req, res) => {
  res.json({ success: true, message: 'Push registration stored (demo stub).' });
});

export default router;
