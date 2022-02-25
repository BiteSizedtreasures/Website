const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const Flavor = require("../models/flavor");
const config = require("../config/database");
const { response } = require("express");

// Process to add a Flavor
router.post("/addflavor", (req, res, next) => {
    // Creates a new flavor object with the data received
    let newFlavor = new Flavor({
        image: req.body.image,
        name: req.body.name,
        allergins: req.body.allergins,
        ingredients: req.body.ingredients,
        price: req.body.price,
        coating: req.body.coating,
        decorations: req.body.decorations,
    });
    // Notifies if flavor has been created successfully
    Flavor.addFlavor(newFlavor,(err, flavor) => {
        if(err) {
            res.json({ success: false, message: "Failed to add flavor." });
        } else {
            res.json({ success: true, message: "Added flavor." });
        }
    });
});

// When Creating a flavor, it checks and see if falvor exists in database
router.post("/authenticateflavor", (req, res, next) => {
    // Retreive Flavor Name
    const name = req.body.name;
    // Checks if the name is found in the database
    Flavor.getFlavorByName(name, (err, flavor) => {
        if (err) {
            throw err;
        }
        if(!flavor) {
            return res.json({ success: true, message: "Flavor is not found." });
        } else {
            return res.json({ success: false, message: "Flavor found." });
        }
    });
});

// Deletes flavor from database
router.delete("/flavor/:name", (req, res, next) => {
    // Retreives name from route ":name"
    const name  = req.params.name;

    Flavor.removeFlavor(name, (err, flavor) => {
        if(err) {
            throw err;
        }
        if(!flavor) {
            return res.json({ success: false, message: "Flavor not found." });
        } else {
            return res.json({ success: true, message: "Flavor deleted." });
        }
    });
});

// Updates Flavor info to the database
router.patch("/flavor/:name", (req, res, next) => {
    const name = req.params.name;

    Flavor.updateFlavor(name, (err, flavor) => {
        if(err) {
            throw err;
        }
        if(!flavor) {
            return res.json({ success: false, message: "Flavor not found." });
        } else {
            return res.json({ success: true, message: "Flavor updated." });
        }
    });
});


// Retreive All Flavors
router.get("/flavors", (req, res, next) => {
    // Returns all objects (flavors) in the database
    const flavors = await Flavor.find({});

    try { // tries to send the data (flavors)
        response.send(flavors);
    } catch (err) { // send to console error 500 status
        response.status(500).send(err);
    }
});

module.exports = router;