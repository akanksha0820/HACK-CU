import { Router } from 'express';
import { listModules, listProgress, updateProgress } from '../controllers/trainingController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.get('/modules', authenticate, listModules);
router.get('/progress', authenticate, listProgress);
router.post('/progress', authenticate, updateProgress);

export default router;
