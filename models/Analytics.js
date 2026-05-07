// models/Analytics.js
import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
    campaignId: mongoose.Schema.Types.ObjectId,
    sent: Number,
    clicks: Number,
    opened: Number,
}, { timestamps: true });

export default mongoose.model("Analytics", analyticsSchema);