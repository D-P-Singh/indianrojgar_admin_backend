import express from "express";
import { getSettings, updateSettings } from "../controllers/settingController.js";
import { auth, authorizeRoles } from "../middleware/auth.js";
import { updateLastSeen } from "../middleware/lastseenMiddleware.js";

const router = express.Router();

router.get("/",auth,updateLastSeen,authorizeRoles("admin"), getSettings);
router.post("/update", auth, updateLastSeen, authorizeRoles("admin"), updateSettings);

export default router;

