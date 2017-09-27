var mongoose = require("mongoose");

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