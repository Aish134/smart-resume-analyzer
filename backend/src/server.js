import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to the SmartHire API!",
        status: "running",
    });
});

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "SmartHire backend is healthy",
    });
});

app.listen(PORT, () => {
    console.log(`SmartHire API running at http://localhost:${PORT}`);
});