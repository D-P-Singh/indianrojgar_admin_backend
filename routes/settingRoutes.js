import express from "express";
import { getSettings, updateSettings } from "../controllers/settingController.js";
import { auth, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.get("/",auth,authorizeRoles("admin"), getSettings);
router.post("/update", auth, authorizeRoles("admin"), updateSettings);

export default router;

