const express = require("express");

const router = express.Router();

const Item = require("../models/Item");
const Price = require("../models/Price");


// AI RECOMMENDATION

router.get("/recommendations", async (req, res) => {

  try {

    const items = await Item.find();

    const recommendations = [];

    for (const item of items) {

      const prices = await Price.find({
        itemId: item._id
      }).populate("distributorId");

      if (prices.length === 0)
        continue;

      // FIND CHEAPEST

      const best = prices.reduce(
        (min, p) =>
          p.price < min.price ? p : min
      );

      // CALCULATE PROFIT

      const profit =
        item.mrp - best.price;

      recommendations.push({

        item: item.name,

        mrp: item.mrp,

        bestPrice: best.price,

        distributor:
          best.distributorId?.name,

        profit

      });
    }

    // SORT BY HIGHEST PROFIT

    recommendations.sort(
      (a, b) =>
        b.profit - a.profit
    );

    res.json(recommendations);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }
});

module.exports = router;