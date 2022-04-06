const config = require('config.json');
const mongoose = require('mongoose');

// Mongoose and Mongo setup
mongoose.connect(process.env.MONGODB_URI || config.connectionString, {
  useCreateIndex: true,
  useNewUrlParser: true
});

module.exports = {
  Users: require('../models/user.model')
};
