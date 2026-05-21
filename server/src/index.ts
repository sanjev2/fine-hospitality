import dotenv from "dotenv";

dotenv.config();

import express from "express";
import cors from "cors";

import contactRoutes from "./routes/contact.routes.js";

const app = express();

const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (_req, res) => {
  return res.status(200).json({
    success: true,
    message: "Fine Hospitality Group API is running.",
  });
});

app.use("/api/contact", contactRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});