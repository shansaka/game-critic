require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const User = require("./models/user");

// Setting port for the application
const PORT = process.env.PORT || 3000;

// Setting express to use json and url encode
app.use(express.json());

// Enabling cors
app.use(cors());

// EJS for email confirmation
app.set("view engine", "ejs");

// Connecting to the database
try {
  mongoose.connect(process.env.DATABASE_URL, {});
  console.log("Connected to the database");
} catch (error) {
  console.error("Error connecting to the database:", error.message);

  // Exit the process if the database connection fails
  process.exit(1);
}

// Default
app.listen(PORT, () => console.log(`it's alive on http://localhost:${PORT}`));
app.get("/", async (req, res) => {
  res.send("Game Critic API");
});

// Routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/usersRoute"));
app.use("/api/games", require("./routes/gamesRoute"));
app.use("/api/reviews", require("./routes/reviewsRoute"));
app.use("/api/dashboard", require("./routes/dashboardRoute"));

// Serve images
app.use("/images", express.static(path.join(__dirname, "./upload/images")));

// Email confirmation route
app.get("/confirm-email/:token", async (req, res) => {
  try {
    console.log(req.params.token);
    const user = await User.findOne({ confirmationToken: req.params.token });

    if (!user) {
      return res
        .status(400)
        .render("error", { message: "Invalid confirmation token." });
    }

    user.isVerified = true;
    user.confirmationToken = undefined;
    await user.save();

    res
      .status(200)
      .render("confirmation", { message: "Email confirmed successfully." });
  } catch (error) {
    res.status(500).render("error", { message: error.message });
  }
});
