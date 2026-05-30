import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        /* ================= BASIC INFO ================= */

        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            index: true,
        },

        password: {
            type: String,
            required: true,
            select: false, // security: default fetch na ho
        },

        phone: {
            type: String,
            default: null,
        },

        avatar: {
            type: String, // profile image URL
            default: "",
        },

        /* ================= AUTH & SECURITY ================= */

        role: {
            type: String,
            enum: ["superadmin", "admin", "editor", "author", "viewer"],
            default: "editor",
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        isVerified: {
            type: Boolean,
            default: false,
        },

        emailVerifiedAt: {
            type: Date,
            default: null,
        },

        lastLogin: {
            type: Date,
            default: null,
        },
        isOnline: {
            type: Boolean,
            default: false,
        },
        lastSeen: {
            type: Date,
            default: null,
        },

        loginAttempts: {
            type: Number,
            default: 0,
        },

        lockUntil: {
            type: Date,
            default: null,
        },

        /* ================= CMS PERMISSIONS ================= */

        permissions: {
            canCreate: { type: Boolean, default: true },
            canEdit: { type: Boolean, default: true },
            canDelete: { type: Boolean, default: false },
            canPublish: { type: Boolean, default: false },
        },

        /* ================= PROFILE ================= */

        bio: {
            type: String,
            default: "",
            maxlength: 500,
        },

        address: {
            type: String,
            default: "",
        },

        socialLinks: {
            facebook: String,
            twitter: String,
            linkedin: String,
            website: String,
        },

        /* ================= SYSTEM ================= */

        refreshToken: {
            type: String,
            default: null,
        },

        passwordResetToken: String,
        passwordResetExpires: Date,

    },
    { timestamps: true }
);

export default mongoose.models.User ||
    mongoose.model("User", userSchema);