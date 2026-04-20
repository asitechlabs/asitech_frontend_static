const express = require("express");
const Message = require("../models/Message");
const { sendWelcomeEmail } = require("../config/nodemailer");

const router = express.Router();

// USER sends message
router.post("/message", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "All fields are required" });
  }

  try {
    const data = await Message.create({ name, email, message });

    sendWelcomeEmail(email, name);

    res.json({ success: true, data });
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ success: false, error: "Failed to send message" });
  }
});

module.exports = router;
