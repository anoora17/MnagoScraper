var mongoose = require("mongoose");
// require the connection
var db = require("../config/connection");
var Schema = mongoose.Schema;

var newsSchema = new Schema({
	title: {
	    type: String
	  },
	  // Just a string
	  link: {
	    type: String
	  }
	});

// Create the News model with the scrapedNews
var News = mongoose.model("News", newsSchema);

module.exports = News;