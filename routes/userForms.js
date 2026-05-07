import express from "express";
import UserForm from "../models/User-form.js";
import { auth, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

// ✅ Create form (user side)
router.post("/", async (req, res) => {
    try {
        const { name, phone, email, applyFor } = req.body;

        const newForm = await UserForm.create({
            name,
            phone,
            email,
            applyFor,
        });

        res.json(newForm);
    } catch (err) {
        res.status(500).json({ msg: "Error creating form" });
    }
});

// ✅ Get all forms (Admin)
router.get("/", auth, authorizeRoles("admin"), async (req, res) => {
    try {
        const forms = await UserForm.find().sort({ createdAt: -1 });
        res.json(forms);
    } catch (err) {
        res.status(500).json({ msg: "Error fetching data" });
    }
});

// ✅ Update status
router.put("/:id", auth, authorizeRoles("admin"), async (req, res) => {
    try {
        const { status } = req.body;

        const updated = await UserForm.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        res.json(updated);
    } catch (err) {
        res.status(500).json({ msg: "Update failed" });
    }
});

// ✅ Delete
router.delete("/:id", auth, authorizeRoles("admin"), async (req, res) => {

    res.send("Delete route works, but is disabled for safety. Check code for details.")
    // try {
    //     await UserForm.findByIdAndDelete(req.params.id);
    //     res.json({ msg: "Deleted" });
    // } catch (err) {
    //     res.status(500).json({ msg: "Delete failed" });
    // }
});

export default router;