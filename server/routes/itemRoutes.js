const express = require("express");
const router = express.Router();

const Item = require("../models/Item");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

router.post(
  "/",
  auth,
  upload.single("image"),
  async (req, res) => {

    try {

      const item = new Item({

        name: req.body.name,

        category: req.body.category,

        quantity: req.body.quantity,

        reorderLevel:
          req.body.reorderLevel,

        mrp: req.body.mrp,

        image:
          req.file
            ? req.file.path
            : ""

      });

      const saved =
        await item.save();

      res.json(saved);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: err.message
      });

    }

  }
);

router.get(
  "/",
  async (req, res) => {

    const items =
      await Item.find();

    res.json(items);

  }
);

module.exports = router;