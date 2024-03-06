const express = require('express');
const Game = require('../models/game');
const { requireToken, requireAdmin } = require('../middleware/authMiddleware');

const router = express.Router();


// Getting all
router.get("/", async (req, res) => {
    try {
        const games = await Game.find().populate('genre');
        res.json(games);
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
        res.json(game);
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
        genre: req.body.genre
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
        const updatedGame = await game.save();
        res.json(updatedGame);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
