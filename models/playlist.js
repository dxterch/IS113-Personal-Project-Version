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

exports.update = async (pid, updatedData) => {
    const data = await fs.readFile(filePath, "utf-8");
    let playlists = JSON.parse(data);
    const index = playlists.findIndex(p => p.PID === pid);
    if (index !== -1) {
        playlists[index] = { ...playlists[index], ...updatedData };
        await fs.writeFile(filePath, JSON.stringify(playlists, null, 2)); // Persist changes [2, 9]
    }
};

exports.deleteMany = async (pids) => {
    const data = await fs.readFile(filePath, "utf-8");
    let playlists = JSON.parse(data);
    // Filter out the records that match the provided IDs [20, 21]
    playlists = playlists.filter(p => !pids.includes(p.PID));
    await fs.writeFile(filePath, JSON.stringify(playlists, null, 2)); // Persistence [7, 22]
};

exports.getByPID = async (pid) => {
    const data = await fs.readFile(filePath, "utf-8");
    const playlists = JSON.parse(data);
    return playlists.find(p => p.PID === pid);
};