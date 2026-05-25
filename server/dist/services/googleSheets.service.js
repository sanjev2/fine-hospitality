"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appendContactToSheet = appendContactToSheet;
const googleapis_1 = require("googleapis");
// ENV VARIABLES (Render / Production)
const sheetId = process.env.GOOGLE_SHEET_ID;
const projectId = process.env.GOOGLE_PROJECT_ID;
const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
const privateKey = process.env.GOOGLE_PRIVATE_KEY;
// Debug (safe for production logs)
console.log("ENV CHECK:", {
    sheetId: !!sheetId,
    projectId: !!projectId,
    clientEmail: !!clientEmail,
    privateKey: !!privateKey,
});
if (!sheetId) {
    throw new Error("GOOGLE_SHEET_ID is missing");
}
if (!projectId || !clientEmail || !privateKey) {
    throw new Error("Google credentials env variables are missing");
}
// FIX PRIVATE KEY FORMAT (CRITICAL)
const formattedPrivateKey = privateKey.replace(/\\n/g, "\n");
// AUTH (NO FILES USED)
const auth = new googleapis_1.google.auth.GoogleAuth({
    credentials: {
        project_id: projectId,
        client_email: clientEmail,
        private_key: formattedPrivateKey,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
// GOOGLE SHEETS CLIENT
const sheets = googleapis_1.google.sheets({
    version: "v4",
    auth,
});
// APPEND FUNCTION
async function appendContactToSheet(data) {
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
