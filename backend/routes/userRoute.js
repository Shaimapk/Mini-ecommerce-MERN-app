import express from 'express';
import { userRegistration,login } from '../controllers/userController.js';

const router=express.Router();
router.post('/register',userRegistration);
router.post('/login',login);

export default router;