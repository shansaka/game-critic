const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");

// Check if the user is authenticated
const requireToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.id = decoded.id;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: "Token expired" });
    } else if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: "Invalid token" });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
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
