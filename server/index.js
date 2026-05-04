import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import sessionRoutes from "./routes/sessionRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: "https://corollary-algorithm-visualizer.vercel.app"
}));
app.use(express.json());

// routes
app.use("/api/session", sessionRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});