const axios = require("axios");
const express = require("express");
const Review = require("../models/review");
const { requireToken, requireAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Getting all
router.get("/totals", requireToken, requireAdmin, async (req, res) => {
  try {
    const totalReviews = await Review.countDocuments();
    const totalUsers = await Review.distinct("user").countDocuments();
    const totalGames = await Review.distinct("game").countDocuments();
    res.json({ totalReviews, totalUsers, totalGames });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
