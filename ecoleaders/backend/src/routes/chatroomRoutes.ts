import { Router } from 'express';
import { listChatRooms, listMessages } from '../controllers/chatroomController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authenticate, listChatRooms);
router.get('/:roomId/messages', authenticate, listMessages);

export default router;
