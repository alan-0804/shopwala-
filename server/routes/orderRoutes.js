const express = require("express");

const router = express.Router();

const Order = require("../models/Order");

const Price = require("../models/Price");

const auth = require("../middleware/auth");


// ==============================
// PLACE ORDER
// ==============================

router.post(
  "/",
  auth,
  async (req, res) => {

    try {

      const {
        priceId,
        quantity
      } = req.body;


      console.log(
        "BODY:",
        req.body
      );


      // FIND PRICE

      const priceData =
        await Price.findById(priceId)
          .populate("itemId")
          .populate("distributorId");


      console.log(
        "PRICE DATA:",
        priceData
      );


      // CHECK PRICE

      if (!priceData) {

        return res.status(404).json({

          error: "Price not found"

        });
      }


      // CHECK DISTRIBUTOR

      if (!priceData.distributorId) {

        return res.status(400).json({

          error:
            "Distributor missing"

        });
      }


      // CHECK ITEM

      if (!priceData.itemId) {

        return res.status(400).json({

          error:
            "Item missing"

        });
      }


      // TOTAL

      const total =
        priceData.price * quantity;


      // CREATE ORDER

      const order = new Order({

        shopkeeperId:
          req.user.id,

        distributorId:
          priceData.distributorId,

        itemId:
          priceData.itemId,

        quantity,

        price:
          priceData.price,

        total

      });


      console.log(
        "ORDER OBJECT:",
        order
      );


      // SAVE

      const saved =
        await order.save();


      console.log(
        "ORDER SAVED:",
        saved
      );


      res.json(saved);

    } catch (err) {

      console.log(
        "ORDER ERROR:",
        err
      );

      res.status(500).json({

        error: err.message

      });

    }
  }
);


// ==============================
// GET MY ORDERS
// ==============================

router.get(
  "/my",
  auth,
  async (req, res) => {

    try {

      const orders =
        await Order.find({

          shopkeeperId:
            req.user.id

        })

          .populate("itemId")

          .populate("distributorId");


      console.log(
        "MY ORDERS:",
        orders
      );


      res.json(orders);

    } catch (err) {

      console.log(
        "GET ORDERS ERROR:",
        err
      );

      res.status(500).json({

        error: err.message

      });

    }
  }
);


module.exports = router;