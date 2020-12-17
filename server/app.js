var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


//router file import
var productsRouter = require('./routes/products');
//logger file import
const errLogger = require('./public/javascripts/errorLogger');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routing all requests with 'products' to products routing file
app.use('/products', productsRouter);

//logging errors into logger file
app.use(errLogger);
app.listen(3000, console.log('Server started at port 3000'))

module.exports = app;