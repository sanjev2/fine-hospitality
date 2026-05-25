import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import contactRoutes from "./routes/contact.routes";

const app = express();

const PORT = Number(process.env.PORT) || 5000;

// --------------------
// ALLOWED FRONTEND DOMAINS
// --------------------
const allowedOrigins = [
  "http://localhost:3000",
  "https://finehospitalitytraining.com",
  "https://www.finehospitalitytraining.com",
  "https://fine-hospitality-4311lnrpy.vercel.app",
];

// --------------------
// CORS
// --------------------
app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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
  console.log(`Server running on port ${PORT}`);
});