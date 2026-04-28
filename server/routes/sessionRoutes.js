import express from "express";
import Session from "../models/Session.js";

const router = express.Router();

//Save Session
router.post("/", async (req, res) => {
    try {
        const { algorithm, mode, inputSize, stepsCount, timeTaken } = req.body;

        const session = new Session({
            algorithm,
            mode,
            inputSize,
            stepsCount,
            timeTaken,
        });

        await session.save();

        res.status(201).json({ message: "Session saved" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Get History
router.get("/", async (req, res) => {
    try {
        const sessions = await Session.find().sort({ createdAt: -1 }).limit(20);
        res.json(sessions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;