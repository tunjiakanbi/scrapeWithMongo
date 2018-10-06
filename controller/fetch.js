const scrape = require("../script/scrape");
const db = require("../models");

module.exports = {
    scrapeArticles: function(req, res) {
        //scrape our articles
         //console.log("Running scrape():",scrape());
     scrape()
        .then(function(result){
            console.log("Inside scrape Controller========:",result[0]);
            return db.Article.create(result);   
        })
        .then(function(result){
            if(result.length === 0){
                res.json({
                    message: "Nothing to Scrape"
                });
            }
            else {
                res.json({
                    message: "Scrapped this many articles" + result.length
                });
            }
        })
        .catch(function(err){
            res.json({
                message: "Scrape Complete"
            });
        })
    }
};//end export statement