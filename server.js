var express = require("express");
var bodyParser = require("body-parser");
//var logger = require("morgan");
var mongoose = require("mongoose");
var routes = require("./routes");
// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();


var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");



// Configure middleware

// Use morgan logger for logging requests
// app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));
//have every request go through our route middleware
app.use(routes);

// Connect to the Mongo DB
// mongoose.connect("mongodb://localhost/week18Populater");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines" || "mongodb://testuser:P@$$w0rd@ds255282.mlab.com:55282/heroku_xww1skqd";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// Routes
//controller routes
// A GET route for scraping the echoJS website
app.get("/scrape", function(req, res) {
  // First, we grab the body of the html with request
  axios.get("http://www.echojs.com/").then(function(response) {
    //axios.get("https://www.cnn.com/").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    var newArticle = [];

    // Now, we grab every h2 within an article tag, and do the following:
    $("article h2").each(function(i, element) {
     // $("article h3").each(function(i, element) {
      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");
        newArticle.push(result);
      // Create a new Article using the `result` object built from scraping
      db.Article.create(result)
        .then(function(dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, send it to the client
          return res.json(err);
        });

        
    });

    // If we were able to successfully scrape and save an Article, send a message to the client
    //res.send("Scrape Complete");
    res.send(newArticle);
  });
});//end cheerio scrape route

// Route for getting all Articles from the db
app.get("/articles", function(req, res) {
  // TODO: Finish the route so it grabs all of the articles
  db.Article.find({})
  .then(function(dbArticle){
   res.render("index",dbArticle)
  })
  .catch(function(err) {
    // If an error occurs, send the error back to the client
    res.json(err);
  });
});

// Route for grabbing a specific Article by id, populate it with it's note
app.get("/articles/:id", function(req, res) {
db.Article.find({
   _id: mongojs.ObjectId(req.params.id)
  //":id": req.param.id
})
.populate("note")
.then(function(dbArticle){
  res.json(dbArticle)

 // .then(function(article){
   // res.json(article)
})
.catch(function(err) {
  // If an error occurs, send it back to the client
  res.json(err);
});
  // ====
  // Finish the route so it finds one article using the req.params.id,
  // and run the populate method with "note",
  // then responds with the article with the note included
});

// Route for saving/updating an Article's associated Note
app.post("/articles/:id", function(req, res) {
  // TODO
  // ====
  // save the new note that gets posted to the Notes collection
  // then find an article from the req.params.id
  // and update it's "note" property with the _id of the new note
  db.Note.create(req.body)
  .then(function(dbNote) {
    // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
    // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
    // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
    return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
  })
  .then(function(dbArticle) {
    // If we were able to successfully update an Article, send it back to the client
    res.json(dbArticle);
  })
  .catch(function(err) {
    // If an error occurred, send it to the client
    res.json(err);
  });
});
app.get("/" , function(req, res){
  db.Article.find({})
  .then(function(dbArticle){
    res.render("home", {articles: dbArticle})
  })
  .catch(function(err) {
    // If an error occurs, send the error back to the client
    res.json(err);
  });


//   //res.render("index");
})
// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
