import { Router } from 'express';
import { textToSpeech } from '../controllers/aiController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

// Text to speech (authenticated users)
router.post('/speech', authenticate, textToSpeech);

export default router;