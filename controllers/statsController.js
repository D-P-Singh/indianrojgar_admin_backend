import Post from "../models/PostSchema.js";
import User from "../models/User.js";

export const getEditorStats = async (req, res) => {
    try {
        const userId = req.user.id;
       // createdBy: req.user.id
//console.log("User ID for stats:", userId);
        const totalPosts = await Post.countDocuments({ createdBy: userId });

        const pending = await Post.countDocuments({
            createdBy: userId,
            approvalStatus: "pending"
        });

        const approved = await Post.countDocuments({
            createdBy: userId,
            approvalStatus: "approved"
        });

        const rejected = await Post.countDocuments({
            createdBy: userId,
            approvalStatus: "rejected"
        });

        const drafts = await Post.countDocuments({
            createdBy: userId,
            approvalStatus: "draft"
        });

        res.json({
            totalPosts,
            pending,
            approved,
            rejected,
            drafts
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



export const getAdminStats = async (req, res) => {
    try {

        // Total Posts
        const totalPosts = await Post.countDocuments();

        // Total Editors
        const totalEditors = await User.countDocuments({
            role: "editor"
        });
console.log("Total Editors:", totalEditors);
        // Total Users
        const totalUsers = await User.countDocuments();

        // Applications
     //   const totalApplications = await Application.countDocuments();

        // Post Status Counts
        const pendingPosts = await Post.countDocuments({
            approvalStatus: "pending"
        });

        const approvedPosts = await Post.countDocuments({
            approvalStatus: "approved"
        });

        const rejectedPosts = await Post.countDocuments({
            approvalStatus: "rejected"
        });

        const drafts = await Post.countDocuments({
            approvalStatus: "draft"
        });

        res.json({
            totalPosts,
            totalEditors,
            totalUsers,
          //  totalApplications,
            pendingPosts,
            approvedPosts,
            rejectedPosts,
            drafts
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};