import express from 'express';
import { userRegistration,login,logout, getProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router=express.Router();
router.post('/register',userRegistration);
router.post('/login',login);
router.post('/logout',logout);
router.get('/me', protect, getProfile);

export default router;