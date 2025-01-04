const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./database");
const usersRoute = require("./routers/usersrouter");

const cors = require("cors");

const PORT = process.env.PORT || 3000; // Default port
const app = express();
dotenv.config();  

// Connect to Database
connectDB();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3001", "http://localhost:3002"],
    allowedHeaders: "Content-Type,Authorization",
    methods: "GET,PUT,POST,DELETE,OPTIONS,PATCH"
}));


app.use("/users", usersRoute);


app.listen(PORT, () => {
    console.log(`Server is listening to port no http://localhost:${PORT}`);
});