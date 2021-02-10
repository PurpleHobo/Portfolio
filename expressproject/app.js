//Main Script for Portfolio
////Created by Chase Trybula

/////Constants
//Modules
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');

//Routes
const indexRouter = require('./routes/index');
const educationRouter = require('./routes/education');
const aboutRouter = require('./routes/about');
const contactRouter = require('./routes/contact');

//Express Object
const app = express();

/////vars

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger(function(tokens, req, res){
    return[ //to desplay only url, status and responce time
        tokens.url(req, res),
        tokens.status(req, res),
        tokens['response-time'](req, res), 'ms'
    ]
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/education', educationRouter);
app.use('/contact', contactRouter);

/////Error handling
//404
app.use(function(req, res, next) {
  next(createError(404));
});

//Sends Error Page
app.use(function(err, req, res, next) {

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000)
module.exports = app;
