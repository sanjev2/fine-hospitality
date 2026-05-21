import express from "express";
import { appendContactToSheet } from "../services/googleSheets.service.js";
import type { ContactFormData } from "../types/contact.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const body = req.body as ContactFormData;

    if (!body.name || !body.phone || !body.course || !body.message) {
      return res.status(400).json({
        success: false,
        message: "Name, phone, course, and message are required.",
      });
    }

    await appendContactToSheet(body);

    return res.status(200).json({
      success: true,
      message: "Contact enquiry saved to Google Sheet.",
    });
  } catch (error) {
    console.error("Contact route error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to save enquiry.",
    });
  }
});

export default router;