const bcrypt = require('bcryptjs');
const Users = require('../models/Users');
const mail = require('../mailing/gmail');

// sign Up AN User
const signupUser = async (req, res) => {
  try {
    const userAdd = new Users({
      ...req.body,
    });
    await userAdd.save();
    await mail.userSignUp(req.body.email);
    const token = await userAdd.generateAuthToken();
    res.status(201).json({
      success: true,
      message: 'new User added successfully',
      userAdd,
      token,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// logging in an user

const userLogin = async (req, res) => {
  try {
    const user = await Users.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.json({ error: error.message });
  }
};

// list all the Users
const listAllUsers = async (req, res) => {
  try {
    const list = await Users.find();
    res.status(200).json({
      success: true,
      message: 'heres the list of all the Users',
      list,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Updating your ID

const updateUser = async (req, res) => {
  try {
    const user = Users.findById(req.user._id);
    const updateData = {
      ...req.body,
      password: req.body.password
        ? await bcrypt.hash(req.body.password, 8)
        : req.body.password,
    };

    updateData.password
      ? await mail.userPassword(req.user.email)
      : await mail.userUpdate(req.user.email);
    const found = await Users.updateOne(
      user,
      { $set: updateData },
      { omitUndefined: 1 }
    );
    if (!found) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
    } else {
      res.status(201).json({
        success: true,
        message: 'User updated sucessfully',
        updateData,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
    console.log(error);
  }
};

// Removing your account

const removeMe = async (req, res) => {
  try {
    const user = await Users.findByIdAndDelete(req.user._id);
    res.status(200).json({
      success: true,
      message: 'Successfully deleted your account',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  signupUser,
  userLogin,
  listAllUsers,
  updateUser,
  removeMe,
};
