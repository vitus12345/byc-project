const { Order } = require("../model/order");
const { Cart } = require("../model/cart");
const express = require("express");
const router = express.Router();


router.get("/", async (req, res) => {
    const order = await Order.find().sort();
    res.send(order);
  });





module.exports = router;