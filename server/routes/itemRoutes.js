const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const auth = require("../middleware/auth");

// Add item (protected)
router.post("/", auth, async (req, res) => {
  const item = new Item(req.body);
  const saved = await item.save();
  res.json(saved);
});

// Get items
router.get("/", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

module.exports = router;