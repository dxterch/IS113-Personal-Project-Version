const express = require("express");
const router = express.Router();
const songController = require("../controllers/song-controller");

// Route for searching songs [21]
router.get("/search", songController.showSearchPage);

module.exports = router;