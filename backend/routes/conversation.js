import express from 'express';
import { getConversation, postConversation } from '../controllers/conversation.js';
const router = express.Router();


router.post('/', postConversation);
router.get('/:userid', getConversation);

export default router;    