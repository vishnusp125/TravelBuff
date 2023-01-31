import express from 'express';
const router = express.Router();

import { signup,signin, getGuides, guideSingle, verifyUser } from '../controllers/user.js'

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/getGuides', getGuides);
router.get('/guideSingle/:id', guideSingle);  
router.get("/:id/verify/:token",verifyUser)



export default router;