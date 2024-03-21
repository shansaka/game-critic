const axios = require("axios");
const express = require("express");
const Review = require("../models/review");
const User = require("../models/user");
const Game = require("../models/game");
const { requireToken, requireAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Getting totals
router.get("/totals", requireToken, requireAdmin, async (req, res) => {
  try {
    const totalReviews = await Review.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalGames = await Game.countDocuments();
    res.json({ totalReviews, totalUsers, totalGames });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/top-locations", requireToken, requireAdmin, async (req, res) => {
  try {
    const topLocations = await Review.aggregate([
      {
        $addFields: {
          "location.full": {
            $concat: [
              { $ifNull: ["$location.city", "Unknown"] },
              ", ",
              { $ifNull: ["$location.country", "Unknown"] },
            ],
          },
        },
      },
      {
        $group: {
          name: "$location.full",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    res.json(topLocations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
