import express from 'express';
const router = express.Router();

import { Guidesignup,Guidesignin, activityPost, languagePost, guideDetails, pricePost, descriptionPost,  } from '../controllers/guide.js'

router.post('/guidesignup', Guidesignup);
router.post('/guidesignin', Guidesignin);
router.post('/activityPost', activityPost);
router.post('/languagePost', languagePost);
router.get('/guideHome/:id',guideDetails)
router.post('/pricePost', pricePost);
router.post('/descriptionPost', descriptionPost);




export default router;   