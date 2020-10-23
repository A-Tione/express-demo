const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/xxx', (req, res, next)=> {
  res.set('Content-Type', 'text/html;charset=utf-8');
  console.log(1);
  res.write('这是创建的xxx信息');
  next();
})
app.use((req, res, next)=> {
  console.log(2);
  res.end();
})

// catch 404 and forward to error handler
app.use(function(request, response, next) {
  console.log(3);
  next(createError(404));
});

// error handler
app.use(function(error, request, response, next) {
  // set locals, only providing error in development
  response.locals.message = error.message;
  response.locals.error = request.app.get('env') === 'development' ? error : {};

  // render the error page
  response.status(error.status || 500);
  response.render('error');
});

module.exports = app;
