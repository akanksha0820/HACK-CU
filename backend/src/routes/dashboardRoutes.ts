import { Router } from 'express';
import { getVolunteerDashboard, getCoordinatorDashboard } from '../controllers/dashboardController';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = Router();

router.get('/volunteer', authenticate, getVolunteerDashboard);
router.get('/coordinator', authenticate, authorize(['coordinator', 'admin']), getCoordinatorDashboard);

export default router;
