import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const artworkSchema = new Schema(
  {
    artImage: {
      type: String,
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

export default artwork;
