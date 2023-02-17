import express from 'express';
const router = express.Router();
    
import { Guidesignup,Guidesignin, activityPost, languagePost, guideDetails, pricePost, descriptionPost, guideBookings,  } from '../controllers/guide.js'
import { guideProtect } from '../middleware/authMiddleware.js';

router.post('/guidesignup', Guidesignup);
router.post('/guidesignin', Guidesignin);
router.post('/activityPost',guideProtect, activityPost);
router.post('/languagePost',guideProtect, languagePost);
router.get('/guideHome/:id',guideProtect,guideDetails)
router.post('/pricePost',guideProtect, pricePost);
router.post('/descriptionPost',guideProtect, descriptionPost);
router.get('/guideBookings/:id',guideProtect, guideBookings);




export default router;   