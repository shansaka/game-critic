const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Admin = require("../models/admin");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
  });
};

const createRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "3m",
  });
};

// Adding a user
router.post("/signup", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: crypto
      .createHash("sha512")
      .update(req.body.password)
      .digest("hex"),
  });

  try {
    const newUser = await user.save();
    const token = createToken(newUser._id);
    const refreshToken = createRefreshToken(user._id);
    res.status(200).json({
      message: "User register successful",
      isSuccess: true,
      token: token,
      refreshToken: refreshToken,
      username: newUser.name,
      userId: newUser._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Logging in a user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = crypto
    .createHash("sha512")
    .update(password)
    .digest("hex");
  try {
    const user = await User.findOne({ email, password: hashedPassword });
    if (!user) {
      return res
        .status(200)
        .json({ message: "Invalid email or password", isSuccess: false });
    }
    const token = createToken(user._id);
    const refreshToken = createRefreshToken(user._id);
    res.status(200).json({
      message: "User login successful",
      isSuccess: true,
      token: token,
      refreshToken: refreshToken,
      username: user.name,
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Refreshing the token
router.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  const expiredToken = req.body.expiredToken;

  if (refreshToken == null || expiredToken == null) return res.sendStatus(401);

  jwt.verify(
    expiredToken,
    process.env.JWT_SECRET,
    { ignoreExpiration: true },
    (err, expiredTokenPayload) => {
      if (err) return res.sendStatus(403);

      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, refreshTokenPayload) => {
          if (err) return res.sendStatus(403);

          if (expiredTokenPayload.id !== refreshTokenPayload.id)
            return res.sendStatus(403);

          const accessToken = createToken(refreshTokenPayload.id);
          const newRefreshToken = createRefreshToken(refreshTokenPayload.id);
          res.json({ token: accessToken, refreshToken: newRefreshToken });
        }
      );
    }
  );
});

// Admin login
router.post("/login/admin", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = crypto
    .createHash("sha512")
    .update(password)
    .digest("hex");
  try {
    const admin = await Admin.findOne({ email, password: hashedPassword });
    if (!admin) {
      return res
        .status(200)
        .json({ message: "Invalid email or password", isSuccess: false });
    }
    const token = createToken(admin._id);
    res.status(200).json({
      message: "Admin login successful",
      isSuccess: true,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
