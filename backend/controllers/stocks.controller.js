const stockService = require('../services/stocks.service');
const axios = require('axios');

// // for trade screen
// router.get('/:symbol', stocksController.grabHistoricalData());

// // for home screen to display user stocks
// router.get('/getValues', stocksController.grabUserStocks());

// // for trade screen to purchase stocks
// router.post('/buy', stocksController.buyStocks());

// // for trade screen to sell stocks
// router.post('/sell', stocksController.sellStocks());

module.exports = { grabHistoricalData, grabUserStocks, buyStocks, sellStocks, grabHistoricalValue };

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
    const data = await stockService.grabUserStocks('62622b8a5e0a97f074405815'); //req.user.sub);
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

    console.log(req.user);

    // const symbol = 'AAPL';
    // const amtShares = 9;
    // const currentDay = await axios.get(
    //   `https://api.marketstack.com/v1/intraday/latest?access_key=${process.env.MARKETKEY}&symbols=${symbol}`
    // );
    // console.log(currentDay.data.data);
    // const stockBuyingData = {
    //   amtSharesBuy: amtShares,
    //   currentDay: {
    //     symbol: symbol,
    //     value: currentDay.data.data.close
    //   }
    // };
    const stockBuyingData = {
      amtSharesBuy: amtShares,
      currentDay: {
        symbol: symbol,
        value: value
      }
    };

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
    // const {amtShares, value, symbol} = req.body
    // const symbol = "AAPL"
    // const amtShares = 9
    // const currentDay = await axios.get(
    //   `https://api.marketstack.com/v1/intraday/latest?access_key=${process.env.MARKETKEY}&symbols=${symbol}`
    // );
    // console.log(currentDay.data.data);
    // const stockBuyingData = {
    //   amtSharesSell: amtShares,
    //   currentDay: {
    //     symbol: share,
    //     value: currentDay.data.data.close
    //   }
    // };
    const stockSellingData = {
      amtSharesSell: 9,
      currentDay: {
        symbol: 'TSLA',
        value: 10
      }
    };

    const success = await stockService.sellStocks(stockSellingData, '6262d53783aae28e839f4aef');
    res.json(success);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function grabHistoricalValue(req, res, next) {
  try {
    const data = await stockService.getHistoricalValue('6262d95b83aae28e839f4af4');
    res.json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}

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
