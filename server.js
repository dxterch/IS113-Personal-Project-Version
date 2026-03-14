// 1. Import necessary modules 
const express = require("express");
const path = require("path");
const server = express();

// 2. Configure the View Engine (EJS) 
// Setting the engine to EJS allows the use of res.render() for dynamic pages
server.set("view engine", "ejs");
// Explicitly setting the views directory for better organization 
server.set("views", path.join(__dirname, "views"));

// 3. Set Up Middleware 
// Essential for parsing URL-encoded form data submitted via POST requests
server.use(express.urlencoded({ extended: true }));

// 4. Mandatory Static Entry Point 
// Serves static files (CSS, images, etc.) and ensures index.html is the first page accessible
server.use("/", express.static(path.join(__dirname, "public")));

// 5. Import and Mount Modular Routes 
// Routing is delegated to separate files to maintain a "thin" server structure
const authRoutes = require("./routes/auth-routes");
const playlistRoutes = require("./routes/playlist-routes");
const songRoutes = require("./routes/song-routes");
// Mounting all authentication and dashboard routes under the /auth prefix
server.use("/auth", authRoutes);
server.use("/playlists", playlistRoutes);
server.use("/songs", songRoutes);

/* 
   Note: As your project grows, you will mount other routes here:
   const songRoutes = require("./routes/song-routes");
   server.use("/songs", songRoutes); 
*/

// 6. Start the Server
const hostname = "localhost";
const port = 8000; 

server.listen(port, hostname, () => {
    console.log(`Mini Spotify Server is running at http://${hostname}:${port}/index.html`);
    console.log("Press CTRL + C to stop the server manually.");
});