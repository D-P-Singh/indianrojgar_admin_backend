
import mongoose from "mongoose";

/* ===================== FIELD SCHEMA ===================== */
// const FieldSchema = new mongoose.Schema(
//     {
//         label: { type: String, required: true },
//         value: { type: mongoose.Schema.Types.Mixed }, // string, number, date, file link, etc.
//         type: {
//             type: String,
//             enum: ["text", "number", "date", "link", "file"],
//             default: "text",
//         },
//         color: String, // for text color or background color in tables
//     },
//     { _id: false }
// );
const FieldSchema = new mongoose.Schema(
    {
        label: { type: String, required: true },
        value: { type: mongoose.Schema.Types.Mixed },
        type: {
            type: String,
            enum: ["text", "number", "date", "link", "file"],
            default: "text",
        },

        // 🔥 STYLE SUPPORT
        color: String,
        bgColor: String,
        fontSize: String,
        fontFamily: String,
        fontWeight: String,
        fontStyle: String,
        textAlign: String,
    },
    { _id: false }
);
/* ===================== TABLE SCHEMAS ===================== */
const TableColumnSchema = new mongoose.Schema(
    {
        label: { type: String, required: true },
        //^ ⭐ ADD THIS FIELD
        type: {
            type: String,
            enum: ["text", "list"],
            default: "text",
        },
    },
    { _id: false }
);

// const TableCellSchema = new mongoose.Schema(
//     {
//         value: mongoose.Schema.Types.Mixed,
//     },
//     { _id: false }
// );

const TableCellSchema = new mongoose.Schema(
    {
        value: mongoose.Schema.Types.Mixed,

        // 🔥 STYLE
        color: String,
        bgColor: String,
        fontSize: String,
        fontFamily: String,
    },
    { _id: false }
);

const TableRowSchema = new mongoose.Schema(
    {
        cells: [TableCellSchema],
    },
    { _id: false }
);
const BlockSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ["text", "list", "link"],
            required: true,
        },
        content: String,   // text
        items: [
            {
                text: String,
                color: String,
                bgColor: String,
                fontSize: String,
                fontFamily: String,
                fontWeight: String,
                fontStyle: String,
                textAlign: String
            }
        ], // list
        label: String,     // link
        url: String,       // link
        color: String   // ✅ ADD THIS
    },
    { _id: false }
);

/* ===================== SECTION SCHEMA ===================== */
const SectionSchema = new mongoose.Schema(
    {
        sectionTitle: { type: String, required: true },
        layout: {
            type: String,
            enum: ["list", "textarea", "table", "link", "faq"],
            default: "list",
        },
        rows: [FieldSchema], // list / textarea fields
        columns: [TableColumnSchema], // table columns
        tableRows: [TableRowSchema], // table rows
        blocks: [BlockSchema], // block elements
    },
    { _id: false }
);

/* ===================== JOB SCHEMA ===================== */
const PostSchema = new mongoose.Schema(
    {
        /* ===================== PERMANENT META ===================== */
        title: { type: String, trim: true },
        postName: { type: String, required: true, trim: true },
        slug: { type: String, required: true, unique: true, lowercase: true },
        shortDescription: {
            type: String,
            maxlength: 500,
        },
        category: {
            type: String,
            enum: [
                "latest-job",
                "result",
                "admit-card",
                "answer-key",
                "syllabus",
                "admission",
                "important",
                "government-scheme",
            ],
            required: true,
            index: true,
        },
        organization: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization"
        },
        //state
        eligibleStates: [
            {
                type: String,
                default: "All India",
            },
        ],

        // Minimum qualification
        qualification: {
            type: String,
            default: "10", // 8, 10, 12, Graduate, Post_Graduate
        },

        // Age limit
        ageLimit: {
            min: {
                type: Number,
                default: 18,
            },

            max: {
                type: Number,
                default: 65,
            },

        },
        /* ===================== SEO ===================== */
        metaTitle: { type: String },
        metaDescription: { type: String },
        metaKeywords: { type: [String], default: [] },

        /* ===================== PUBLISH & STATUS ===================== */
        priority: { type: Number, default: 0 },
        status: {
            type: String,
            enum: ["active", "expired", "upcoming"],
            default: "active",
            index: true,
        },
        isPublished: { type: Boolean, default: true },

        /* ===================== DYNAMIC SECTIONS ===================== */
        sections: [SectionSchema],

        /* ===================== ADMIN & ANALYTICS ===================== */
        isTrending: { type: Boolean, default: false },
        views: { type: Number, default: 0 },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        updates: [
            {
                user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                message: String,
                at: { type: Date, default: Date.now }
            }
        ],

        approvedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        // 1. Admin approval workflow
        approvalStatus: {
            type: String,
            enum: ["draft", "pending", "approved", "rejected"],
            default: "pending"
        },
    },

    { timestamps: true }
);

/* ===================== INDEXES ===================== */
PostSchema.index({ postName: "text", organization: "text" });
PostSchema.index({ category: 1, priority: -1 });
PostSchema.index({ isTrending: 1, status: 1 });

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
