const express = require('express');
const Genre = require('../models/genre'); 
const { requireToken, requireAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Getting all genres
router.get("/", async (req, res) => {
    try {
        const genres = await Genre.find(); 
        res.json(genres);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Getting a genre by ID
router.get("/:id", async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id); 
        if (!genre) {
            return res.status(404).json({ message: "Genre not found" });
        }
        res.json(genre);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Adding a genre
router.post("/", requireToken, requireAdmin, async (req, res) => {
    const genre = new Genre({ 
        name: req.body.name,
    });

    try {
        const newGenre = await genre.save(); 
        res.status(201).json(newGenre);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Updating a genre
router.patch("/:id", requireToken, requireAdmin, async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);
        if (req.body.name) {
            genre.name = req.body.name;
        }
        const updatedGenre = await genre.save(); 
        res.json(updatedGenre);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;