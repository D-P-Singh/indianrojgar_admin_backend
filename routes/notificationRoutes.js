import express from "express";
import {
    createCampaign,
    getCampaigns,
} from "../controllers/notificationController.js";
import { auth, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.post("/campaign", auth, authorizeRoles("admin"), createCampaign);
router.get("/campaigns", auth, authorizeRoles("admin"), getCampaigns);

export default router;