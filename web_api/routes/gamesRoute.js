const express = require('express');
const router = express.Router();
const Game = require('../models/game');

// Getting all
router.get("/", async (req, res) => {
    try {
        const games = await Game.find();
        res.json(games);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Getting a game by ID
router.get("/:id", async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) {
            return res.status(404).json({ message: "Game not found" });
        }
        res.json(game);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Adding a game
router.post("/", async (req, res) => {
    const game = new Game({
        name: req.body.name,
        description: req.body.description,
        developer: req.body.developer,
        publisher: req.body.publisher,
        DateReleased: req.body.dateReleased,
        GenreId: req.body.genreId
    });

    try {
        const newGame = await game.save();
        res.status(201).json(newGame);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Updating a game
router.patch("/:id", async (req, res) => {
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
        if (req.body.DateReleased) {
            game.dateReleased = req.body.dateReleased;
        }
        if (req.body.GenreId) {
            game.genreId = req.body.genreId;
        }
        const updatedGame = await game.save();
        res.json(updatedGame);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


module.exports = router;