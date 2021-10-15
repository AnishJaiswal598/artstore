const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const artworkSchema = new Schema(
  {
    artImage: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    size: {
      type: Array,
      description: 'Enter length, breadth.',
    },
  },
  { timestamps: true }
);

const artwork = mongoose.model('Artwork', artworkSchema);

module.exports = artwork;
