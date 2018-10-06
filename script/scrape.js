// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

function scrape() {
  
    
    return axios.get("http://www.echojs.com/").then(function(response) {
      //axios.get("https://www.cnn.com/").then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);
    
      var result = {};
      var newArticle = [];
    
      // Now, we grab every h2 within an article tag, and do the following:
      $("article h2").each(function(i, element) {
       // $("article h3").each(function(i, element) {
        // Save an empty result object
    
        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(this)
          .children("a")
          .text();
        result.link = $(this)
          .children("a")
          .attr("href");
          newArticle.push(result);
        })
        //console.log("Result inside scrape",newArticle);
        
        return newArticle;
    })
}

//scrape()
// // A GET route for scraping the echoJS website
// app.get("/scrape", function(req, res) {
//   // First, we grab the body of the html with request
//   axios.get("http://www.echojs.com/").then(function(response) {
//     //axios.get("https://www.cnn.com/").then(function(response) {
//     // Then, we load that into cheerio and save it to $ for a shorthand selector
//     var $ = cheerio.load(response.data);

//     var newArticle = [];

//     // Now, we grab every h2 within an article tag, and do the following:
//     $("article h2").each(function(i, element) {
//      // $("article h3").each(function(i, element) {
//       // Save an empty result object
//       var result = {};

//       // Add the text and href of every link, and save them as properties of the result object
//       result.title = $(this)
//         .children("a")
//         .text();
//       result.link = $(this)
//         .children("a")
//         .attr("href");
//         newArticle.push(result);
//       // Create a new Article using the `result` object built from scraping
//       db.Article.create(result)
//         .then(function(dbArticle) {
//           // View the added result in the console
//           console.log(dbArticle);
//         })
//         .catch(function(err) {
//           // If an error occurred, send it to the client
//           return res.json(err);
//         });        
//     });

//     // If we were able to successfully scrape and save an Article, send a message to the client
//     //res.send("Scrape Complete");
//     res.send(newArticle);
//   });
// });//end cheerio scrape route
module.exports = scrape;