import { Router } from 'express';
import { listVolunteers } from '../controllers/volunteerController';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authenticate, authorize(['coordinator', 'admin']), listVolunteers);

export default router;
