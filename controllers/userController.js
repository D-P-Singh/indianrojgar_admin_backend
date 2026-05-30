// controllers/user.controller.js

import bcrypt from "bcryptjs";
import User from "../models/User.js";

/* =========================================
   GET ALL USERS
========================================= */

export const getUsers = async (req, res) => {

    try {

        const users = await User.find()
            .select("-password -refreshToken")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: users.length,
            users,
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

/* =========================================
   GET SINGLE USER
========================================= */

export const getSingleUser = async (req, res) => {

    try {

        const user = await User.findById(req.params.id)
            .select("-password -refreshToken");

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            user,
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

/* =========================================
   UPDATE USER
========================================= */

export const updateUser = async (req, res) => {

    try {

        const {
            name,
            email,
            phone,
            avatar,
            role,
            isActive,
            isVerified,
            bio,
            address,
            permissions,
            socialLinks,
            password,
        } = req.body;

        console.log(req.body);

        // update object
        const updateData = {
            name,
            email,
            phone,
            avatar,
            role,
            isActive,
            isVerified,
            bio,
            address,
            permissions,
            socialLinks,
        };

        // password only if provided
        if (password && password.trim() !== "") {

            const hash = await bcrypt.hash(
                password,
                10
            );

            updateData.password = hash;
        }

        const updatedUser =
            await User.findByIdAndUpdate(
                req.params.id,
                updateData,
                {
                    new: true,
                    runValidators: true,
                }
            ).select(
                "-password -refreshToken"
            );

        if (!updatedUser) {

            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            user: updatedUser,
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

/* =========================================
   DELETE USER
========================================= */

export const deleteUser = async (req, res) => {

    try {

        const deletedUser = await User.findByIdAndDelete(
            req.params.id
        );

        if (!deletedUser) {

            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};