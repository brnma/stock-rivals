const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  symbol: { type: String, unique: true, required: true },
  shares: { type: Number, unique: true, required: true },
  value: { type: Number, unique: true, required: true }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Stock', schema);
