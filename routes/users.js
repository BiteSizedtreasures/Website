const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const config = require("../config/database");

// Process to register the user
router.post("/", (req, res, next) => { //register function
  // Creates a new user object with the data received
  let newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  });
  // notifies if user has been created
  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({ success: false, message: "Failed to register user." });
    } else {
      res.json({ success: true, message: "User successfully registered." });
    }
  });
});

// Authenticate if the user is already registered
router.post("/authenticate", (req, res, next) => {
  // retreive email and password once login button is clicked
  const email = req.body.email;
  const password = req.body.password;
  // Checks if the email is found in the database
  User.getUserByEmail(email, (err, user) => {
    if (err) { // if an error message occurs
      throw err;
    }
    if (!user) { // if user is not found
      return res.json({ success: false, message: "User not found." });
    }
    // Checks if password macthes with the user account
    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) { // if an error message occurs
        throw err;
      }
      if (isMatch) { // if user is found, output info and add user to session
        const token = jwt.sign(user.toJSON(), config.secret, {
          expiresIn: 604800, // 1 week : Will keep the user logged in till 1 week
        });
        res.json({ // returns object in JSON format (whenever it auth the user, it navigates to the home and displays user info)
          success: true,
          token: "JWT " + token,
          user: {
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
          },
        });
      } else { // if password does not match, output message
        return res.json({ success: false, message: "Wrong password." });
      }
    });
  });
});

module.exports = router; //connects to server.js file