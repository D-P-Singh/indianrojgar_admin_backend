// models/Campaign.js
import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema({
    title: String,
    message: String,
    url: String,
    provider: String,
    segment: String,
    status: {
        type: String,
        default: "draft",
    },
    scheduledAt: Date,
}, { timestamps: true });

export default mongoose.model("Campaign", campaignSchema);