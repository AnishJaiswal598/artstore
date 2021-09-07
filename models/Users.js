const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },

    age: {
      type: Number,
      default: 0,
    },
    address: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlngth: 7,
    },
  },
  { timestamps: true }
);

const user = mongoose.model('User', userSchema);

module.exports = user;
