const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

// Check if the user is authenticated
const requireToken = (req, res, next) => {
    // Get the token from the header
    const authHeader = req.headers['authorization'];

    // Check if the token exists
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Token not found" });
    }
    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.id = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
};

// Check if the user is an admin
async function requireAdmin(req, res, next) {
    try {
        const admin = await Admin.findById(req.id);
        if (!admin) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}
module.exports = { requireToken, requireAdmin };