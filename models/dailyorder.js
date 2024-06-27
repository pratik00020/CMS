const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  item_Name: {
    type: String,
    required: true
  },
  orderType: {
    type: String,
    required: true,
    enum: ['I', 'P'] // I-instant, P-preorder
  },
  Time_reqToPrepare: {
    type: Number,
    required: true
  },
  enteredBy: {
    type: String,
    required: true
  },
  enteredAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  Veg_NonVeg: {
    type: String,
    required: true,
    enum: ['V', 'N'] // V-veg, N-nonVeg
  },
  ReqNoCoupons: {
    type: Number,
    required: true
  },
  Amount: {
    type: mongoose.Decimal128,
    required: true
  }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
