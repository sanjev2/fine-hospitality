"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const contact_routes_1 = __importDefault(require("./routes/contact.routes"));
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";
// --------------------
// CORS
// --------------------
app.use((0, cors_1.default)({
    origin: CLIENT_URL,
    credentials: true,
}));
// --------------------
// MIDDLEWARE
// --------------------
app.use(express_1.default.json());
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
app.use("/api/contact", contact_routes_1.default);
// --------------------
// START SERVER
// --------------------
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
