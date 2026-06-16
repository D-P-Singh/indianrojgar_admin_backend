import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {
        organization: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization",
            required: true,
        },

        externalId: {
            type: String,
            default: null,
        },

        title: {
            type: String,
            required: true,
        },

        notificationUrl: {
            type: String,
            default:null,
        },

        publishedAt: Date,

        isPostCreated: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// Organization + externalId unique
notificationSchema.index(
    {
        organization: 1,
        externalId: 1,
    },
    {
        unique: true,
        sparse: true,
    }
);

// Organization + URL unique
notificationSchema.index(
    {
        organization: 1,
        notificationUrl: 1,
    },
    {
        unique: true,
    }
);

export default mongoose.models.Notification ||
    mongoose.model(
        "Notification",
        notificationSchema
    );