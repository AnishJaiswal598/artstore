import express from 'express';
import {
  signupUser,
  uploadImg1,
  userLogin,
  showMyProfile,
  updateUser,
  removeMe,
} from '../controllers/usersController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', uploadImg1, signupUser); // register users
router.post('/login', userLogin); // logging users
router.get('/showMe', protect, showMyProfile); // Show my profile
router.put('/update', protect, uploadImg1, updateUser); // updating myself
router.delete('/delete', protect, removeMe); // deleting myself

export default router;
