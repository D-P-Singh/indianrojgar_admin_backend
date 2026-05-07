// controllers/analyticsController.js
import Analytics from "../models/Analytics.js";

export const getAnalytics = async (req, res) => {
    try {
        const data = await Analytics.find();

        const totalSent = data.reduce((a, b) => a + b.sent, 0);
        const totalClicks = data.reduce((a, b) => a + b.clicks, 0);

        res.json({
            sent: totalSent,
            clicks: totalClicks,
            ctr: totalSent ? ((totalClicks / totalSent) * 100).toFixed(2) : 0,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};