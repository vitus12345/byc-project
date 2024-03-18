const mongoose = require("mongoose");
const Joi = require("joi");

const orderSchema = new mongoose.Schema({
    cartId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Cart",
        required:true
    },
    status:{
        type:[String],
        enum:["pending","confirmed","shipped","completed","cancelled"],
        default:"pending",
        required:true
    },
    orderDate:{
        type:Date,
        default:Date.now
    },
});

const Order = mongoose.model("Order",orderSchema);

function validateOrder(order) {
    const schema = {
      cart: Joi.objectId().required(),
     
    };
    return Joi.validate(order, schema);
  }

  exports.Order= Order
  exports.validate = validateOrder
