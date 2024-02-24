const mongoose = require("mongoose");
const Joi = require("joi");

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  products: [
    {
      type: new mongoose.Schema({
        name: {
          type: String,
          required: true,
        },
        image: {
          type: [
            {
              type: String,
              trim: true,
            },
          ],
        },

        price: {
          type: Number,
        },
        description: {
          type: String,
        },
        code: {
          type: String,
        },

        isAvailable: Boolean,

        date: {
          type: Date,
          default: Date.now,
        },

        size: {
          type: [String],
          enum: ["S", "M", "L", "XL"],
          required: true,
        },
        color: {
          type: [String],
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          required: true,
        },
      }),

      required: true,
    },
  ],

  bill: {
    type: Number,
    min: 0,
    required: true,
  },
});

const Cart = mongoose.model("Cart", cartSchema);

function validateCart(cart) {
  const schema = {
    user: Joi.objectId().required(),
    products: Joi.array().required(),
  };
  return Joi.validate(cart, schema);
}

exports.Cart = Cart;
exports.validate = validateCart;
