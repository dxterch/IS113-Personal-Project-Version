const fs = require("node:fs/promises");
const path = require("path");
const filePath = path.join(__dirname, "../data/song-data.json");

// Logic to retrieve all songs for the library [6, 7]
exports.getAllSongs = async () => {
    try {
        const rawData = await fs.readFile(filePath, "utf-8");
        return JSON.parse(rawData); // Converts JSON string to JS object [8-10]
    } catch (err) {
        console.error("Error reading song data:", err);
        return []; // Prevents crash if file is missing [11]
    }
};