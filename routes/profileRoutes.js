import { auth } from "../middleware/auth.js";
import express from "express";
import User from "../models/User.js";
import { updateLastSeen } from "../middleware/lastseenMiddleware.js";
const router = express.Router();

router.get(
    "/me",
    auth,
    updateLastSeen,
    async (req, res) => {
        const user = await User.findById(req.user.id).select(
            "-password"
        );

        res.json({
            success: true,
            user: user

        });

    }
);
export default router;