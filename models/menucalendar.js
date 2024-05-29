const mongoose = require('mongoose');

const menuCalendarSchema = new mongoose.Schema({
    cal_date : {type: Date, required: true },
    enteredBy: {type: String, required:true},
    enteredAt: {type: Date, required: true, default: Date.now }
},
{timestamps: true}
);

const MenuCalendar = mongoose.model('Menucalendar', menuCalendarSchema);
module.exports = MenuCalendar;