const router = require("express").Router();
const db = require("../../models");


//route to the home page
router.get("/", function(req, res){
        db.Article.find({saved: false})
        .sort({date: -1})//-1 does reverse chronology
        .then(function(dbArticles){
            res.render("home", {articles: dbArticles})
        })
    }   
);


//route to the saved page
    router.get("/saved", function(req, res){
            db.Article.find({saved: true})
            .sort({date: -1})//-1 does reverse chronology
            .then(function(dbArticles){
                res.render("saved", {articles: dbArticles})
            })
        }   
    );


module.exports = router;