import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

let messages = [];

router.get("/", (req, res) => res.json(messages));

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Save to memory
  const newMessage = {
    id: messages.length + 1,
    name,
    email,
    message,
    createdAt: new Date(),
  };
  messages.push(newMessage);

  try {
    // 1. Better transporter config for Gmail
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      // Added connection timeout settings
      connectionTimeout: 10000, // 10 seconds
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });

    // 2. Critical: Test the connection before sending
    await transporter.verify();

    // 3. Send Email
    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `Portfolio Message from ${name}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Message:</strong> ${message}</p>`,
    });

    res.status(201).json({ message: "Sent!", data: newMessage });
  } catch (error) {
    // If it fails, we need to see WHY in the Render Logs
    console.error("Nodemailer Error Details:", error);
    res.status(500).json({ error: "Email failed", details: error.message });
  }
});

export default router;
