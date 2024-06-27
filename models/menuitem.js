const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  menu_itemID: { type: Number, required: true, unique: true, ref: 'changedmenu' }, // Unique identifier for each menu item
  menu_cal_ID: { type: Number, required: true, ref: 'menucalendar' }, // Foreign key reference to M_Menu_Calendar
  timing_type: { type: String, required: true }, // B for Breakfast, L for Lunch, S for Snacks
  veg_nonVeg: { type: String, required: true }, // V for Veg, N for Non-Veg
  item_categID: { type: Number, required: true, ref: 'M_Item_Category' }, // Foreign key reference to M_Item_Category
  item_Title: { type: String, required: true }, // Title of the menu item
  enteredBy: { type: String, required: true }, // User who entered the item
  enteredAt: { type: Date, default: Date.now } // Timestamp of when the item was entered
});

const menuitem = mongoose.model('menuitem', menuItemSchema);

module.exports = menuitem;
