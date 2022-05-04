const stockService = require('../services/stocks.service');
const axios = require('axios');
const db = require('../_helpers/db');
const User = db.Users;
const HistoryValue = db.HistoryValue;

// // for trade screen
// router.get('/:symbol', stocksController.grabHistoricalData());

// // for home screen to display user stocks
// router.get('/getValues', stocksController.grabUserStocks());

// // for trade screen to purchase stocks
// router.post('/buy', stocksController.buyStocks());

// // for trade screen to sell stocks
// router.post('/sell', stocksController.sellStocks());

module.exports = { grabHistoricalData, grabUserStocks, buyStocks, sellStocks, grabHistoricalValue, grabLatestUser };

async function grabHistoricalData(req, res, next) {
  try {
    const data = await stockService.grabHistoricalData(req.params.symbol);
    res.json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function grabUserStocks(req, res, next) {
  try {
    const data = await stockService.grabUserStocks(req.user.sub); //req.user.sub);
    res.json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function buyStocks(req, res, next) {
  try {
    // TODO determine stockBuyingData model for selling it
    // const stockBuyingData = req.body
    // TODO amountShares and value and symbol
    const { amtShares, value, symbol } = req.body;
    // console.log(req.body);

    // console.log(req.user);

    // const symbol = 'AAPL';
    // const amtShares = 9;
    const currentDay = await axios.get(
      `https://api.marketstack.com/v1/intraday/latest?access_key=${process.env.MARKETKEY}&symbols=${symbol}&interval=1min`
    );
    console.log(currentDay.data.data);
    const stockBuyingData = {
      amtSharesBuy: amtShares,
      currentDay: {
        symbol: symbol,
        value: currentDay.data.data[0].last === null ? currentDay.data.data[0].open : currentDay.data.data[0].last
      }
    };
    console.log(stockBuyingData);
    // const stockBuyingData = {
    //   amtSharesBuy: amtShares,
    //   currentDay: {
    //     symbol: symbol,
    //     value: value
    //   }
    // };

    const success = await stockService.buyStocks(stockBuyingData, req.user.sub);
    res.json(success);
  } catch (error) {
    res.status(400).json(error);
  }
}
async function sellStocks(req, res, next) {
  try {
    // TODO determine stockSellingData model for selling it
    // const stockSellingData = req.body
    // TODO amountShares and value and symbol
    const { amtShares, value, symbol } = req.body;
    // const symbol = "AAPL"
    // const amtShares = 9
    const currentDay = await axios.get(
      `https://api.marketstack.com/v1/intraday/latest?access_key=${process.env.MARKETKEY}&symbols=${symbol}&interval=1min`
    );
    console.log(currentDay.data.data);
    const stockSellingData = {
      amtSharesSell: amtShares,
      currentDay: {
        symbol: symbol,
        value: currentDay.data.data[0].last === null ? currentDay.data.data[0].open : currentDay.data.data[0].last
      }
    };
    // const stockSellingData = {
    //   amtSharesSell: amtShares,
    //   currentDay: {
    //     symbol: symbol,
    //     value: value
    //   }
    // };

    const success = await stockService.sellStocks(stockSellingData, req.user.sub);
    res.json(success);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function grabHistoricalValue(req, res, next) {
  try {
    const data = await stockService.getHistoricalValue(req.user.sub);
    res.json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function grabLatestUser(req, res, next) {
  try {
    const user = await stockService.findUser(req.user.sub);
    // console.log(user);
    res.json(user);
  } catch (error) {
    res.status(400).json(error);
  }
}

// fgenerate fake historical data
// const user = await User.findOne({ _id: req.user.sub });
// for (let i = 0; i < 365; i++) {
//   let date_to = new Date();
//   //date to is a year ago
//   date_to.setDate(date_to.getDate() - i);
//   // change date to a string in YYYY-MM-DD format
//   date_to = date_to.toISOString().slice(0, 10);
//   // randomed.push({
//   //   user: { $oid: '6271ed2d5cc075aed4f696a4' },
//   //   value: Math.random() * 10000,
//   //   date: {
//   //     $date: new Date(date_to)
//   //   }
//   // });
//   const temp = await HistoryValue.create({
//     user: user,
//     value: Math.random() * 10000,
//     date: new Date(date_to)
//   });
//   await temp.save();
// }

// db.users.insert({
//   username: 'dark7storm',
//   profileImage: 'dark7storm.jpeg',
//   hash: 'weeee',
//   email: 'mail@mail.com',
//   stocks: [
//     {
//       symbol: 'TSLA',
//       shares: 10,
//       value: 20
//     },
//     {
//       symbol: 'AAPL',
//       shares: 1,
//       value: 100
//     }
//   ],
//   prevValue: 1000,
//   buyingPower: 1000,
//   currValue: 1000
// });

// db.historyvalues.insertMany([
//   {
//     user: ObjectId('6271ed2d5cc075aed4f696a4'),
//     value: 992,
//     date: new Date('2022-04-26T00:01:00.464Z')
//   },
//   {
//     user: ObjectId('6271ed2d5cc075aed4f696a4'),
//     value: 992,
//     date: new Date('2022-04-25T00:01:00.464Z')
//   },
//   {
//     user: ObjectId('6271ed2d5cc075aed4f696a4'),
//     value: 992,
//     date: new Date('2022-04-26T00:01:00.464Z')
//   }
// ]);
