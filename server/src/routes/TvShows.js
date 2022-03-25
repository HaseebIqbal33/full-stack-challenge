const express = require("express");
const controller = require("../controllers/TvShows");
const router = express.Router();

router.get("/:search", controller.getShows);

module.exports = router;
