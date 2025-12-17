import express from "express";
const router = express.Router();

let messages = [];

// GET all messages
router.get("/", (req, res) => res.json(messages));

// POST a new message
router.post("/", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message)
    return res.status(400).json({ error: "All fields are required" });

  const newMessage = {
    id: messages.length + 1,
    name,
    email,
    message,
    createdAt: new Date(),
  };
  messages.push(newMessage);

  res.status(201).json({ message: "Message received", data: newMessage });
});

export default router;
