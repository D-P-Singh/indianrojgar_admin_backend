import express from "express";
import {
    createIdea,
    getIdeas,
    getIdeaById,
    updateIdea,
    deleteIdea,
    convertToPost
} from "../controllers/ideaController.js";
import { auth, authorizeRoles } from "../middleware/auth.js";
import { updateLastSeen } from "../middleware/lastseenMiddleware.js";

const router = express.Router();

router.post("/", auth, updateLastSeen ,authorizeRoles("admin"),createIdea);
router.get("/", auth, updateLastSeen, authorizeRoles("admin"), getIdeas);
router.get("/:id", auth, updateLastSeen, authorizeRoles("admin"), getIdeaById);
router.put("/:id", auth, updateLastSeen, authorizeRoles("admin"), updateIdea);
router.delete("/:id", auth, updateLastSeen, authorizeRoles("admin"), deleteIdea);

// 🔥 special route
router.post("/convert/:id", convertToPost);

export default router;