const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

  shopkeeperId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  distributorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item"
  },

  quantity: {
    type: Number,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  total: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    default: "Pending"
  },
  orderGroupId: {
  type: String,
  required: true
},

}, { timestamps: true });

module.exports =
  mongoose.model("Order", orderSchema);