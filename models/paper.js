import mongoose from "mongoose";

const paperSchema = new mongoose.Schema(
    {
        paperName: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },

        organisation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organisation",
            required: true,
            index: true,
        },

        previousRegistrationDate: {
            type: Date,
            default: null,
        },

        nextExpectedRegistrationDate: {
            type: Date,
            default: null,
        },

        examDate: {
            type: Date,
            default: null,
        },

        resultDate: {
            type: Date,
            default: null,
        },

        type: {
            type: String,
            enum: ["Exam", "Recruitment", "Admission", "Other"],
            default: "Exam",
        },

        note: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Paper", paperSchema);