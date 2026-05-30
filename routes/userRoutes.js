// routes/user.routes.js

import express from "express";

import {
    getUsers,
    getSingleUser,
    updateUser,
    deleteUser,
} from "../controllers/userController.js";
import { updateLastSeen } from "../middleware/lastseenMiddleware.js";

const router = express.Router();

// GET ALL USERS
router.get("/", updateLastSeen, getUsers);

// GET SINGLE USER
router.get("/:id", updateLastSeen, getSingleUser);

// UPDATE USER
router.put("/:id", updateLastSeen, updateUser);

// DELETE USER
router.delete("/:id", updateLastSeen,    deleteUser);

export default router;