const express = require('express');
const Game = require('../models/game');
const Review = require('../models/review'); 
const { requireToken, requireAdmin } = require('../middleware/authMiddleware');

const router = express.Router();


// Getting all
router.get("/", async (req, res) => {
    try {
        let query = {};
        if (req.query.genre) {
            query.genre = req.query.genre;
        }
        const games = await Game.find(query).populate('genre');
        
        const gamesWithRatings = await Promise.all(games.map(async (game) => {
            const reviews = await Review.aggregate([
                { $match: { game: game._id } },
                { $group: { _id: null, avgRating: { $avg: "$rating" } } }
            ]);

            const avgRating = reviews.length > 0 ? parseFloat(reviews[0].avgRating.toFixed(1)) : 0;
            return { ...game._doc, avgRating };
        }));

        res.json(gamesWithRatings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Getting new games
router.get("/new", async (req, res) => {
    try {
        const games = await Game.find().sort({ dateReleased: -1 }).limit(5).populate('genre');
        
        const gamesWithRatings = await Promise.all(games.map(async (game) => {
            const reviews = await Review.aggregate([
                { $match: { game: game._id } },
                { $group: { _id: null, avgRating: { $avg: "$rating" } } }
            ]);

            const avgRating = reviews.length > 0 ? parseFloat(reviews[0].avgRating.toFixed(1)) : 0;
            return { ...game._doc, avgRating };
        }));

        res.json(gamesWithRatings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Getting a game by ID
router.get("/:id", async (req, res) => {
    try {
        const game = await Game.findById(req.params.id).populate('genre');
        if (!game) {
            return res.status(404).json({ message: "Game not found" });
        }

        const reviews = await Review.aggregate([
            { $match: { game: game._id } },
            { $group: { _id: null, avgRating: { $avg: "$rating" } } }
        ]);

        const avgRating = reviews.length > 0 ? parseFloat(reviews[0].avgRating.toFixed(2)) : 0;

        res.json({ ...game._doc, avgRating });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Adding a game
router.post("/", requireToken, requireAdmin, async (req, res) => {
    const game = new Game({
        name: req.body.name,
        description: req.body.description,
        developer: req.body.developer,
        publisher: req.body.publisher,
        dateReleased: req.body.dateReleased,
        genre: req.body.genre,
        mainImage: req.body.mainImage 
    });

    try {
        const newGame = await game.save();
        res.status(201).json(newGame);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Updating a game
router.patch("/:id", requireToken, requireAdmin, async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (req.body.name) {
            game.name = req.body.name;
        }
        if (req.body.description) {
            game.description = req.body.description;
        }
        if (req.body.developer) {
            game.developer = req.body.developer;
        }
        if (req.body.publisher) {
            game.publisher = req.body.publisher;
        }
        if (req.body.dateReleased) {
            game.dateReleased = req.body.dateReleased;
        }
        if (req.body.genre) {
            game.genre = req.body.genre;
        }
        if (req.body.mainImage) {
            game.mainImage = req.body.mainImage;
        }
        const updatedGame = await game.save();
        res.json(updatedGame);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Deleting a game
router.delete("/:id", requireToken, async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) {
            return res.status(404).json({ message: "Game not found" });
        }
        await game.deleteOne();
        res.json({ message: "Game deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
