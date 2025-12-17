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

  const newMessage = {
    id: messages.length + 1,
    name,
    email,
    message,
    createdAt: new Date(),
  };
  messages.push(newMessage);

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verify connection configuration before sending
    await transporter.verify();

    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Portfolio Message from ${name}`,
      text: `Message: ${message}\n\nSender Email: ${email}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
        </div>
      `,
    });

    res
      .status(201)
      .json({ message: "Message sent successfully!", data: newMessage });
  } catch (error) {
    // THIS LOG IS CRUCIAL: Check your Render dashboard "Logs" tab to see this output
    console.error("CRITICAL MAILER ERROR:", error);

    res.status(500).json({
      error: "Backend reached, but Gmail rejected the request.",
      details: error.message,
    });
  }
});

export default router;
