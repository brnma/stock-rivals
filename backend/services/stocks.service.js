const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const Stocks = db.Stocks;
const Users = db.USers;
const data = require('../models/TSLA');

module.exports = {
  grabHistoricalData,
  grabUserStocks
};

// grab the specified stock's data for the past X days/months/years/...
async function grabHistoricalData(symbol) {
  // if (!symbol) throw 'No stock symbol specified';
  // console.log('grabHistoricalData');
  // // data is formated for ngx charts compatibility
  // const data = {
  //   name: symbol,
  //   series: [{ value: Number, date: String }]
  // };
  // // do api calls here
  // const response = [1, 2, 3];
  // response.data.map((item) => {
  //   data.series.push({
  //     value: item.close,
  //     date: item.date
  //   });
  // });
  // console.log(data);
  // return 'hi';
}

// get latest data for each stock in user's portfolio
async function grabUserStocks() {}
