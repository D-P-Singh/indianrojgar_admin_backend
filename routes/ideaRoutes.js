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

const router = express.Router();

router.post("/",auth,authorizeRoles("admin"),createIdea);
router.get("/", auth, authorizeRoles("admin"), getIdeas);
router.get("/:id", auth, authorizeRoles("admin"), getIdeaById);
router.put("/:id", auth, authorizeRoles("admin"), updateIdea);
router.delete("/:id", auth, authorizeRoles("admin"), deleteIdea);

// 🔥 special route
router.post("/convert/:id", convertToPost);

export default router;