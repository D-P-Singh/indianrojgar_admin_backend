import express from "express";
import { createCategory, deleteCategory, getCategories, getCategoryBySlug, getSettings, updateCategory, updateSettings } from "../controllers/settingController.js";
import { auth, authorizeRoles } from "../middleware/auth.js";
import { updateLastSeen } from "../middleware/lastseenMiddleware.js";

const router = express.Router();

router.get("/",auth,updateLastSeen,authorizeRoles("admin"), getSettings);
router.post("/update", auth, updateLastSeen, authorizeRoles("admin"), updateSettings);

router.post("/categories/create", auth, updateLastSeen, authorizeRoles("admin"), createCategory);
router.get("/categories", getCategories);
router.get("/categories/:slug", getCategoryBySlug);
router.put("/categories/:slug", updateCategory);
router.delete("/categories/:slug", deleteCategory);

export default router;

