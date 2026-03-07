import { Router } from 'express';
import { listEvents, getEvent, createEvent, updateEvent, deleteEvent, signUpEvent } from '../controllers/eventController';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = Router();

router.get('/', listEvents);
router.get('/:id', getEvent);

// Protected routes (only logged in users)
router.post('/', authenticate, authorize(['staff']), createEvent);
router.put('/:id', authenticate, authorize(['staff']), updateEvent);
router.delete('/:id', authenticate, authorize(['staff']), deleteEvent);
router.post('/:id/signup', authenticate, signUpEvent);

export default router;