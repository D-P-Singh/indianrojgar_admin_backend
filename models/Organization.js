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
shortName: {
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
        apiUrl: {
            type: String,
            trim: true,
        },

        description: String,
method:{
type: String,
enum: ["scrape", "api"],
default: "scrape"
},
        scrapeType: {
            type: String,
            enum: ["pdf", "table", "links"],
            default: "pdf"
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

export default mongoose.models.Organization ||
    mongoose.model("Organization", organisationSchema);

// import mongoose from "mongoose";

// const organisationSchema = new mongoose.Schema(
//     {
//         organisationName: {
//             type: String,
//             required: true,
//             unique: true,
//             trim: true,
//             index: true,
//         },

//         officialWebsite: {
//             type: String,
//             trim: true,
//         },

//         notificationPageLink: {
//             type: String,
//             trim: true,
//         },

     

//         description: String,
//     },
//     { timestamps: true }
// );

// export default mongoose.models.Organization ||
//     mongoose.model("Organization", organisationSchema);