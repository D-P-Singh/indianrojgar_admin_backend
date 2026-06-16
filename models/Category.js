import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    description: String,
    seoTitle: { type: String, maxlength: 60 },
    seoDescription: { type: String, maxlength: 160 },
    seoKeywords: [String],
}, { timestamps: true });

// Indexes (only here, not in field)
//categorySchema.index({ slug: 1 });
//categorySchema.index({ categoryName: 1 });

// categorySchema.pre("save", function (next) {
//     if (!this.slug) {
//         this.slug = this.categoryName
//             .toLowerCase()
//             .replace(/[^a-z0-9]+/g, "-")
//             .replace(/^-+|-+$/g, "");
//     }
//     next();
// });

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
