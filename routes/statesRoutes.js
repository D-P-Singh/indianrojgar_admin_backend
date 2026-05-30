import express from "express";
import { getAdminStats, getEditorStats } from "../controllers/statsController.js";
import { auth, authorizeRoles } from "../middleware/auth.js";
import { updateLastSeen } from "../middleware/lastseenMiddleware.js";

const router = express.Router();

router.get("/", auth,updateLastSeen,authorizeRoles("editor"), getEditorStats);
router.get("/admin", auth,updateLastSeen,authorizeRoles("admin"), getAdminStats);
export default router;