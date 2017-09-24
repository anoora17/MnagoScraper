var mongoose = require("mongoose");

var Schema = mongoose.Schema;
//
var scrapedNews = new Schema ({
	title:{
		type:String

	},
	link:{
		type:String
	},
	
	textbody:{
		type:Schema.Types.ObjectId,
		ref: "News"
	}
});
// Create the Article model with the scrapedNews
var Article = mongoose.model("Article", scrapedNews);

// Export the model
module.exports = Article;
