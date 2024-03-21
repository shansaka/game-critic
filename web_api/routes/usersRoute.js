const express = require("express");
const router = express.Router();
const User = require("../models/user");
const crypto = require("crypto");
const { requireToken, requireAdmin } = require("../middleware/authMiddleware");

// Getting all users
router.get("/", requireToken, requireAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Getting user by ID
router.get("/:id", requireToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Updating a user
router.patch("/:id", requireToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (req.body.name) {
      user.name = req.body.name;
    }
    if (req.body.password) {
      user.password = crypto
        .createHash("sha512")
        .update(req.body.password)
        .digest("hex");
    }
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Changing user password
router.put("/:id/password", requireToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!req.body.password) {
      return res.status(400).json({ message: "New password is required" });
    }
    user.password = crypto
      .createHash("sha512")
      .update(req.body.password)
      .digest("hex");
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
