const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid"); // For generating unique user IDs

const userSchema = new mongoose.Schema({
    userid: { 
        type: String, 
        unique: true, 
        default: () => uuidv4() // Automatically generates a unique ID
    },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    type: { 
        type: String, 
        enum: ["staff", "admin", "manager"], // Allowed types
        
    },
    phone: { 
        type: String, 
        required: true, 
        match: /^[0-9]{10}$/ // Validates a 10-digit phone number
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/ 
    }
}, { timestamps: true });



const User = mongoose.model("User", userSchema);

module.exports = User;
