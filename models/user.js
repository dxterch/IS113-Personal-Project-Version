const fs = require("node:fs/promises");
const path = require("path");
const filePath = path.join(__dirname, "../data/auth-data.json");

exports.findUser = async (username) => {
    const data = await fs.readFile(filePath, "utf-8");
    const users = JSON.parse(data); // Parse JSON text into JS object
    return users.find(u => u.Username === username);
};

exports.findUserByUID = async (uid) => {
    const data = await fs.readFile(filePath, "utf-8");
    const users = JSON.parse(data);
    // Find the user whose UID matches the one from the URL
    return users.find(u => u.UID === uid); 
};

exports.addUser = async (userData) => {
    const data = await fs.readFile(filePath, "utf-8");
    const users = JSON.parse(data);
    
    // Assign a UID (e.g., U001) and push to array
    userData.UID = "U" + (users.length + 1).toString().padStart(3, '0');
    users.push(userData);

    // Save back to file using stringify
    await fs.writeFile(filePath, JSON.stringify(users, null, 2));
};