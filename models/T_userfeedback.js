
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userFeedbackSchema = new Schema({
  userID: {
    type: String,
    required: true,
    ref: 'usermaster' // Assuming 'UserMaster' is the model name for M_userMaster table
  },
  date: {
    type: Date,
    required: true
  },
  menuItem_ID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'menuitem' // Assuming 'MenuItem' is the model name for M_Menu_Item table
  },
  rating: {
    type: Number,
    required: true
  },
  remarks: {
    type: String,
    required: true
  },
  enteredAt: {
    type: Date,
    default: Date.now
  }
});

const UserFeedback = mongoose.model('UserFeedback', userFeedbackSchema);
module.exports = UserFeedback;
