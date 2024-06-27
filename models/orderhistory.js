const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderHistorySchema = new Schema({
  orderBy: {
    type: String,
    required: true
  },
  orderedAt: {
    type: Date,
    required: true
  },
  orderType: {
    type: String,
    required: true,
    enum: ['C', 'D'] // C-calendar Item, D-Daily Item
  },
  menu_Id: {
    type: Number,
    ref: 'dailyorder' // Reference to the M_dailyOrderItem collection
  },
  MenuItem_cal_ID: {
    type: Number,
    ref: 'menuitem' // Reference to the M_Menu_Item collection
  }
});

const OrderHistory = mongoose.model('OrderHistory', orderHistorySchema);
module.exports = OrderHistory;