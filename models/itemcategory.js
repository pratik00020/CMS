const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemCategorySchema = new Schema({
  title: { type: String, required: true },
  enteredBy: { type: String, required: true, ref: 'UserMaster' },
  enteredAt: { type: Date, default: Date.now }
});

const ItemCategory = mongoose.model('ItemCategory', itemCategorySchema);
module.exports = ItemCategory;