import express from 'express';
import { getConversation, getDetails, postConversation } from '../controllers/conversation.js';
const router = express.Router();


router.post('/', postConversation);
router.get('/:userid', getConversation);
router.get('/guidedetails/:guideId', getDetails)


export default router;        