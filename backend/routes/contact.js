import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

let messages = [];

// GET all messages (for testing)
router.get("/", (req, res) => {
  res.json(messages);
});

// POST new contact message + send email
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Save message in memory
  const newMessage = {
    id: messages.length + 1,
    name,
    email,
    message,
    createdAt: new Date(),
  };
  messages.push(newMessage);

  try {
    // Create transporter using Render Env Variables
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // email goes to YOU
      replyTo: email, // reply directly to sender
      subject: `New Contact Message from ${name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    res.status(201).json({
      message: "Message received and email sent",
      data: newMessage,
    });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

export default router;
