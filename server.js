require("dotenv").config();

// Code Dependencies - Including packages and libraries
const express = require("express");
const session = require("express-session");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/database");

// Connecting to Mongo database
mongoose.connect(config.database); // databse is stores in the config file

// On Connection - Checks for connection
mongoose.connection.on("connected", () => {
  console.log("Connected to database" + config.database);
});

// Error Connection - Outputs error message to console if no connection
mongoose.connection.on("error", (err) => {
  console.log("Database error:" + err);
});

// Initialize Express framework
const app = express();
// Routes for database - directs to functions for each data block
const users = require("./routes/users");
const products = require("./routes/products");

// variable - Can edit which portname or port to host the website locally
const server_port = process.env.PORT || 8080;
// const server_host = process.env.HOST_NAME || "localhost";
// Middleware
app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SECRET || "secret",
    resave: true,
    saveUninitialized: true,
    maxAge: 3600000, // 1 hour (in milliseconds)
  })
); // session secret
app.use(passport.initialize());
app.use(passport.session());

// Use '/users' for all our user route functions
app.use("/users", users);
app.use("/products", products);

// Set Static Folder
app.use(express.static(path.join(__dirname + "/angular-src/dist/angular-src")));

app.get("/*", (req, res) => {
  const fullPath = path.join(
    __dirname,
    "/angular-src/dist/angular-src/index.html"
  );
  console.log(" Fetching from.. " + fullPath);
  res.sendFile(fullPath);
});

// Start Server
app.listen(server_port, () => {
  // console.log(`Listening at http://${process.env.HOST_NAME}:${server_port}`);
  console.log("Server listening on port " + server_port);
});

// test
