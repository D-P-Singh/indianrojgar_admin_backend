import express from "express";
import {
    checkNotifications,
    createCampaign,
    getCampaigns,
    getNotifications,
} from "../controllers/notificationController.js";
import { auth, authorizeRoles } from "../middleware/auth.js";
import { updateLastSeen } from "../middleware/lastseenMiddleware.js";

const router = express.Router();

router.post("/campaign", auth, updateLastSeen, authorizeRoles("admin"), createCampaign);
router.get("/campaigns", auth, updateLastSeen, authorizeRoles("admin"), getCampaigns);
//  notification provider routes can be added here

router.get("/check-notifications", checkNotifications);
router.post("/check-notifications", getNotifications);



export default router;