import express from "express";
import {
    saveProvider,
    getProviders,
} from "../controllers/providerController.js";
import { auth, authorizeRoles } from "../middleware/auth.js";
import { updateLastSeen } from "../middleware/lastseenMiddleware.js";

const router = express.Router();

router.post("/",auth,updateLastSeen,authorizeRoles("admin"), saveProvider);
router.get("/", auth, updateLastSeen, authorizeRoles("admin"), getProviders);

export default router;