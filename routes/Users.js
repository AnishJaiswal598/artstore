import express from 'express';
import {
  signupUser,
  uploadImg1,
  userLogin,
  logoutUser,
  showMyProfile,
  updateUser,
  removeMe,
  forgotPassword,
  resetPassword,
  verifyOtp,
} from '../controllers/usersController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', signupUser); // register users
router.post('/register/otpCheck', verifyOtp); // register users
router.post('/login', userLogin); // logging users
router.post('/logout', protect, logoutUser); //logout user
router.get('/showMe', protect, showMyProfile); // Show my profile
router.put('/update', protect, uploadImg1, updateUser); // updating myself
router.delete('/delete', protect, removeMe); // deleting myself
router.post('/forgot-password', forgotPassword); // forgot-password
router.post('/reset-password/:_id/:newToken', resetPassword);

export default router;
