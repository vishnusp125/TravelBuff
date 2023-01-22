import express from 'express';
const router = express.Router();

import { Guidesignup,Guidesignin } from '../controllers/guide.js'

router.post('/guidesignup', Guidesignup);
router.post('/guidesignin', Guidesignin);



export default router;   