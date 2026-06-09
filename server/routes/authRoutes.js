const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashed,
      role
    });

    await user.save();

    res.json({ message: "User registered" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ msg: "User not found" });

  const match = await bcrypt.compare(password, user.password);

  if (!match) return res.status(400).json({ msg: "Wrong password" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    "secret123"
  );

  res.json({ token, role: user.role ,name: user.name });
});

router.get(
  "/profile",
  auth,
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.user.id
        ).select("-password");

      res.json(user);

    } catch (err) {

      res.status(500).json({
        error: err.message
      });

    }

  }
);

router.put(
  "/profile",
  auth,
  async (req, res) => {

    try {

      const user =
        await User.findByIdAndUpdate(

          req.user.id,

          {

            name:
              req.body.name,

            ownerName:
              req.body.ownerName,

            phone:
              req.body.phone,

            address:
              req.body.address,

            profileImage:
              req.body.profileImage,

            businessType:
              req.body.businessType,

            description:
              req.body.description,

            city:
              req.body.city,

            state:
              req.body.state,

            pincode:
              req.body.pincode,

            location:
              req.body.location,

            companyName:
              req.body.companyName,

            companyAddress:
              req.body.companyAddress,

            gstNumber:
              req.body.gstNumber,

            panNumber:
              req.body.panNumber

          },

          {
            new: true
          }

        ).select("-password");

      res.json(user);

    } catch (err) {

      res.status(500).json({
        error: err.message
      });

    }

  }
);

module.exports = router;