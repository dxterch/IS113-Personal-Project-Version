const Song = require("../models/song");

exports.showSearchPage = async (req, res) => {
    try {
        // Use req.query for GET searches [14-16]
        const { songSearch, uid } = req.query; 
        let songs = await Song.getAllSongs();

        // Search logic: filter results based on keyword [17-19]
        if (songSearch) {
            songs = songs.filter(s => 
                s.song_name.toLowerCase().includes(songSearch.toLowerCase())
            );
        }

        // Pass data to View; ensure search is never undefined to avoid EJS errors [12, 20]
        res.render("manage-songs", { 
            songs, 
            uid, 
            search: songSearch || "" 
        });
    } catch (err) {
        res.status(500).send("Error loading songs.");
    }
};