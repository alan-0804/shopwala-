const express = require("express");
const router = express.Router();

const Price = require("../models/Price");

const auth = require("../middleware/auth");
const role = require("../middleware/role");


// ✅ ADD PRICE

router.post(
  "/",
  auth,
  role("distributor"),
  async (req, res) => {

    try {

      console.log("USER:", req.user);

      console.log("BODY:", req.body);

      const price = new Price({

        itemId: req.body.itemId,

        price: req.body.price,

        distributorId: req.user.id

      });

      console.log("PRICE OBJECT:", price);

      const saved = await price.save();

      console.log("SAVED:", saved);

      res.json(saved);

    } catch (err) {

      console.log("PRICE SAVE ERROR:", err);

      res.status(500).json({
        error: err.message
      });

    }
  }
);

// ✅ UPDATE PRICE

router.put(
  "/:id",
  auth,
  role("distributor"),
  async (req, res) => {

    try {

      const updated = await Price.findByIdAndUpdate(
        req.params.id,
        {
          price: req.body.price
        },
        {
          new: true
        }
      );

      res.json(updated);

    } catch (err) {

      res.status(500).json({
        error: err.message
      });

    }
  }
);

// ✅ DELETE PRICE

router.delete(
  "/:id",
  auth,
  role("distributor"),
  async (req, res) => {

    try {

      await Price.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message: "Deleted"
      });

    } catch (err) {

      res.status(500).json({
        error: err.message
      });

    }
  }
);

// ✅ GET MY PRICES

router.get(
  "/my",
  auth,
  role("distributor"),
  async (req, res) => {

    try {

      const prices = await Price.find({
        distributorId: req.user.id
      }).populate("itemId");

      console.log("MY PRICES:", prices);

      res.json(prices);

    } catch (err) {

      console.log("MY PRICE ERROR:", err);

      res.status(500).json({
        error: err.message
      });

    }
  }
);


// ✅ GET BEST PRICE

router.get(
  "/best/:itemId",
  async (req, res) => {

    try {

      const prices = await Price.find({
        itemId: req.params.itemId
      }).populate("distributorId");

      if (prices.length === 0) {

        return res.json({
          message: "No prices found"
        });

      }

      const best = prices.reduce(
        (min, p) =>
          p.price < min.price ? p : min
      );

      res.json(best);

    } catch (err) {

      res.status(500).json({
        error: err.message
      });

    }
  }
);


// ✅ GET ALL PRICES FOR ITEM

router.get(
  "/compare/:itemId",
  async (req, res) => {

    try {

      const prices = await Price.find({
        itemId: req.params.itemId
      }).populate("distributorId");

      if (prices.length === 0) {

        return res.json({
          message: "No prices found"
        });

      }

      res.json(prices);

    } catch (err) {

      res.status(500).json({
        error: err.message
      });

    }
  }
);

module.exports = router;