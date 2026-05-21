import dotenv from "dotenv";
import path from "path";
import { google } from "googleapis";
import type { ContactFormData } from "../types/contact.js";

dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

const sheetId = process.env.GOOGLE_SHEET_ID;
const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

console.log("ENV CHECK:", {
  sheetId,
  credentialsPath,
  cwd: process.cwd(),
});

if (!sheetId) {
  throw new Error("GOOGLE_SHEET_ID is missing in .env");
}

if (!credentialsPath) {
  throw new Error("GOOGLE_APPLICATION_CREDENTIALS is missing in .env");
}

const auth = new google.auth.GoogleAuth({
  keyFile: path.resolve(process.cwd(), credentialsPath),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({
  version: "v4",
  auth,
});

export async function appendContactToSheet(data: ContactFormData) {
  const submittedAt = new Date().toLocaleString("en-NP", {
    timeZone: "Asia/Kathmandu",
  });

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: "Sheet1!A:F",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          submittedAt,
          data.name,
          data.phone,
          data.email || "",
          data.course,
          data.message,
        ],
      ],
    },
  });
}