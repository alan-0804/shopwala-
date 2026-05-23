const express = require("express");
const router = express.Router();
const Distributor = require("../models/Distributor");

router.post("/", async (req, res) => {
  const dist = new Distributor(req.body);
  const saved = await dist.save();
  res.json(saved);
});

router.get("/", async (req, res) => {
  const data = await Distributor.find();
  res.json(data);
});

module.exports = router;