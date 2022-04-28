const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  value: { type: Number, required: true },
  date: { type: Date, required: true }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('HistoryValue', schema);
