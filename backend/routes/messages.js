import express from 'express';
const router = express.Router();
import { getMessage, postMessage } from '../controllers/message.js';


router.post('/', postMessage);
router.get('/:conversationId', getMessage);

export default router;