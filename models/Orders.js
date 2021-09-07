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
        artworkSelected: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Artworks',
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
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

const order = mongoose.model('Order', orderSchema);

module.exports = order;
