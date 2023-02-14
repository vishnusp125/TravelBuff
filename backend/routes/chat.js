import express from 'express';
import { accessChat } from '../controllers/chat.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();


router.post('/',protect,accessChat);
// router.get('/', fetchChat)

export default router;    