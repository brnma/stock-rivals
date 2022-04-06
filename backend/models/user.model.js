const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  username: { type: String, unique: true, required: true },
  profileImage: {
    data: Buffer,
    contentType: String
  },
  hash: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);
