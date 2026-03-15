const User = require("../models/user");
const Playlist = require("../models/playlist");
const Review = require("../models/review");

exports.showLoginPage = (req, res) => res.render("login", { error: null });

exports.handleLogin = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findUser(username);

    // Logic: Check if in database and if password matches [3]
    if (user && user.Password === password) {
        res.redirect("/auth/home/" + user.UID); 
    } else {
        // Form feedback: "incorrect password" or "Username not valid" [6]
        res.render("login", { error: "Invalid username or password" });
    }
};

// Function to handle logout and redirect to the public welcome page
exports.handleLogout = (req, res) => {
    res.redirect("/index.html"); 
};

exports.showRegisterPage = (req, res) => res.render("registration", { error: null });

exports.handleRegister = async (req, res) => {
    const { username, password, confirmPassword, dob, email } = req.body;

    // 1. Basic Validation
    if (password !== confirmPassword) {
        return res.render("registration", { error: "Passwords do not match" });
    }

    // 2. Generate today's date in YYYY-MM-DD format for the new user
    const today = new Date().toISOString().split('T')[0];

    // 3. Map the lowercase form data to the PascalCase database schema
    const newUser = { 
        Username: username, 
        Password: password, 
        Email: email,
        DOB: dob,
        DateJoined: today,
        LastOpened: today
    }; 

    // 4. Save the user and redirect to login
    await User.addUser(newUser);
    res.redirect("/auth/login");
};

exports.showDashboard = async (req, res) => {
    try {
        const { uid } = req.params; // Extract User ID from URL [7, 8]

        // Multi-schema retrieval from three separate JSON data sources [1, 6]
        const user = await User.findUserByUID(uid); 
        const playlists = await Playlist.getByUser(uid);
        const reviews = await Review.getByUser(uid);

        if (!user) return res.status(404).send("User not valid");

        // Layout requirement: Most recently created/updated items appear first [4]
        const recentPlaylists = playlists.reverse();
        const recentReviews = reviews.reverse();

        // Delegate to View: Pass data to home-page.ejs [9, 10]
        res.render("home-page", { 
            uid,
            username: user.Username, 
            playlists: recentPlaylists, 
            reviews: recentReviews 
        });
    } catch (err) {
        res.status(500).send("Error loading dashboard data.");
    }
};

