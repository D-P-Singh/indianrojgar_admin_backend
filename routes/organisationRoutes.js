import express from "express";
import { createOrganisation, deleteOrganisation, getOrganisations, Organisations, updateOrganisation } from "../controllers/organisationsController.js";

const router = express.Router();

router.post("/create", createOrganisation);
router.get("/all", getOrganisations);
router.put("/update/:id", updateOrganisation);
router.delete("/delete/:id", deleteOrganisation);
router.get("/", Organisations);

export default router;