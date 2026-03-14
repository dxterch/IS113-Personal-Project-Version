const express = require("express");
const router = express.Router();
const playlistController = require("../controllers/playlist-controller");

// Route to show the "Create Playlist" form
router.get("/create/:uid", playlistController.showCreateForm);

// Route to process the creation (matches <form method="POST">)
router.post("/create", playlistController.handleCreate);

module.exports = router;