const jwt = require("jsonwebtoken");

// Secret key for JWT (use your own secret key or store it in .env)
const JWT_SECRET = process.env.JWT_SECRET || "your_default_secret_key"; 

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    // Check if the Authorization header is present
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        return res.status(403).json({ message: "No token provided. Access denied." });
    }

    // Verify the token
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid or expired token." });
        }

        // If the token is valid, store the decoded info in the request object
        req.user = decoded; // This could contain `userid`, `username`, `type`, etc.
        next(); // Continue to the next middleware or route handler
    });
};

module.exports = { verifyToken };
