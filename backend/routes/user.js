import express from 'express';
const router = express.Router();

import { signup,signin, getGuides, guideSingle, verifyOtp, guideSearch, guideBooking } from '../controllers/user.js'
import { protect } from '../middleware/authMiddleware.js';

router.post('/signup', signup);
router.post('/verifyOtp',verifyOtp)
router.post('/signin', signin);
router.get('/getGuides', getGuides);
router.get('/guideSingle/:id',protect, guideSingle);  
router.get('/guideSearch',guideSearch)
router.post('/guideBooking',guideBooking)




export default router;