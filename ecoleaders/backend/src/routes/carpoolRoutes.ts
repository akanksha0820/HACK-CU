import { Router } from 'express';
import { listCarpools, createCarpool, joinCarpool } from '../controllers/carpoolController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

// List carpools for an event
router.get('/event/:eventId', authenticate, listCarpools);
// Create carpool
router.post('/', authenticate, createCarpool);
// Join carpool
router.post('/:carpoolId/join', authenticate, joinCarpool);

export default router;