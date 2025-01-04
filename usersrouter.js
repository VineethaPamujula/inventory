const express = require("express");
const { createUser, login } = require("../controllers/userscontroller");
const { verifyToken } = require("../validators/validate"); // Assuming you have a JWT verification middleware
const router = express.Router();

// Route to create a new user
router.post("/create", createUser);

// Route for user login
router.post("/login", login);

// Route to verify token (protected route)
router.get("/verifyToken", verifyToken, (req, res) => {
    res.status(200).json({ success: true, message: "Token is valid" });
});

module.exports = router;
