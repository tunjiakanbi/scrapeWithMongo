var router = require("express").Router();
//var noteController = require("../../controllers/note");
var fetchRoutes = require("./fetch");
//var noteRoutes = require("./notes");
//var headlineRoutes = require("./headlines");
//var clearRoutes = require("./clear");
var fetchController = require("../../controller/fetch");
var articleController = require("../../controller/article");


//============"./api/fetch.js"===================
router.get("/fetch", fetchController.scrapeArticles);
//===============================================



//============"./api/article.js"===================
router.get("/allarticles", articleController.findAll);
router.delete("/:id", articleController.delete);
router.put("/:id", articleController.update);
//===============================================



//============"./api/clear.js"===================
//router.get("/", clearController.clearDB);
//===============================================


//============"./api/note.js"===================
// router.get("/:id", noteController.find);
// router.post("/", noteController.create);
// router.delete("/:id", noteController.delete);
//===============================================



//============"./api/index.js"===================
//router.use("/fetch", fetchRoutes);
//router.use("/notes", noteRoutes);
//router.use("/headlines", articleRoutes);
//router.use("/clear", clearRoutes);


module.exports = router;