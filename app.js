var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs      = require('express-handlebars');
var path        = require('path');
var index = require('./app/routes/main');
//var users = require('./routes/users');
var logger = require("morgan");
var mongoose = require("mongoose");
var app = express();

// view engine setup


app.set('views', 'views')
app.engine('hbs', exphbs({extname: '.hbs', defaultLayout: 'main'}));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// Static directory
app.use(express.static('./public'));
app.use('/', index);
//app.use('/users', users);



// Database configuration with mongoose
mongoose.connect("mongodb://localhost:27017/scraper");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

 // Global variable for flash

    app.use(function(req, res, next){
                
        res.locals.index    =req.main || null ; // to render handlebars articles
        next()
    });









// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});





module.exports = app;
