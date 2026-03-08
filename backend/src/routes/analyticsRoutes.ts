import { Router } from 'express';
import { getAnalytics } from '../controllers/analyticsController';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authenticate, authorize(['coordinator', 'admin']), getAnalytics);

export default router;
