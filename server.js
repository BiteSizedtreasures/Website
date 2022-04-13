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
const app = express();


// Routes for database - directs to functions for each data block
const users = require("./routes/users");
const products = require("./routes/products");


// variable - Can edit which portname or port to host the website locally
const server_port = process.env.PORT || 8080;

// Connecting to Mongo database
mongoose.connect(config.database) // database is stores in the config file
  .then(() => { // On Connection - Checks for connection
    console.log("Connected to database: " + config.database);
  })
  .catch(() => { // Error Connection - Outputs error message to console if no connection
    console.log("Failed to connect to database: " + config.database);
  })

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
if(server_port == 8080) {
  app.use(express.static(path.join(__dirname + "/public/")));
  app.get("/*", (req, res) => {
    const fullPath = path.join(__dirname, "/public/index.html");
    console.log(" Fetching from.. " + fullPath);
    res.sendFile(fullPath);
  });
} else {
  app.use(express.static(path.join(__dirname + "/angular-src/dist/angular-src"))); // Used for deployment
  app.get("/*", (req, res) => {
    const fullPath = path.join(__dirname,"/angular-src/dist/angular-src/index.html");
    console.log(" Fetching from.. " + fullPath);
    res.sendFile(fullPath);
  });
}


// Start Server
app.listen(server_port, () => {
  if(server_port == 8080) { // development status
    console.log(`Listening at http://${process.env.HOSTNAME}:${server_port}`);
  } else { // deployment status
    console.log("Server listening on port " + server_port);  
  }
});
