const fs = require("node:fs/promises");
const filePath = "./data/playlist-data.json";

exports.getByUser = async (uid) => {
    const data = await fs.readFile(filePath, "utf-8");
    const playlists = JSON.parse(data);
    return playlists.filter(p => p.OwnerID === uid); // Multi-schema filter
};

exports.create = async (newPlaylist) => {
    const data = await fs.readFile(filePath, "utf-8");
    const playlists = JSON.parse(data);
    newPlaylist.PID = "P" + (playlists.length + 1).toString().padStart(3, '0');
    newPlaylist.DateCreated = new Date().toISOString().split('T');
    playlists.push(newPlaylist);
    await fs.writeFile(filePath, JSON.stringify(playlists, null, 2));
};