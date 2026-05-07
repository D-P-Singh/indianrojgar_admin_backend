import mongoose from "mongoose";

 const ApplyForSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        requestedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { _id: false }
);
 
const UserFormSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        phone: {
            type: String,
            required: true,
            unique: true,
            index: true,
            match: /^[6-9]\d{9}$/,
        },

        email: {
            type: String,
            lowercase: true,
            trim: true,
        },

        // ⭐ IMPORTANT PART
        applyFor: {
            type: [ApplyForSchema], // ARRAY
            default: [],
        },

        status: {
            type: String,
            enum: ["pending", "contacted", "completed"],
            default: "pending",
        },
    },
    { timestamps: true }
);

export default mongoose.models.UserForm || mongoose.model("UserForm", UserFormSchema);
