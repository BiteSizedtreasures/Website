const express = require("express");
const router = express.Router();
const Product = require("../models/product");

// Fetch all product route
router.get("/", async (req, res) => {
   Product.find({}, (err, product) => {
    res.json({ success: true, data: product });
  })
  .clone()
  .catch(err => console.log(err));
});

// Fetch Product by ID route
router.get("/:id", async (req, res) => {
  await Product.findById({ _id: req.params.id }, (err, product) => {
    if(err) {
      res.json({ success: false, message:"Product couldn't be found." });
    } else {
      res.json({ success: true, data: product, message:"Product found." });
    }
  })
  .clone()
  .catch(err => console.log(err));
});


// Create a product route
router.post("/", async (req, res, next) => {
  // Creates a new flavor object with the data received
  let Product_object = new Product({
    name: req.body.name,
    allergins: req.body.allergins,
    ingredients: req.body.ingredients,
    price: req.body.price,
    coating: req.body.coating,
    decoration: req.body.decoration,
  });
  
  if (Product_object.save()) { // If the product information is saved
    res.json({ success: true, message: "Product successfully created." });
  } else { // If the product information is not saved in the database
    res.json({ success: false, message: "Product not created." });
  }
});

// Delete a product route
router.delete("/:id", async (req, res) => {
  var userID = 0;
  await Product.findOneAndDelete({_id: req.params.id}, (err, product) => {
    if(err) {
      res.json({ success: false, message:"Product could not be deleted." });
    } else {
      res.json({ success: true, message:"Product successfully deleted." });
    }
  })
  .clone()
  .catch(err => console.log(err));
})


module.exports = router;
