// Setting up mongoose with models we need
const mongoose = require('mongoose');

mongoose.set('debug', true);

// Mongoose and Mongo setup
mongoose.connect(process.env.MONGODB_URI || process.env.CONNECTIONSTRING, {});

module.exports = {
  Users: require('../models/user.model'),
  Stocks: require('../models/stock.model'),
  HistoryValue: require('../models/historyValue.model')
};
