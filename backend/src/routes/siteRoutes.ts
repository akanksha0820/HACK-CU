import { Router } from 'express';
import { generateSite } from '../controllers/siteController';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = Router();

// Only staff can generate a new site template
router.post('/generate', authenticate, authorize(['staff']), generateSite);

export default router;