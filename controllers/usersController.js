const Users = require('../models/Users');

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

// call the user by id

const userByID = async (req, res) => {
  try {
    const userID = req.body.userID;
    const showUser = await Users.findById(userID);
    res.status(200).json({
      success: true,
      message: 'The User of given id is given below',
      showUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ADDING AN User
const addUser = async (req, res) => {
  try {
    const userAdd = new Users({
      ...req.body,
    });
    const newUser = await userAdd.save();
    res.status(201).json({
      success: true,
      message: 'new User added successfully',
      newUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Updating an User by its ID

const updateUser = async (req, res) => {
  try {
    const userID = req.body.userID;
    const updateData = {
      ...req.body,
    };
    const found = await Users.findByIdAndUpdate(
      userID,
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
  }
};

// Deleting an User by its ID

const removeUser = async (req, res) => {
  try {
    const userID = req.body.userID;
    await Users.findByIdAndDelete(userID);
    res.status(200).json({
      success: true,
      message: 'Users removed successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { listAllUsers, userByID, addUser, updateUser, removeUser };
