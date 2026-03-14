exports.showCreateForm = (req, res) => {
    const { uid } = req.params; // Extract UID to keep user context without sessions [5]
    res.render("playlist-create", { uid, error: null });
};

// Logic to handle form submission (CRUD: Create)
exports.handleCreate = async (req, res) => {
    const { uid, playlistName, description } = req.body;
    
    // Form validation feedback requirement [6, 7]
    if (!playlistName) {
        return res.render("playlist-create", { uid, error: "Playlist name is required." });
    }

    await Playlist.create({ 
        PName: playlistName, 
        OwnerID: uid, 
        Description: description 
    });

    // Redirect back to homepage with the UID to see the updated list [8]
    res.redirect(`/auth/home/${uid}`);
};