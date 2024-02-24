const mongoose = require("mongoose");
const Joi = require("joi");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  image: {
    type: [
      {
        type: String,
        trim: true,
      },
    ],

    validate: {
      validator: function (v) {
        return v && v.length > 0;
      },
      message: "A product should have at least one image",
    },
  },

  description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100,
  },
  code: {
    type: String,
    required: true,
  },

  isAvailable: Boolean,

  price: {
    type: Number,
    required: function () {
      return this.isAvailable;
    },
    min: 5,
    max: 500,
  },

  category: {
    type: [String],
    required: true,
    enum: ["Men", "Women", "Kids"],
  },

  date: {
    type: Date,
    default: Date.now,
  },

  tags: {
    type: [String],
    required: true,
    enum: ["boxers", "T-shirts", "camisole", "pants", "towels", "singlets"],
  },
});

const Product = mongoose.model("Product", productSchema);

function validateProduct(product) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    image: Joi.array().required(),
    description: Joi.string().min(5).max(100).required(),
    code: Joi.string().required(),
    isAvailable: Joi.boolean(),
    price: Joi.number().min(5).max(500).required(),
    category: Joi.array().required(),
    tags: Joi.array().required(),
  };

  return Joi.validate(product, schema);
}

(exports.Product = Product), (exports.validate = validateProduct);
