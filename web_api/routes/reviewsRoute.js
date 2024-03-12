const express = require('express');
const Review = require('../models/review');
const { requireToken, requireAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Getting all
router.get("/", requireToken, async (req, res) => {
    try {
        const reviews = await Review.find().populate('game').populate('user', 'displayName');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Getting reviews by game ID1
router.get("/game/:id", async (req, res) => {
    try {
        const reviews = await Review.find({ game: req.params.id }).sort({ dateCreated: -1 }).populate('user', 'displayName');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Getting a review by ID
router.get("/:id", requireToken, async (req, res) => {
    try {
        const review = await Review.findById(req.params.id).populate('game').populate('user', 'displayName');
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Getting all reviews by a user
router.get("/user/:id", requireToken, async (req, res) => {
    try {
        const reviews = await Review.find({ user: req.params.id }).populate('game');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Adding a review
router.post("/", requireToken, async (req, res) => {
    const review = new Review({
        user: req.userId,
        game: req.body.gameId,
        title: req.body.title,
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
    console.log(req.body);
    try {
        const review = await Review.findById(req.params.id); 
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        if (req.body.comments) {
            review.comments = req.body.comments;
        }
        if (req.body.rating) {
            review.rating = req.body.rating;
        }
        if (req.body.title) {
            review.title = req.body.title;
        }
        console.log(review);
        const updatedReview = await review.save();
        res.json(updatedReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Changing review status
router.patch("/:id/status", requireToken, requireAdmin, async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        if (!req.body.status) {
            return res.status(400).json({ message: "New status is required" });
        }
        review.status = req.body.status;
        const updatedReview = await review.save();
        res.json(updatedReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Deleting a review
router.delete("/:id", requireToken, async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        await review.deleteOne();
        res.json({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
