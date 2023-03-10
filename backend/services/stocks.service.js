const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const Stocks = db.Stocks;
const Users = db.Users;
const HistoryValue = db.HistoryValue;
const TSLAdata = require('../models/TSLA');
const { default: axios } = require('axios');
const cron = require('node-cron');
const historyValueModel = require('../models/historyValue.model');

module.exports = {
  grabHistoricalData,
  grabUserStocks,
  buyStocks,
  sellStocks,
  grabOneStockUser,
  getHistoricalValue,
  findUser
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
  const api_url = `https://api.marketstack.com/v1/intraday?access_key=${
    process.env.MARKETKEY
  }&symbols=${symbol}&date_from=${date_from}&date_to=${date_to}&limit=${365}`;
  console.log(api_url);
  let response = await axios.get(api_url);
  console.log(response.data.data);
  // console.log(response.data);
  // response.data.data.forEach((item) => {
  // const response = TSLAdata; //!sandbox

  // fixed bug here; reverse() returns void

  // console.log(response.data.data.reverse());

  response.data = response.data.data.reverse();

  // console.log(response.data);

  response.data.forEach((item) => {
    console.log(item);
    data.series.push({
      value: item.last === null ? item.open : item.last,
      name: item.date.split('T')[0]
    });
  });

  return [data];
}

// get latest data for each stock in user's portfolio
async function grabUserStocks(userId) {
  let user = await findUser(userId);
  // let response = {
  //   data: {
  //     data: [
  //       {
  //         open: 169.11,
  //         last: 1,
  //         close: 167.23
  //       }
  //     ]
  //   }
  // };
  // TODO fix here for 0 value stocks
  // create new array of user's updated stocks
  const newStocks = [];
  for (const stock of user.stocks) {
    //* api call with the current symbol
    const api_url = `https://api.marketstack.com/v1/intraday/latest?access_key=${process.env.MARKETKEY}&symbols=${stock.symbol}`;
    const response = await axios.get(api_url);
    //* if stock market is closed then set newvalue to open price of stock
    const newValue = response.data.data[0].last === null ? response.data.data[0].open : response.data.data[0].last;
    newStocks.push({ ...stock, value: newValue });
  }
  // console.log(newStocks);
  await user.updateOne({ stocks: newStocks });
  await user.updateOne({ prevValue: user.currValue });
  await user.updateOne({ currValue: calcValue(newStocks) });
  return await findUser(userId);
}

async function buyStocks(stockBuyingData, userId) {
  if (!stockBuyingData) throw 'No stock data given';
  console.log('here');

  // deconstructs incoming buying data and calcs totalPrice
  const { amtSharesBuy, currentDay } = stockBuyingData;
  // console.log(stockBuyingData);
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
    // console.log(currentDay.value);
    const oldArr = user.stocks.filter((curr) => curr.symbol !== currentDay.symbol);
    newStockArr = [...oldArr, updateStock];
    // console.log(newStockArr);
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
    { _id: userId },
    {
      stocks: newStockArr,
      prevValue: user.currValue,
      buyingPower: (user.buyingPower - totalPrice).toFixed(2),
      currValue: (calcValue(newStockArr) + user.buyingPower).toFixed(2)
    }
  );

  return 'Success';
}

async function sellStocks(stockSellingData, userId) {
  if (!stockSellingData) throw 'No stock selling data given';
  // deconstructs incoming buying data and calcs totalPrice
  const { amtSharesSell, currentDay } = stockSellingData;
  // console.log(stockSellingData);
  const totalPrice = amtSharesSell * currentDay.value;

  const user = await findUser(userId);

  // TODO logic before and after selling stocks
  // checks to see if user already has the stock or not
  const stock = user.stocks.find((curr) => curr.symbol === currentDay.symbol);
  if (!stock) throw 'Stock not found on user';
  if (stock.shares < amtSharesSell) throw 'User does not have enough shares';
  // updates existing stock
  const updateStock = {
    ...stock,
    shares: stock.shares - amtSharesSell,
    value: currentDay.value
  };
  const oldArr = user.stocks.filter((curr) => curr.symbol !== currentDay.symbol);

  let newStockArr = [...oldArr, updateStock];

  // console.log(newStockArr);

  await Users.updateOne(
    { _id: userId },
    {
      stocks: newStockArr,
      prevValue: user.currValue,
      buyingPower: (totalPrice + user.buyingPower).toFixed(2),
      currValue: (calcValue(newStockArr) + user.buyingPower).toFixed(2)
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

  const user = await Users.findOne({ _id: userId }).select('-hash');
  if (!user) throw 'User not found';

  return user;
}

function calcValue(stocks) {
  let value = 0;
  stocks.forEach((stock) => {
    console.log(stocks);
    value += stock.shares * stock.value;
  });
  return value;
}

// schedules the server to update historical value every day for each user
function updateHistoryValue() {
  let checked = {};
  Users.find({}).then((users) => {
    const currDate = new Date().toISOString().split('T')[0];
    Promise.all(
      users.map(async (user) => {
        // console.log(`${user.username} is updated`);

        let total = 0;
        for (const stock of user.stocks) {
          if (!checked[stock.symbol]) {
            const api_url = `https://api.marketstack.com/v1/intraday/latest?access_key=${process.env.MARKETKEY}&symbols=${stock.symbol}`;
            const response = await axios.get(api_url);
            const newValue = response.data.data[0].last;
            // const newValue = 20;
            checked[stock.symbol] = newValue;
            total += newValue;
          } else {
            total += checked[stock.symbol];
          }
        }

        if (await HistoryValue.findOne({ user: user.id, date: currDate })) {
          await HistoryValue.findOneAndUpdate(
            { user: user.id, date: currDate },
            {
              value: total
            }
          );
        } else {
          const history = new HistoryValue({
            user: user.id,
            value: total,
            date: currDate
          });

          await history.save();
        }
        // might need to change
        await user.update({ prevValue: user.currValue, currValue: history[0].value });
      })
    );
  });
}

// for production; updates every 4pm our time
// cron.schedule('* * 16 * *', updateHistoryValue);

// to test every minute
// cron.schedule('* * * * *', updateHistoryValue);

// BUGGY AHHHHHHH
async function getHistoricalValue(userId) {
  const user = await findUser(userId);
  // console.log(user);
  let total = 0;
  const currDate = new Date().toISOString().split('T')[0];
  // console.log(currDate);

  for (const stock of user.stocks) {
    const api_url = `https://api.marketstack.com/v1/intraday/latest?access_key=${process.env.MARKETKEY}&symbols=${stock.symbol}`;
    const response = await axios.get(api_url);
    const newValue = response.data.data[0].last * stock.shares;
    // const newValue = 20 * stock.shares;
    total += newValue;
  }

  if (await HistoryValue.findOne({ user: user.id, date: currDate })) {
    await HistoryValue.findOneAndUpdate(
      { user: user.id, date: currDate },
      {
        value: total
      }
    );
  } else {
    const history = new HistoryValue({
      user: user.id,
      value: total,
      date: currDate
    });

    await history.save();
  }

  const history = await HistoryValue.find({ user: user.id });

  // might need to change
  console.log('before');
  console.log(user);
  await user.update({ prevValue: user.currValue, currValue: history[0].value });
  return [
    {
      name: 'Your performance!',
      series: history
        .map((curr) => ({
          value: curr.value,
          name: curr.date
        }))
        .reverse()
    }
  ];
}
