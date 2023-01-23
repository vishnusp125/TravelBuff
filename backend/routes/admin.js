import express from 'express';
const router = express.Router();

import { Adminsignin, Adminsignup, approveGuide, blockGuide, blockUser,
         getAllGuides, getAllUsers,unblockGuide,unblockUser, verifyGuide, 
         } from '../controllers/admin.js'

router.post('/adminsignup', Adminsignup);
router.post('/adminsignin', Adminsignin);

router.get('/users', getAllUsers);
router.get('/blockUser/:id', blockUser);
router.get('/unblockUser/:id', unblockUser);

router.get('/guides', getAllGuides);
router.get('/blockGuides/:id', blockGuide);
router.get('/unblockGuides/:id', unblockGuide);
router.get('/approveGuides', approveGuide);
router.get('/verifyGuides/:id', verifyGuide);

// router.get('/rejectGuides/:id', rejectGuide);

export default router;






