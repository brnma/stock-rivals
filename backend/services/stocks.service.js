const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const Stocks = db.Stocks;
const Users = db.USers;
const TSLAdata = require('../models/TSLA');

module.exports = {
  grabHistoricalData,
  grabUserStocks
};

// grab the specified stock's data for the past X days/months/years/...
async function grabHistoricalData(symbol) {
  if (!symbol) throw 'No stock symbol specified';
  // data is formated for ngx charts compatibility
  const data = {
    name: symbol,
    series: []
  };
  // get data from api
  const response = TSLAdata; //TODO: change to api call
  response.data.map((item) => {
    data.series.push({
      value: item.close,
      date: item.date
    });
  });
  return data;
}

// get latest data for each stock in user's portfolio
async function grabUserStocks() {}
