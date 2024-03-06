require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Setting port for the application
const PORT = process.env.PORT || 3000;

// Setting express to use json and url encode
app.use(express.json());

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

