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
  // try {
  // } catch (error) {}
}

async function buyStocks(req, res, next) {}
async function sellStocks(req, res, next) {}
