import express from "express";
import nodemailer from "nodemailer"; // Added nodemailer

const router = express.Router();

let messages = [];

// GET all messages (No changes here)
router.get("/", (req, res) => res.json(messages));

// POST a new message + Send Email
router.post("/", async (req, res) => {
  // Added 'async' to handle the email sending
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // 1. Existing logic: Save to your local array
  const newMessage = {
    id: messages.length + 1,
    name,
    email,
    message,
    createdAt: new Date(),
  };
  messages.push(newMessage);

  // 2. New Logic: Send the Email
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        // Uses the keys you created in the Render dashboard
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Sends the email to you
      replyTo: email, // Let's you reply directly to the sender
      subject: `New Portfolio Message from ${name}`,
      text: `Message: ${message}\n\nSender Email: ${email}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    // Success response
    res.status(201).json({
      message: "Message received and email sent!",
      data: newMessage,
    });
  } catch (error) {
    console.error("Email Error:", error);
    // Even if email fails, the message was still saved to your 'messages' array
    res.status(201).json({
      message: "Message saved, but email failed to send.",
      data: newMessage,
      error: error.message,
    });
  }
});

export default router;
