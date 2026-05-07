
// import mongoose from "mongoose";

// const PostIdeaSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     category: String,
//     source: String,
//     steps: String,
//     notes: String,
//     ideaDate: { type: Date, default: Date.now },
//     publishDate: Date,
//     status: {
//       type: String,
//       enum: ["idea", "research", "draft", "published"],
//       default: "idea",
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.models.PostIdea || mongoose.model("PostIdea", PostIdeaSchema);

import mongoose from "mongoose";

const PostIdeaSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    // 🔥 Type of content (job, result, blog, feature idea)
    type: {
      type: String,
      enum: ["job", "result", "admit-card", "feature", "blog"],
      default: "job"
    },

    category: String,
    source: String,

    // 🧠 Idea details
    description: String,
    steps: [String], // array better than string
    notes: String,

    // 🚀 Status Pipeline
    status: {
      type: String,
      enum: ["idea", "research", "draft", "ready", "published"],
      default: "idea",
    },

    // ⭐ Priority system
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    },

    // 📅 Dates
    ideaDate: { type: Date, default: Date.now },
    publishDate: Date,

    // 🏷️ Tags (important for filtering)
    tags: [String],

    // 📊 Tracking
    isImportant: { type: Boolean, default: false },
    views: { type: Number, default: 0 },

  },
  { timestamps: true }
);

export default mongoose.models.PostIdea || mongoose.model("PostIdea", PostIdeaSchema);
