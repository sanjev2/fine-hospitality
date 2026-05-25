"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const googleSheets_service_1 = require("../services/googleSheets.service");
const router = express_1.default.Router();
router.post("/", async (req, res) => {
    try {
        const body = req.body;
        if (!body.name || !body.phone || !body.course || !body.message) {
            return res.status(400).json({
                success: false,
                message: "Name, phone, course, and message are required.",
            });
        }
        await (0, googleSheets_service_1.appendContactToSheet)(body);
        return res.status(200).json({
            success: true,
            message: "Contact enquiry saved to Google Sheet.",
        });
    }
    catch (error) {
        console.error("Contact route error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to save enquiry.",
        });
    }
});
exports.default = router;
