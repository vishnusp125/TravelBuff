import express from 'express';
import { adminProtect } from '../middleware/authMiddleware.js';
import {
    Adminsignin, Adminsignup, approveGuide, blockGuide, blockUser,
    getAllBookings,
    getAllDetails,
    getAllGuides, getAllUsers, unblockGuide, unblockUser, verifyGuide,
} from '../controllers/admin.js'
const router = express.Router();

router.post('/adminsignup', Adminsignup);
router.post('/adminsignin', Adminsignin);
router.get('/users', adminProtect, getAllUsers);
router.get('/blockUser/:id', adminProtect, blockUser);
router.get('/unblockUser/:id', adminProtect, unblockUser);
router.get('/guides', adminProtect, getAllGuides);
router.get('/blockGuides/:id', adminProtect, blockGuide);
router.get('/unblockGuides/:id', adminProtect, unblockGuide);
router.get('/approveGuides', adminProtect, approveGuide);
router.get('/verifyGuides/:id', adminProtect, verifyGuide);
router.get('/getAllBookings', adminProtect, getAllBookings);
router.get('/getAllDetails', adminProtect, getAllDetails);


export default router;






