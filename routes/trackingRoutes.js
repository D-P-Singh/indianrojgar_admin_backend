import express from "express";
import Analytics from "../models/Analytics.js";
import { auth, authorizeRoles } from "../middleware/auth.js";
import { updateLastSeen } from "../middleware/lastseenMiddleware.js";

const router = express.Router();

router.get("/click",auth,updateLastSeen,authorizeRoles("admin"), async (req, res) => {
    const { cid } = req.query;

    await Analytics.updateOne(
        { campaignId: cid },
        { $inc: { clicks: 1 } }
    );

    res.redirect("https://your-site.com");
});

export default router;