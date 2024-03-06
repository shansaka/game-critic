const express = require('express');
const Review = require('../models/review');
const { requireToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Getting all
router.get("/", requireToken, async (req, res) => {
    try {
        const reviews = await Review.find().populate('game');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Getting a review by ID
router.get("/:id", requireToken, async (req, res) => {
    try {
        const review = await Review.findById(req.params.id).populate('game');
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Adding a review
router.post("/", requireToken, async (req, res) => {
    const review = new Review({
        user: req.id,
        game: req.body.gameId,
        rating: req.body.rating,
        comments: req.body.comments,
        location: req.body.location
    });

    try {
        const newReview = await review.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Updating a review
router.patch("/:id", requireToken, async (req, res) => {
    try {
        const review = await Review.findById(req.params.id); 
        if (req.body.comments) {
            review.comments = req.body.comments;
        }
        if (req.body.rating) {
            review.rating = req.body.rating;
        }
        const updatedReview = await review.save();
        res.json(updatedReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
module.exports = router;
