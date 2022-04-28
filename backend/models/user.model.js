const mongoose = require('mongoose');
const { Stock } = require('./stock.model');
const Schema = mongoose.Schema;

const schema = new Schema({
  username: { type: String, unique: true, required: true },
  profileImage: {
    type: String,
    required: false
  },
  hash: { type: String, required: true },
  email: { type: String, required: true },
  stocks: { type: [Stock] },
  prevValue: { type: Number, required: true },
  buyingPower: { type: Number, required: true },
  currValue: { type: Number, required: true },
  groupCode: { type: String, required: true }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);
