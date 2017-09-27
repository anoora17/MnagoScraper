// require mongoose
var mongoose = require('mongoose');


// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;
////localhost:27017/scraper
//mongodb://heroku_11n5hz78:heroku_11n5hz78@ds017185.mlab.com:17185/heroku_11n5hz78"
// Database configuration with mongoose
// process.env.MONGODB || 'mongodb://localhost:27017/scraper'
 var mydb = process.env.MONGODB || "mongodb://heroku_tgz542jr:heroku_tgz542jr@ds017185.mlab.com:17185/heroku_tgz542jr"
mongoose.connect(mydb);
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});


// export the database
module.exports = db;