import express from "express";
import {
    createCampaign,
    getCampaigns,
} from "../controllers/notificationController.js";
import { auth, authorizeRoles } from "../middleware/auth.js";
import { updateLastSeen } from "../middleware/lastseenMiddleware.js";

const router = express.Router();

router.post("/campaign", auth, updateLastSeen, authorizeRoles("admin"), createCampaign);
router.get("/campaigns", auth, updateLastSeen, authorizeRoles("admin"), getCampaigns);






export default router;