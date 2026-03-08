import { Router } from 'express';
import { listEvents, getEvent, createEvent, updateEvent, deleteEvent, signUpEvent } from '../controllers/eventController';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = Router();

router.get('/', listEvents);
router.get('/:id', getEvent);

// Protected routes (only logged in users)
router.post('/', authenticate, authorize(['coordinator', 'admin']), createEvent);
router.put('/:id', authenticate, authorize(['coordinator', 'admin']), updateEvent);
router.delete('/:id', authenticate, authorize(['coordinator', 'admin']), deleteEvent);
router.post('/:id/signup', authenticate, signUpEvent);

export default router;
