const router = require("express").Router();
const fetchController = require("../../controller/fetch");

router.get("/", fetchController.scrapeArticles)

module.export = router;