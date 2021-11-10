import bcrypt from 'bcryptjs';
import multer from 'multer';
import path from 'path';
import Users from '../models/Users.js';
import { userSignUp, userUpdate, userPassword } from '../mailing/gmail.js';

// sign Up AN User

// Getting users profile pic
const a = new Date();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/userProfile');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
        '-' +
        a.getDate() +
        import(a.getMonth() + 1) +
        '-' +
        a.getFullYear() +
        '-' +
        a.getHours() +
        '.' +
        a.getMinutes() +
        '.' +
        a.getSeconds() +
        ' ' +
        path.extname(file.originalname)
    );
  },
});

const uploadImg1 = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single('profileImage');

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  filetypes.test(path.extname(file.originalname).toLowerCase());

  const mimetype = filetypes.test(file.mimetype);

  if (filetypes && mimetype) {
    return cb(null, true);
  } else {
    return cb('Error:Images only');
  }
}
const signupUser = async (req, res) => {
  try {
    if (req.file) {
      const userAdd = new Users({
        ...req.body,
        image: req.file.path,
      });
      await userAdd.save();
      await userSignUp(req.body.email);
      const token = await userAdd.generateAuthToken();
      res.status(201).json({
        success: true,
        message: 'new User added successfully',
        userAdd,
        token,
      });
    } else {
      const userAdd = new Users({
        ...req.body,
      });

      await userAdd.save();
      await userSignUp(req.body.email);
      const token = await userAdd.generateAuthToken();
      res.status(201).json({
        success: true,
        message: 'new User added successfully',
        userAdd,
        token,
      });
    }
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

//logout user
const logoutUser = async(req, res) => {
  try{
    req.tokens === ''

    res.json({
      success: true, 
      message: 'Logged out successfully'
    })
  } catch(e) {
    console.log(e)
    res.status(500).json({
      success: false,
      message: e.message
    })
  }
}

// getting profile
const showMyProfile = async (req, res) => {
  try {
    const profile = await req.user;
    res.status(200).json({
      success: true,
      message: 'heres your profile',
      profile,
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
      // image: req.file.path,
      password: req.body.password
        ? await bcrypt.hash(req.body.password, 8)
        : req.body.password,
    };

    updateData.password
      ? await userPassword(req.user.email)
      : await userUpdate(req.user.email);
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

export {
  signupUser,
  uploadImg1,
  userLogin,
  logoutUser,
  showMyProfile,
  updateUser,
  removeMe,
};
