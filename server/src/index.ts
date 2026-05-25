import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import contactRoutes from "./routes/contact.routes";

const app = express();

const PORT = Number(process.env.PORT) || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

// --------------------
// CORS
// --------------------
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

// --------------------
// MIDDLEWARE
// --------------------
app.use(express.json());

// --------------------
// HEALTH CHECK
// --------------------
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Fine Hospitality Group API is running.",
  });
});

// --------------------
// ROUTES
// --------------------
app.use("/api/contact", contactRoutes);

// --------------------
// START SERVER
// --------------------
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});