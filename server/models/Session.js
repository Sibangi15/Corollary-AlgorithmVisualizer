import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    algorithm: {
        type: String,
        required: true,
    },
    mode: {
        type: String,
        enum: ["sorting", "searching", "graph"],
        required: true,
    },
    inputSize: Number,
    stepsCount: Number,
    timeTaken: Number, // in ms

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Session", sessionSchema);