// models/review.js
const fs = require("node:fs/promises");
const path = require("path");
const filePath = path.join(__dirname, "../data/review-data.json");

// Multi-schema retrieval: Fetches all reviews belonging to a specific user
exports.getByUser = async (uid) => {
    try {
        const rawData = await fs.readFile(filePath, "utf-8");
        const reviews = JSON.parse(rawData); // Parse JSON text into JS object [4, 5]
        
        // Filter reviews where UserID matches the logged-in UID
        return reviews.filter(r => r.UserID === uid); 
    } catch (err) {
        console.error("Review Model Error:", err);
        return []; // Return empty array to prevent dashboard crash
    }
};