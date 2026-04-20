const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const path = require("path");

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());

// static frontend
app.use(express.static(path.join(__dirname, "public")));

// routes (API FIRST)
app.use("/api", require("./routes/messageRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

// ROOT route ONLY
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html"));
});

// DB connect
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB failed:", err.message));

// server start
app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port", process.env.PORT);
});
