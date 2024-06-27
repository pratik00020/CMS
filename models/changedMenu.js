const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose); 

const changedMenuSchema = new mongoose.Schema({
  changed_menuID: {
    type: Number,
    unique: true
  },
  menu_itemID: {
    type: Number,
    required: true,
    ref: 'menuitem'
    
  }, 
  new_Item_Title: {
    type: String,
    required: true
  },
  enteredBy: {
    type: String,
    required: true
  },
  enteredAt: {
    type: Date,
    default: Date.now
  }
});

changedMenuSchema.plugin(AutoIncrement, { inc_field: 'changed_menuID' });

const ChangedMenu = mongoose.model('ChangedMenu', changedMenuSchema);
module.exports = ChangedMenu;

