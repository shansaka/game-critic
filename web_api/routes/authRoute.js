const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Admin = require("../models/admin");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// Nodemailer transporter configuration
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_SMTP_USERNAME,
    pass: process.env.GMAIL_SMTP_PASSWORD,
  },
});

// creating a token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
  });
};

// creating a refresh token
const createRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "365d",
  });
};

// Adding a user
router.post("/signup", async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: crypto
        .createHash("sha512")
        .update(req.body.password)
        .digest("hex"),
    });

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(200).json({
        message: "Email already in use, please login in.",
        isSuccess: false,
      });
    }

    let uniqueString = crypto.randomBytes(20).toString("hex");
    user.confirmationToken = uniqueString;

    const newUser = await user.save();

    // Send confirmation email
    let mailOptions = {
      from: "gamecriticapp@gmail.com",
      to: newUser.email,
      subject: "Email Confirmation",
      text: `Thank you for registering. Please confirm your email by clicking on the following link: ${
        req.protocol
      }://${req.get("host")}/confirm-email/${user.confirmationToken}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(200).json({
      message: "User register successful, Please confirm your email.",
      isSuccess: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Confirming the email
router.get("/confirm-email/:token", async (req, res) => {
  try {
    console.log(req.params.token);
    const user = await User.findOne({ confirmationToken: req.params.token });

    if (!user) {
      return res.status(400).json({ message: "Invalid confirmation token." });
    }

    user.isVerified = true;
    user.confirmationToken = undefined;
    await user.save();

    res.status(200).json({ message: "Email confirmed successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// User login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = crypto
    .createHash("sha512")
    .update(password)
    .digest("hex");
  try {
    const user = await User.findOne({
      email,
      password: hashedPassword,
      isVerified: true,
    });
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

// Resetting the password
router.post("/reset-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const hashedNewPassword = crypto
      .createHash("sha512")
      .update(newPassword)
      .digest("hex");

    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(200).json({
        message: "Invalid email address. Please try again.",
        isSuccess: false,
      });
    }
    let uniqueString = crypto.randomBytes(20).toString("hex");
    user.confirmationToken = uniqueString;
    user.newPassword = hashedNewPassword;
    await user.save();

    // Send confirmation email
    let mailOptions = {
      from: "gamecriticapp@gmail.com",
      to: user.email,
      subject: "Reset Password Confirmation",
      text: `You have reset your password. Please confirm your reset password request by clicking on the following link: ${
        req.protocol
      }://${req.get("host")}/confirm-password/${user.confirmationToken}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(200).json({
      message:
        "Password reset successful. Please check your email and confirm the request.",
      isSuccess: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Refreshing the token
router.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  const expiredToken = req.body.expiredToken;

  // Check if the token is there
  if (refreshToken == null || expiredToken == null) return res.sendStatus(401);

  // Check if the token is valid
  jwt.verify(
    expiredToken,
    process.env.JWT_SECRET,
    { ignoreExpiration: true },
    (err, expiredTokenPayload) => {
      if (err) return res.sendStatus(403).json(err);

      // Check if the refresh token is valid
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, refreshTokenPayload) => {
          if (err) return res.sendStatus(403).json(err);

          if (expiredTokenPayload.id !== refreshTokenPayload.id)
            return res.sendStatus(403).json("Invalid token id doesn't match");

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
    const refreshToken = createRefreshToken(admin._id);
    res.status(200).json({
      message: "Admin login successful",
      isSuccess: true,
      token: token,
      refreshToken: refreshToken,
      username: admin.name,
      userId: admin._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
