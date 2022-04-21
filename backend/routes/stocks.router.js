let express = require('express');
var router = express.Router();
const stocksController = require('../controllers/stocks.controller');

// for trade screen
router.get('/:symbol', stocksController.grabHistoricalData);

// for home screen to display user stocks
router.get('/getValues', stocksController.grabUserStocks);

// for trade screen to purchase stocks
router.post('/buy', stocksController.buyStocks);

// for trade screen to sell stocks
router.post('/sell', stocksController.sellStocks);

module.exports = router;
