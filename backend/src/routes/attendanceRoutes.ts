import { Router } from 'express';
import { markAttendance } from '../controllers/attendanceController';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authenticate, authorize(['coordinator', 'admin']), markAttendance);

export default router;
