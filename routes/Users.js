const express = require('express');

const router = express.Router();
const userController = require('../controllers/usersController');
const auth = require('../middleware/authMiddleware');

router.post('/register', userController.uploadImg1, userController.signupUser); // register users
router.post('/login', userController.userLogin); // logging users
router.get('/listAll', auth.protect, auth.admin, userController.listAllUsers); // listing all users by admin
router.put(
  '/update',
  auth.protect,
  userController.uploadImg1,
  userController.updateUser
); // updating myself
router.delete('/delete', auth.protect, userController.removeMe); // deleting myself
module.exports = router;
