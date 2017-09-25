var express = require('express');
var router = express.Router();
// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");
var Article = require("../models/articals.js");
var News    = require("../models/news.js")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('dashboard', { title: 'Scrapper' });
});

// A GET request to scrape the NPR website
router.get("/scrape",(req, res) => {
  // First, we grab the body of the html with request
  request("http://www.npr.org", function(error, response, body) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    let $ = cheerio.load(body);

    if(!error && response.statusCode == 200){
    // Now, we grab every h2 within an article tag, and do the following:

    $('article').each(function(i, element) {
    	
    //   // Save an empty result object
       var result = {}
   
     // Add the text and href of every link, and save them as properties of the result object
     result.title = $(this).children("a").text();
      result.link = $(this).children("a").attr("href");
      //result.textbody = $(this).children(p["teaser"]).text();
      
     
      // Using our Article model, create a new entry
      // This effectively passes the result object to the entry (and the title and link)
      var entry = new Article(result);

      // Now, save that entry to the db
      entry.save(function(err, doc) {
        // Log any errors
        if (err) {
          console.log(err);
        }
        // Or log the doc
        else {
         console.log(doc)
        }
      });

    });
     }
  });
  // Tell the browser that we finished scraping the text
  res.render('dashboard', {title:"scraping completed"})
});

// This will get the articles we scraped from the mongoDB
router.get("/articles", function(req, res) {
  // Grab every doc in the Articles array
  Article.find({}, function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Or send the doc to the browser as a json object
    else {
    	console.log(doc)
      var articlesDocs = [];
     

      articlesDocs = doc.slice(0, 20);

      
          // for end
      console.log('=========================')
      console.log(articlesDocs);
      console.log('=========================')

      articlesDocs = articlesDocs.filter(function(article) {
        var articleIsGood = false;

        if (article.title.length > 1 && article.link.length > 1) {
          articleIsGood = true;
        }

        return articleIsGood;

      });

      console.log('=========================')
      console.log(articlesDocs);
      console.log('=========================')


      res.render('dashboard',{articles: articlesDocs})
    }
  });
});
router.get("/save/:id", function(req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  console.log("*************"+req+ "*************************")
  Article.findOne({ "_id": req.params.id })
  // ..and populate all of the notes associated with it
  .populate("news")
  // now, execute our query
  .exec(function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Otherwise, send the doc to the browser as a json object
    else {
      console.log(doc)
    }
  });
});

router.post("/saved", function(req, res){

var newNews = new News(req.body);
newNews.save(function(err, data){

  if(err) { 
    console.log(err)
  }
    else { }
})


res.render('saved')


})

module.exports = router;
