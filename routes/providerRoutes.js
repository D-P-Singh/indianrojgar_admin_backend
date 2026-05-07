import express from "express";
import {
    saveProvider,
    getProviders,
} from "../controllers/providerController.js";
import { auth, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.post("/",auth,authorizeRoles("admin"), saveProvider);
router.get("/", auth, authorizeRoles("admin"), getProviders);

export default router;