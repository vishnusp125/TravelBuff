import express from 'express';
import { getConversation, getDetails, getUserDetails, postConversation } from '../controllers/conversation.js';
const router = express.Router();


router.post('/', postConversation);
router.get('/:userid', getConversation);
router.get('/guidedetails/:guideId', getDetails)
router.get('/userdetails/:userId', getUserDetails)


export default router;        