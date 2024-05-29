const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    menu_cal_ID: {type: Schema.types.ObjectId, ref:'MenuCalendar', required: true},
    timing_type: { type: String, enum:['B', 'L', 'S'], required: true },
    veg_nonVeg: { type:String, enum: ['V', 'N'], required: true},
    item_categID: { type: Number, required: true},
    item_Title: {type: String, required: true},
    enteredBy: {type: String, required: true},
    enteredAt: {type: Date, required: true, default:Date.now}

}, {timestamps:true});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);
module.exports = MenuItem; 