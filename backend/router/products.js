const { Product, validate } = require("../model/product");
const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth')

const admin = require('../middleware/admin')



router.get("/", async (req, res) => {
  const product = await Product.find().sort("name");
  res.send(product);
});

router.get("/:id", async (req, res) => {
  let product = await Product.findById(req.params.id);

  if (!product) return res.status(400).send("product with the ID not found");

  res.send(product);
});

router.post("/", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    price: req.body.price,
    code: req.body.code,
    isAvailable: req.body.isAvailable,
    category: req.body.category,
    tags: req.body.tags,
  });

  await product.save();
  res.send(product);
});

router.put("/:id", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      price: req.body.price,
      code: req.body.code,
      isAvailable: req.body.isAvailable,
      category: req.body.category,
      tags: req.body.tags,
    },

    {
      new: true,
    }
  );

  if (!product) return res.status(400).send("product with the ID not found");

  res.send(product);
});

router.delete("/:id",[auth, admin], async (req, res) => {
  let product = await Product.findByIdAndDelete(req.params.id);

  if (!product) return res.status(400).send("product with the ID not found");

  res.send(product);
});

module.exports = router;
