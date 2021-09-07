const express = require('express');

const router = express.Router();
const userController = require('../controllers/usersController');

router.get('/listAll', userController.listAllUsers); // listing all users
router.get('/showByID', userController.userByID); // listing user by id
router.post('/add', userController.addUser); // Adding users
router.put('/updateByID', userController.updateUser); // updating users
router.delete('/deleteByID', userController.removeUser); // deleting users

module.exports = router;
