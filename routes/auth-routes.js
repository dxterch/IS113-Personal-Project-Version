const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");

// Navigation to pages
router.get("/login", authController.showLoginPage);
router.get("/register", authController.showRegisterPage);

// Processing form submissions
router.post("/login", authController.handleLogin);
router.post("/register", authController.handleRegister);

// Context via UID
router.get("/home/:uid", authController.showDashboard); 

module.exports = router;