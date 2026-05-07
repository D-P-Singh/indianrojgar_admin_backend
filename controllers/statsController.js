import Post from "../models/PostSchema.js";

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