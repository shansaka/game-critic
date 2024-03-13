const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Admin = require('../models/admin');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};


// Adding a user
router.post("/signup", async (req, res) => {
    const user = new User({
        displayName: req.body.displayName,
        email: req.body.email,
        password: crypto.createHash('sha512').update(req.body.password).digest('hex')
    });

    try {
        const newUser = await user.save();
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Logging in a user
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = crypto.createHash('sha512').update(password).digest('hex');
    try {
        const user = await User.findOne({ email, password: hashedPassword });
        if (!user) {
            return res.status(200).json({ message: "Invalid email or password", isSuccess: false });
        }
        const token = createToken(user._id);
        res.status(200).json({ message: "User login successful", isSuccess: true, token: token, username: user.displayName, userId: user._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Admin login
router.post("/login/admin", async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = crypto.createHash('sha512').update(password).digest('hex');
    try {
        const admin = await Admin.findOne({ email, password: hashedPassword });
        if (!admin) {
            return res.status(200).json({ message: "Invalid email or password", isSuccess: false });
        }
        const token = createToken(admin._id);
        res.status(200).json({ message: "Admin login successful", isSuccess: true, token: token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;