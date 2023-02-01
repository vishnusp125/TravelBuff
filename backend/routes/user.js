import express from 'express';
const router = express.Router();

import { signup,signin, getGuides, guideSingle, verifyOtp } from '../controllers/user.js'

router.post('/signup', signup);
router.post('/verifyOtp',verifyOtp)
router.post('/signin', signin);
router.get('/getGuides', getGuides);
router.get('/guideSingle/:id', guideSingle);  


export default router;