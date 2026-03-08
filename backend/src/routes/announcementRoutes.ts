import { Router } from 'express';
import { getAnnouncements, postAnnouncement } from '../controllers/announcementController';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authenticate, getAnnouncements);
router.post('/', authenticate, authorize(['coordinator', 'admin']), postAnnouncement);

export default router;
