import mongoose from "mongoose";

const organisationSchema = new mongoose.Schema(
    {
        organisationName: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true,
        },

        officialWebsite: {
            type: String,
            trim: true,
        },

        notificationPageLink: {
            type: String,
            trim: true,
        },

        logo: String,

        description: String,
    },
    { timestamps: true }
);

export default mongoose.models.Organization ||
    mongoose.model("Organization", organisationSchema);