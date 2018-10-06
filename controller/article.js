
const db = require("../models");

module.exports = {

    findAll: function(req, res) {
        db.Article
        .find(req.query)//.find({}) will do the same thing
        .sort({date: -1})
        .then(function(dbArticles){
            res.json(dbArticles);
        })
    },// end findAll()


    delete: function(req, res) {
       db.Article.remove({_id : req.params.id})
       .then(function(dbArticles){
        res.json(dbArticles);
       })
    },// end delete()


    update: function(req, res) {
        db.Article.findOneAndUpdate(
            {_id : req.params.id}, 
            {$set: req.body}, 
            {new: true})
       .then(function(dbArticles){
        res.json(dbArticles);
       })
    }// end update
       
};//end export statement