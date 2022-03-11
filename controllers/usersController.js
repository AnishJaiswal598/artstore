import bcrypt from 'bcryptjs';
import multer from 'multer';
import path from 'path';
import lodash from 'lodash';
import otpGenerator from 'otp-generator';
import Users from '../models/Users.js';
import Otp from '../models/otpModel.js';

import {
  userSignUp,
  userUpdate,
  userPassword,
  userPasswordReset,
  otpSend,
} from '../mailing/gmail.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../models/Users.js';
dotenv.config();
let resetLink = 'https://google.com';

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
// const signupUser = async (req, res) => {
//   let userAdd;
//   try {
//     if (req.file) {
//       userAdd = new Users({
//         ...req.body,
//         image: req.file.path,
//       });
//     } else {
//       userAdd = new Users({
//         ...req.body,
//       });
//     }
//     await userAdd.save();
//     await userSignUp({
//       from: process.env.EMAIL,
//       to: req.body.email,
//       subject: "Anish's Artstore",
//       template: 'signUp',
//       templateVars: {
//         emailAddress: req.body.email,
//         name: req.body.name,
//         resetLink,
//       },
//     });
//     const token = await userAdd.generateAuthToken();
//     res.status(201).json({
//       success: true,
//       message: 'new User added successfully',
//       userAdd,
//       token,
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
let signpuEmail;
let signupPassword;
const signupUser = async (req, res) => {
  signupPassword = req.body.password;
  signpuEmail = req.body.email;
  try {
    const userAdd = await Users.findOne({ email: signpuEmail });
    if (userAdd) {
      res.status(400).json({
        success: false,
        message: 'User already registered,Try Signing In',
      });
      return;
    }
    const OTP = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    console.log(OTP);
    const otp = new Otp({ email: signpuEmail, otp: OTP });
    console.log(otp);
    const salt = await bcrypt.genSalt(10);
    otp.otp = await bcrypt.hash(otp.otp, salt);
    const result = await otp.save();
    await otpSend({
      from: process.env.EMAIL,
      to: signpuEmail,
      subject: "Anish's Artstore",
      template: 'otp',
      templateVars: {
        emailAddress: signpuEmail,
        otp: OTP,
        resetLink
      },
    });
    res.status(200).send({
      success: true,
      message: 'OTP sent successfully to your registered email-Id',
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const verifyOtp = async (req, res) => {
  const pass = signupPassword;
  try {
    const email = signpuEmail;
    const otp = req.body.otp;
    const otpHolder = await Otp.find({
      email: email,
    });
    if (otpHolder.length === 0) {
      res.status(400).send({
        success: false,
        message: 'You are using an expired Otp',
      });
      return;
    }
    const rightOtpfind = otpHolder[otpHolder.length - 1];
    const validUser = await bcrypt.compare(otp, rightOtpfind.otp);
    if (rightOtpfind.email == signpuEmail && validUser) {
      const user = new Users({ email: email, password: pass });
      await user.save();
      await userSignUp({
        from: process.env.EMAIL,
        to: req.body.email,
        subject: "Anish's Artstore",
        template: 'signUp',
        templateVars: {
          emailAddress: email,
          name: req.body.name,
          resetLink
        },
      });
      const token = await user.generateAuthToken();
      const deleteOtp = await Otp.deleteMany({
        email: rightOtpfind.email,
      });
      res.status(200).send({
        success: true,
        message: 'New User created successfully',
        user,
        token,
      });
    } else {
      res.status(400).send({
        success: false,
        message: 'Plz enter the correct OTP',
      });
    }
  } catch (error) {
    console.log(error);
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
const logoutUser = async (req, res) => {
  try {
    req.tokens === '';

    res.json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

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
    console.log(user);
    const updateData = {
      ...req.body,
      // image: req.file.path,
      password: req.body.password
        ? await bcrypt.hash(req.body.password, 8)
        : req.body.password,
    };

    updateData.password
      ? await userPassword({
          from: process.env.EMAIL,
          to: req.body.email,
          subject: "Anish's Artstore",
          template: 'updateProfile',
          templateVars: {
            emailAddress: req.body.email,
            name: req.body.name,
            resetLink,
          },
        })
      : await userUpdate({
          from: process.env.EMAIL,
          to: req.body.email,
          subject: "Anish's Artstore",
          template: 'signUp',
          templateVars: {
            emailAddress: req.body.email,
            name: req.body.name,
            resetLink,
          },
        });
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

const forgotPassword = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await Users.findOne({ email: email });
    if (!user) {
      res.status(404).json({
        message: 'User not found',
      });
    }

    const secret = process.env.SECRET_KEY + user.password;
    const payload = {
      email: user.email,
      id: user._id,
    };
    const newToken = jwt.sign(payload, secret, { expiresIn: '15m' });
    console.log(newToken);
    const link = `http://localhost:3001/api/artstore/users/reset-password/${user._id}/${newToken}`;
    await userPasswordReset({
      from: process.env.EMAIL,
      to: req.body.email,
      subject: "Anish's Artstore",
      template: 'updatePassword',
      templateVars: {
        emailAddress: user.email,
        name: user.name,
        resetLink: link,
      },
    });
    res.status(201).send({
      success: true,
      message: 'Password reset link was sent to your registered EmailId',
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};

const resetPassword = async (req, res) => {
  //delete this
  const user = await Users.findOne({ email: 'anishjaiswal0987@gmail.com' }); //
  const { _id, newToken } = req.params;
  if (req.params._id != user._id) {
    res.status(400).json({
      success: false,
      message: 'Invalid User',
    });
    return;
  }
  const secret = process.env.SECRET_KEY + user.password;
  try {
    const payload = jwt.verify(newToken, secret);
    const newPassword = {
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    };
    if (newPassword.password != newPassword.confirmPassword) {
      res.status(400).json({
        success: false,
        message: 'newPassword and confirmPassword must be the same',
      });
      return;
    }
    const found = await Users.updateOne(
      user,
      { $set: { password: newPassword.password } },
      { omitUndefined: 1 }
    );
    res.status(201).json({
      success: true,
      message: 'User Updated successfully',
    });
  } catch (error) {
    console.log(error);
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
  forgotPassword,
  resetPassword,
  verifyOtp,
};
