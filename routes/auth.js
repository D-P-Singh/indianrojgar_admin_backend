import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// REGISTER (optional)
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // check existing user
        const existing = await User.findOne({ email: email.toLowerCase() });
        if (existing) {
            return res.status(400).json({ msg: "User already exists" });
        }

        // hash password
        const hash = await bcrypt.hash(password, 10);

        // role control (security)
        const newUser = await User.create({
            name,
            email: email.toLowerCase(),
            password: hash,
            role: role || "editor", // default editor
        });

        res.json({
            msg: "User registered successfully",
            user: newUser,
        });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

// LOGIN
router.post("/login", async (req, res) => {
   // console.log("Login attempt:", req.body); // Debug log
    try {

        const { email, password } = req.body;

        // validation

        if (!email || !password) {

            return res.status(400).json({
                success: false,
                msg: "Email and password required"
            });

        }

        // email format

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {

            return res.status(400).json({
                success: false,
                msg: "Invalid email format"
            });

        }

        // find user

        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if (!user) {

            return res.status(400).json({
                success: false,
                msg: "User not found"
            });

        }

        // compare password

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {

            return res.status(400).json({
                success: false,
                msg: "Wrong password"
            });

        }

        // create token

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        // set cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        // res.cookie("token", token, {
        //     httpOnly: true,
        //     secure:
        //         process.env.NODE_ENV ===
        //         "production",
        //     sameSite: "strict",
        //     maxAge:
        //         7 * 24 * 60 * 60 * 1000
        // });

        // response

        res.status(200).json({

            success: true,

            msg: "Login successful",

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            msg: "Server error"
        });

    }

});
router.post("/logout", (req, res) => {

    res.clearCookie("token");

    res.json({
        success: true,
        msg: "Logout successful"
    });

});


export default router;