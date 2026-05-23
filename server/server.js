require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Item = require("./models/Item");
const Distributor = require("./models/Distributor");
const Price = require("./models/Price");
const authRoutes = require("./routes/authRoutes");
const priceRoutes = require("./routes/priceRoutes");
const distributorRoutes = require("./routes/distributorRoutes");
const itemRoutes = require("./routes/itemRoutes");
const aiRoutes = require("./routes/aiRoutes");
const app = express();
const orderRoutes = require("./routes/orderRoutes");

app.use(cors());
app.use(express.json());
app.use("/api/ai", aiRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/prices", priceRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/distributors", distributorRoutes);
// DB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// test route
app.get("/", (req, res) => {
  res.send("Smart Stock API running");
});

app.post("/api/items", async (req, res) => {
  try {
    const item = new Item(req.body);
    const savedItem = await item.save();
    res.json(savedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post("/api/distributors", async (req, res) => {
  try {
    const dist = new Distributor(req.body);
    const saved = await dist.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get("/api/distributors", async (req, res) => {
  const data = await Distributor.find();
  res.json(data);
});
app.post("/api/prices", async (req, res) => {
  try {
    const price = new Price(req.body);
    const saved = await price.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get("/api/best-price/:itemId", async (req, res) => {
  try {
    const prices = await Price.find({ itemId: req.params.itemId })
      .populate("distributorId");

    if (prices.length === 0) {
      return res.json({ message: "No prices found" });
    }

    const best = prices.reduce((min, p) =>
      p.price < min.price ? p : min
    );

    res.json(best);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);