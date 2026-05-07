import express from "express";
import { getEditorStats } from "../controllers/statsController.js";
import { auth, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth,authorizeRoles("editor"), getEditorStats);

export default router;