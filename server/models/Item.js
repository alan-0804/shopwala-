const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
  type: String,
  default: "General"
  },
  quantity: {
    type: Number,
    default: 0
  },
  reorderLevel: {
    type: Number,
    default: 0
  },
  mrp:{
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model("Item", itemSchema);