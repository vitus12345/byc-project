const { Cart } = require("../model/cart");
const { User } = require("../model/user");
const { Product } = require("../model/product");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const cart = await Cart.find().sort();
  res.send(cart);
});

router.post("/", async (req, res) => {
  const { user, products } = req.body;

  try {
    const customer = await User.findById(user);
    if (!customer) return res.status(400).send("invalid Customer");

    let cart = await Cart.findOne({ user });

    if (!cart) {
      cart = new Cart({ user });
    }

    for (let product of products) {
      const productDetails = await Product.findById(product.productId);
      if (!productDetails || product.numberInStock === 0) {
        return res.status(400).send("invalid Product or out of stock");
      }

      const { image, name, code, description, price } = productDetails;

      // to Add the product to the list of cart products
      cart.products.push({
        _id: product.productId,
        image: image[0], //this is if the image is in an array, it should take the first image
        name,
        code,
        description,
        price,
        quantity: product.quantity,
        color: product.color,
        size: product.size,
      });
    }
    // to check if the goods is available and to calculate the total
    let totalPrice = 0;
    for (const product of cart.products) {
      totalPrice += product.price * product.quantity;
    }
    // to calculate the price of the product
    cart.bill = totalPrice;

    const newCart = await cart.save();

    res.status(201).json(newCart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
