import express from "express";
import {
    getPosts,
    deletePost,
    bulkDeletePosts,
    getPost,
    createPost,
    updatePost,
    getPendingPosts,
    approvePost,
    rejectPost,
} from "../controllers/postController.js";
import { auth, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, authorizeRoles("admin","editor"), getPosts);
router.get("/:id", auth, authorizeRoles("admin","editor"), getPost);
router.post("/", auth, authorizeRoles("admin","editor"), createPost);
router.put("/:id", auth, authorizeRoles("admin","editor"), updatePost);
router.delete("/:id", auth, authorizeRoles("admin"), deletePost);
router.post("/bulk-delete", auth, authorizeRoles("admin"), bulkDeletePosts);

router.get("/pending", auth, authorizeRoles("admin"), getPendingPosts);
router.put("/approve/:id", auth, authorizeRoles("admin"), approvePost);

router.put("/reject/:id", auth, authorizeRoles("admin"), rejectPost);
export default router;