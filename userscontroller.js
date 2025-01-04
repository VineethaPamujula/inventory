require("dotenv").config(); // Loads environment variables from the .env file
const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Get the JWT secret key from environment variables
const JWT_SECRET = process.env.SECRET_KEY;

// Controller to add a user
const createUser = async (req, res) => {
    try {
        const { username, password, firstname, lastname, type, phone, email } = req.body;

        // Check if all required fields are provided
        if (!username || !password || !firstname || !lastname || !phone || !email) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Check if the email or username already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: "Email or Username already exists." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            password: hashedPassword,
            firstname,
            lastname,
            type,
            phone,
            email
        });

        await newUser.save();
        res.status(201).json({ message: "User created successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error creating user.", error: error.message });
    }
};

// Controller for login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password." });
        }

        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password." });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { userid: user.userid, username: user.username, type: user.type },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "Login successful.",
            token,
            user: { username: user.username, type: user.type }
        });
    } catch (error) {
        res.status(500).json({ message: "Error during login.", error: error.message });
    }
};

module.exports = {
    createUser,
    login
};
