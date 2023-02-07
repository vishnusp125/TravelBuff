import express from 'express';
import { adminProtect } from '../middleware/authMiddleware.js';
import { Adminsignin, Adminsignup, approveGuide, blockGuide, blockUser,
    getAllGuides, getAllUsers,unblockGuide,unblockUser, verifyGuide, 
} from '../controllers/admin.js'
const router = express.Router();

router.post('/adminsignup', Adminsignup);
router.post('/adminsignin', Adminsignin);

router.get('/users',adminProtect,getAllUsers);
router.get('/blockUser/:id', blockUser);
router.get('/unblockUser/:id', unblockUser);

router.get('/guides', getAllGuides);
router.get('/blockGuides/:id', blockGuide);
router.get('/unblockGuides/:id', unblockGuide);
router.get('/approveGuides', approveGuide);
router.get('/verifyGuides/:id', verifyGuide);

// router.get('/rejectGuides/:id', rejectGuide);

export default router;






