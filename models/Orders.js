const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    orderPlacer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    artworks: [
      {
        artworkRequired: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Artwork',
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    payMethod: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

orderSchema.path('artworks').validate(function (artworks) {
  if (!artworks) {
    return false;
  } else if (artworks.length === 0) {
    return false;
  }
  return true;
}, 'Minimum One product required to Order');

const order = mongoose.model('Order', orderSchema);

module.exports = order;
