const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const Stocks = db.Stocks;
const Users = db.Users;
const TSLAdata = require('../models/TSLA');
const { default: axios } = require('axios');

module.exports = {
  grabHistoricalData,
  grabUserStocks,
  buyStocks,
  sellStocks
};

// grab the specified stock's data for the past X days/months/years/...
async function grabHistoricalData(symbol) {
  if (!symbol) throw 'No stock symbol specified';
  // data is formated for ngx charts compatibility
  const data = {
    name: symbol,
    series: []
  };
  // date to/from for api call
  let date_to = new Date();
  let date_from = new Date();
  //date to is a year ago
  date_from.setFullYear(new Date().getFullYear() - 1);
  // change date to a string in YYYY-MM-DD format
  date_to = date_to.toISOString().slice(0, 10);
  date_from = date_from.toISOString().slice(0, 10);

  // get data from api
  // const api_url = `https://api.marketstack.com/v1/intraday?access_key=${
  //   process.env.MARKETKEY
  // }&symbols=${symbol}&date_from=${date_from}&date_to=${date_to}&limit=${365}`;
  // const response = await axios.get(api_url);
  // response.data.data.forEach((item) => {
  const response = TSLAdata; //!sandbox
  response.data.forEach((item) => {
    data.series.push({
      value: item.last === null ? item.open : item.last,
      date: item.date
    });
  });
  return data;
}

// get latest data for each stock in user's portfolio
async function grabUserStocks(userId) {
  let user = await findUser(userId);
  let response = {
    data: {
      data: [
        {
          open: 169.11,
          last: 0,
          close: 167.23
        }
      ]
    }
  };

  // create new array of user's updated stocks
  const newStocks = [];
  for (const stock of user.stocks) {
    //* api call with the current symbol
    // const api_url = `https://api.marketstack.com/v1/intraday/latest?access_key=${process.env.MARKETKEY}&symbols=${stock.symbol}`;
    // const response = await axios.get(api_url);
    //* if stock market is closed then set newvalue to open price of stock
    const newValue = response.data.data[0].last === null ? response.data.data[0].open : response.data.data[0].last;
    newStocks.push({ ...stock, value: newValue });
  }
  console.log(newStocks);
  await user.updateOne({ stocks: newStocks });
  await user.updateOne({ prevValue: user.currValue });
  await user.updateOne({ currValue: calcValue(newStocks) });
  return await findUser(userId);
}

async function buyStocks(stockBuyingData, userId) {
  if (!stockBuyingData) throw 'No stock data given';

  // deconstructs incoming buying data and calcs totalPrice
  const { amtSharesBuy, currentDay } = stockBuyingData;
  const totalPrice = amtSharesBuy * currentDay.value;

  const user = await findUser(userId);

  // TODO buying logic

  // checks to see if user has the dough to buy
  if (user.buyingPower < totalPrice) throw 'User has not enough cash';

  // checks to see if user already has the stock or not
  const stock = user.stocks.find((curr) => curr.symbol === currentDay.symbol);
  let newStockArr;
  if (stock) {
    // updates existing stock if exist
    const updateStock = {
      ...stock,
      shares: amtSharesBuy + stock.shares,
      value: currentDay.value
    };
    const oldArr = user.stocks.filter((curr) => curr.symbol !== currentDay.symbol);
    newStockArr = [...oldArr, updateStock];
  } else {
    // else add new stock if not
    const newStock = {
      symbol: currentDay.symbol,
      shares: amtSharesBuy,
      value: currentDay.value
    };

    newStockArr = [...user.stocks, newStock];
  }

  await Users.updateOne(
    { id: userId },
    {
      stocks: newStockArr,
      prevValue: user.currValue,
      buyingPower: user.currValue - totalPrice,
      currValue: calcValue(newStockArr) + user.buyingPower
    }
  );
  console.log(stock);

  return 'Success';
}

async function sellStocks(stockSellingData, userId) {
  if (!stockSellingData) throw 'No stock selling data given';
  // deconstructs incoming buying data and calcs totalPrice
  const { amtSharesSell, currentDay } = stockSellingData;
  const totalPrice = amtSharesSell * currentDay.value;

  const user = await findUser(userId);

  // TODO logic before and after selling stocks
  // checks to see if user already has the stock or not
  const stock = user.stocks.find((curr) => curr.symbol === currentDay.symbol);
  if (!stock) throw 'Stock not found on user';
  // updates existing stock
  const updateStock = {
    ...stock,
    shares: stock.shares - amtSharesSell,
    value: currentDay.value
  };
  const oldArr = user.stocks.filter((curr) => curr.symbol !== currentDay.symbol);

  let newStockArr = [...oldArr, updateStock];

  await Users.updateOne(
    { id: userId },
    {
      stocks: newStockArr,
      prevValue: user.currValue,
      buyingPower: totalPrice + user.buyingPower,
      currValue: calcValue(newStockArr) + user.buyingPower
    }
  );

  // TODO (multiply share * value for all stock) + buying power

  return 'Success';
}

async function grabOneStockUser(userId, symbol) {
  let user = await findUser(userId);
  let containsSym;
  user.stocks.forEach((curr) => {
    if (symbol === curr.symbol) containsSym = curr;
  });

  if (containsSym) return containsSym;
  else return null;
}

// helper function to find user
async function findUser(userId) {
  if (!userId) throw 'No user id given';

  console.log('at helper function findUser');

  const user = await Users.findOne({ id: userId });
  if (!user) throw 'User not found';

  // console.log(user);

  return user;
}

function calcValue(stocks) {
  let value = 0;
  stocks.forEach((stock) => {
    value += stock.shares * stock.value;
  });
  return value;
}
