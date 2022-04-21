require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

const usersRouter = require('./routes/user.router');
const stocksRouter = require('./routes/stocks.router');

const jwt = require('./_helpers/jwt');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
app.use(express.static(path.join(__dirname, 'public')));

// for public profile images
app.use('/img', express.static(path.join(__dirname, 'public/imgs')));

app.use(jwt());

app.use('/user', usersRouter);

//stocks route
app.use('/stock', stocksRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
  res.render('error');
});

const port = process.env.NODE_ENV === 'production' ? process.env.PORT || 80 : 3000;
app.listen(port, function () {
  console.log('Server listening on port ' + port);
});

module.exports = app;
