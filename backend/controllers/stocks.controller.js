const stockService = require('../services/stocks.service');

// // for trade screen
// router.get('/:symbol', stocksController.grabHistoricalData());

// // for home screen to display user stocks
// router.get('/getValues', stocksController.grabUserStocks());

// // for trade screen to purchase stocks
// router.post('/buy', stocksController.buyStocks());

// // for trade screen to sell stocks
// router.post('/sell', stocksController.sellStocks());

module.exports = { grabHistoricalData, grabUserStocks, buyStocks, sellStocks };

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
    const data = await stockService.grabUserStocks(req.user.sub);
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
    // const {amtShares, value, symbol} = req.body
    // const currentDay = Do api call here to get current stock symbol data

    const stockBuyingData = {
      amtSharesBuy: 10,
      currentDay: {
        symbol: 'TSLA',
        value: 20
      }
    };

    const success = await stockService.buyStocks(stockBuyingData, '62617d94733c8729ae590ab0');
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
    // const currentDay = await fetch(
    //   `https://api.marketstack.com/v1/intraday?access_key=${process.env.MARKETKEY}&symbols=${symbol}`
    // );
    const stockSellingData = {
      amtSharesSell: 9,
      currentDay: {
        symbol: 'TSLA',
        value: 10
      }
    };

    const success = await stockService.sellStocks(stockSellingData, req.user.sub);
    res.json(success);
  } catch (error) {
    res.status(400).json(error);
  }
}

// db.users.insert(
//   {
//     username: "dark7storm",
//     profileImage: "dark7storm.jpeg",
//     hash: "weeee",
//     email: "mail@mail.com",
//     stocks: [],
//     prevValue: 1000,
//     buyingPower: 1000,
//     currValue: 1000
//   }
// )
