import { Router } from 'express';
import { getBadges, postBadge } from '../controllers/badgeController';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authenticate, getBadges);
router.post('/', authenticate, authorize(['coordinator', 'admin']), postBadge);

export default router;
