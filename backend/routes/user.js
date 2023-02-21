import express from 'express';
const router = express.Router();
import {
    signup, signin, getGuides, guideSingle, verifyOtp, guideSearch,
    guideBooking, verifyPayment, getAllBookings, resentOtp, cancelBooking, userDetails, UserEditProfile   
} from '../controllers/user.js'    
import { protect } from '../middleware/authMiddleware.js';   

router.post('/signup', signup);    
router.post('/verifyOtp', verifyOtp)
router.post('/signin', signin);
router.get('/getGuides', getGuides);
router.get('/guideSingle/:id',protect, guideSingle);
router.get('/guideSearch', guideSearch)
router.post('/guideBooking',protect, guideBooking)
router.post('/verifyPayment',protect, verifyPayment)
router.get('/getAllBookings/:id',protect, getAllBookings)
router.post('/resentOtp', resentOtp)
router.post('/cancelBooking',protect, cancelBooking)
router.get('/userProfile/:id',protect, userDetails);
router.post('/UserEditProfile/:id',protect, UserEditProfile)



export default router;