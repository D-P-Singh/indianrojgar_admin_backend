import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import postRoutes from './routes/posRoutes.js';
import notificationRoutes from "./routes/notificationRoutes.js";
import settingRoutes from "./routes/settingRoutes.js";
import cookieParser from "cookie-parser";
import profileRoutes from "./routes/profileRoutes.js";
import statesRoutes from "./routes/statesRoutes.js";
import dotenv from "dotenv";
//import "./cron/scheduler.js";
dotenv.config();
const app = express();

app.use(cors({

    origin:
        ["http://localhost:5173", process.env.CLIENT_URL || "https://indianrojgaradmin.netlify.app"],

    credentials: true

}));
app.use(express.json());
app.use(cookieParser());
mongoose.connect(process.env.MONGO_URI, {
    dbName: "indianrojgar",
});

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/posts", postRoutes);
import userFormRoutes from "./routes/userForms.js";
import providerRoutes from "./routes/providerRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import trackingRoutes from "./routes/trackingRoutes.js";
app.use("/api/forms", userFormRoutes);

app.use("/api/notifications", notificationRoutes);
app.use("/api/providers", providerRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/track", trackingRoutes);
app.use("/api/settings", settingRoutes);
app.use("/api/stats", statesRoutes);

import ideaRoutes from "./routes/ideaRoutes.js";
app.use("/api/ideas", ideaRoutes);
app.listen(process.env.PORT || 5000, () => {
    console.log("Server running on port " + (process.env.PORT || 5000));
});