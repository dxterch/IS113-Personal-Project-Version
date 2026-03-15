const Playlist = require("../models/playlist");
const Song = require("../models/song");

exports.showCreateForm = async (req, res) => {
    try {
        const { uid } = req.params; // Maintain user context [1]
        const songs = await Song.getAllSongs(); // Fetch all songs for selection [5]

        // Render the new "create-manage" view instead of "playlist-create"
        res.render("create-manage-playlist", { 
            uid, 
            songs, 
            playlist: null,       // 'null' indicates "New Playlist" mode [2]
            playlistName: "", 
            error: null 
        });
    } catch (err) {
        res.status(500).send("Error loading the playlist creator.");
    }
};

// GET: Show the management/edit form
exports.showEditForm = async (req, res) => {
    const { pid } = req.params;
    const { uid } = req.query; 
    const playlist = await Playlist.getByPID(pid); // Requirement: find specific record [4]
    const songs = await Song.getAllSongs();

    res.render("create-manage-playlist", {
        uid,
        playlist,
        playlistName: playlist.PName,
        songs,
        error: null
    });
};

// Logic to handle creating playlist (CRUD: Create)
exports.handleCreate = async (req, res) => {
    const { uid, playlistName, description, songs } = req.body;

    // Validation feedback requirement [1, 4]
    if (!playlistName) {
        const songLibrary = await Song.getAllSongs();
        return res.render("create-manage-playlist", { 
            uid, 
            songs: songLibrary, 
            playlist: null,
            playlistName: "",
            error: "Playlist name is required." 
        });
    }

    // Save with the 6-field schema: PID, PName, OwnerID, DateCreated, Description, Songs [6]
    await Playlist.create({
        PName: playlistName,
        OwnerID: uid,
        Description: description,
        Songs: Array.isArray(songs) ? songs : (songs ? [songs] : []) // Ensure array format [7]
    });

    res.redirect(`/auth/home/${uid}`); // Redirect to updated dashboard [1, 6]
};

// POST: Handle the update (CRUD: Update)
exports.handleUpdate = async (req, res) => {
    const { pid, uid, playlistName, description, songs } = req.body;
    
    await Playlist.update(pid, {
        PName: playlistName,
        Description: description,
        Songs: Array.isArray(songs) ? songs : (songs ? [songs] : [])
    });

    res.redirect(`/auth/home/${uid}`);
};

// POST: Handle deletion (CRUD: Delete)
exports.handleDelete = async (req, res) => {
    const { uid, selectedPlaylists } = req.body;
    const idsToDelete = Array.isArray(selectedPlaylists) ? selectedPlaylists : [selectedPlaylists];
    
    if (selectedPlaylists) {
        await Playlist.deleteMany(idsToDelete); // Delegate to model [3, 5]
    }
    res.redirect(`/auth/home/${uid}`); 
};