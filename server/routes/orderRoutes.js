const express = require("express");

const router = express.Router();

const Order = require("../models/Order");

const Price = require("../models/Price");

const auth = require("../middleware/auth");

const PDFDocument = require("pdfkit");

// ==============================
// PLACE ORDER
// ==============================

router.post(
  "/",
  auth,
  async (req, res) => {

    try {

      const {
        orderGroupId,
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

        orderGroupId,

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

router.get(
  "/distributor",
  auth,
  async (req, res) => {

    try {

      const orders =
        await Order.find({

          distributorId:
            req.user.id

        })

          .populate(
            "itemId"
          )

          .populate(
            "shopkeeperId"
          );
        console.log(
        "Distributor User:",
        req.user.id
      );

      console.log(
        "Orders:",
        orders
      );
      res.json(
        orders
      );

    } catch (err) {

      res.status(500)
        .json({
          error:
            err.message
        });

    }
  }
);

router.put(
  "/status/:id",
  auth,
  async (req, res) => {

    try {

      const { status } =
        req.body;

      const order =
        await Order.findByIdAndUpdate(

          req.params.id,

          { status },

          { new: true }

        );

      res.json(order);

    } catch (err) {

      res.status(500).json({
        error: err.message
      });

    }

  }
);

router.get(
  "/analytics",
  auth,
  async (req, res) => {

    try {

      const orders =
        await Order.find({
          distributorId:
            req.user.id
        });

      const revenue =
        orders
          .filter(
            o =>
              o.status ===
              "Delivered"
          )
          .reduce(
            (sum, o) =>
              sum + o.total,
            0
          );

      const pending =
        orders.filter(
          o =>
            o.status !==
            "Delivered"
        ).length;

      res.json({

        totalOrders:
          orders.length,

        pendingOrders:
          pending,

        revenue

      });

    } catch (err) {

      res.status(500).json({
        error:
          err.message
      });

    }

  }
);

router.get(
  "/invoice/:orderGroupId",
  auth,
  async (req, res) => {

    try {

      let orders;

      if (
        req.user.role ===
        "distributor"
      ) {

        orders =
          await Order.find({

            orderGroupId:
              req.params.orderGroupId,

            distributorId:
              req.user.id

          })

            .populate("itemId")
            .populate("distributorId")
            .populate("shopkeeperId");

      } else {

        orders =
          await Order.find({

            orderGroupId:
              req.params.orderGroupId,

            shopkeeperId:
              req.user.id

          })

            .populate("itemId")
            .populate("distributorId")
            .populate("shopkeeperId");

      }

      if (!orders.length) {

        return res.status(404).json({
          error: "Invoice not found"
        });

      }

      const doc =
        new PDFDocument();

      res.setHeader(
        "Content-Type",
        "application/pdf"
      );

      res.setHeader(
        "Content-Disposition",
        `attachment; filename=Invoice-${req.params.orderGroupId}.pdf`
      );

      doc.pipe(res);

      doc
        .fontSize(22)
        .text(
          "SmartStock Invoice",
          {
            align: "center"
          }
        );

      doc.moveDown();

      doc
        .fontSize(14)
        .text(
          `Order ID: ${req.params.orderGroupId}`
        );

      doc.text(
        `Shopkeeper: ${
          orders[0]
            ?.shopkeeperId
            ?.name || "-"
        }`
      );

      doc.text(
        `Distributor: ${
          orders[0]
            ?.distributorId
            ?.name || "-"
        }`
      );

      doc.moveDown();

      let grandTotal = 0;

      orders.forEach(
        (order) => {

          doc.text(
            `Product: ${
              order.itemId?.name
            }`
          );

          doc.text(
            `Quantity: ${
              order.quantity
            }`
          );

          doc.text(
            `Price: ₹${
              order.price
            }`
          );

          doc.text(
            `Total: ₹${
              order.total
            }`
          );

          doc.moveDown();

          grandTotal +=
            order.total;

        }
      );

      doc.moveDown();

      doc
        .fontSize(16)
        .text(
          `Grand Total: ₹${grandTotal}`
        );

      doc.moveDown();

      doc.text(
        `Status: ${
          orders[0].status
        }`
      );

      doc.end();

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: err.message
      });

    }

  }
);

module.exports = router;