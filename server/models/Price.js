const mongoose = require("mongoose");

const priceSchema =
  new mongoose.Schema({

    itemId: {

      type:
        mongoose.Schema.Types.ObjectId,

      ref: "Item"

    },

    distributorId: {

      type:
        mongoose.Schema.Types.ObjectId,

      ref: "User"

    },

    price: {

      type: Number,

      required: true

    }

  });

module.exports =
  mongoose.model(
    "Price",
    priceSchema
  );