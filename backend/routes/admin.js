import express from 'express';
const router = express.Router();

import { Adminsignin, Adminsignup, getAllUsers } from '../controllers/admin.js'

router.post('/adminsignup', Adminsignup);
router.post('/adminsignin', Adminsignin);
router.get('/adminUserMgt', getAllUsers);

export default router;






