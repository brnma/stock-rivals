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
  // get data from api
  const response = TSLAdata; //TODO: change to api call
  response.data.map((item) => {
    data.series.push({
      value: item.close, //TODO change to last for intraday data
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
    const oldArr = user.stocks.filter((curr) => curr.symbol === currentDay.symbol);
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
      buyingPower: user.cash - totalPrice,
      currValue: calcValue(user.stocks) + buyingPower
    }
  );

  return 'Success';
}

async function sellStocks(stockSellingData, userId) {
  if (!stockSellingData) throw 'No stock selling data given';
  // deconstructs incoming buying data and calcs totalPrice
  const { amtSharesSell, currentDay } = stockBuyingData;
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
  const oldArr = user.stocks.filter((curr) => curr.symbol === currentDay.symbol);

  let newStockArr = [...oldArr, updateStock];

  await Users.updateOne(
    { id: userId },
    {
      stocks: newStockArr,
      prevValue: user.currValue,
      buyingPower: totalPrice + stock.buyingPower,
      currValue: calcValue(user.stocks) + buyingPower
    }
  );

  // TODO (multiply share * value for all stock) + buying power

  return 'Success';
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
