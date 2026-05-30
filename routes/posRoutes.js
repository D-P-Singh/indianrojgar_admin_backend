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
import { updateLastSeen } from "../middleware/lastseenMiddleware.js";

const router = express.Router();

router.get("/", auth, updateLastSeen, authorizeRoles("admin","editor"), getPosts);
router.get("/:id", auth, updateLastSeen, authorizeRoles("admin","editor"), getPost);
router.post("/", auth, updateLastSeen, authorizeRoles("admin","editor"), createPost);
router.put("/:id", auth, updateLastSeen, authorizeRoles("admin","editor"), updatePost);
router.delete("/:id", auth, updateLastSeen, authorizeRoles("admin"), deletePost);
router.post("/bulk-delete", auth, updateLastSeen, authorizeRoles("admin"), bulkDeletePosts);

router.get("/pending", auth, updateLastSeen, authorizeRoles("admin"), getPendingPosts);
router.put("/approve/:id", auth, updateLastSeen, authorizeRoles("admin"), approvePost);

router.put("/reject/:id", auth, updateLastSeen, authorizeRoles("admin"), rejectPost);
export default router;