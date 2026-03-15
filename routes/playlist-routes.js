const express = require("express");
const router = express.Router();
const playlistController = require("../controllers/playlist-controller");

// Route to show the "Create and Manage Playlist" form
router.get("/create/:uid", playlistController.showCreateForm);
router.get("/manage/:pid", playlistController.showEditForm);

// Routes to process the creation, update and deletion
router.post("/create", playlistController.handleCreate);
router.post("/update", playlistController.handleUpdate);
router.post("/delete", playlistController.handleDelete);

module.exports = router;