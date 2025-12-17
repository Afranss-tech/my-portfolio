import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import contactRoutes from "./routes/contact.js";

dotenv.config();
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "https://flourishing-taffy-7a5d5d.netlify.app",
    methods: ["GET", "POST"],
  })
);

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Backend is running!" });
});

// Contact route
app.use("/api/contact", contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
