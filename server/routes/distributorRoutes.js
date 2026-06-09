const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Get all distributors
router.get("/", async (req, res) => {

  try {

    const distributors =
      await User.find({

        role: "distributor"

      }).select("-password");

    res.json(distributors);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});

// Get one distributor
router.get("/:id", async (req, res) => {

  try {

    const distributor =
      await User.findOne({

        _id: req.params.id,
        role: "distributor"

      }).select("-password");

    if (!distributor) {

      return res.status(404).json({
        error: "Distributor not found"
      });

    }

    res.json(distributor);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});

module.exports = router;