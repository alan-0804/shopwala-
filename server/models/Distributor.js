const mongoose = require("mongoose");

const distributorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  phone: {
    type: String,
    default: ""
  },

  companyName: {
    type: String,
    default: ""
  },

  companyAddress: {
    type: String,
    default: ""
  },

  gstNumber: {
    type: String,
    default: ""
  },

  profileImage: {
    type: String,
    default: ""
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Distributor", distributorSchema);