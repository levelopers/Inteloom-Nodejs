var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mongoose = require('mongoose');
var MONGO_URL = require('./configs/mongo-config')
var cors = require('cors')

var indexRouter = require('./routes/index');

// connect mongodb
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useCreateIndex: true, },function(error){
  if(error) throw error
    console.log(`connect mongodb success`);
});

var app = express();
app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log(err);
  if(err){
   return res.status(err.status || 500).send({err});
  }
  return next()
});

module.exports = app;
