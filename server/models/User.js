const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["shopkeeper", "distributor"],
    default: "shopkeeper"
  },

  phone: {
    type: String,
    default: ""
  },

  address: {
    type: String,
    default: ""
  },

  profileImage: {
    type: String,
    default: ""
  },
  ownerName: {
  type: String,
  default: ""
},

businessType: {
  type: String,
  default: ""
},

description: {
  type: String,
  default: ""
},

city: {
  type: String,
  default: ""
},

state: {
  type: String,
  default: ""
},

pincode: {
  type: String,
  default: ""
},

location: {
  type: String,
  default: ""
},

  // Distributor fields
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
  panNumber: {
  type: String,
  default: ""
}
}, {
  timestamps: true
});

module.exports = mongoose.model("User", userSchema);