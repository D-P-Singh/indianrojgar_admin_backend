import express from "express";
import checkNotifications from "../controllers/checkNotificationsController.js";
const router = express.Router();

router.get("/check", checkNotifications);



export default router;