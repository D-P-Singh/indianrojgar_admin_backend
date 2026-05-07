import PostIdea from "../models/PostIdeaSchema.js";
import Post from "../models/PostSchema.js";

// ✅ Create Idea
export const createIdea = async (req, res) => {
    try {
        const idea = await PostIdea.create(req.body);
        res.json({ success: true, idea });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


// ✅ Get All Ideas (filter + search)
export const getIdeas = async (req, res) => {
    try {
        const { status, type, search } = req.query;

        let query = {};

        if (status) query.status = status;
        if (type) query.type = type;

        if (search) {
            query.title = { $regex: search, $options: "i" };
        }

        const ideas = await PostIdea.find(query).sort({ createdAt: -1 });

        res.json(ideas);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


// ✅ Get Single Idea
export const getIdeaById = async (req, res) => {
    try {
        const idea = await PostIdea.findById(req.params.id);
        res.json(idea);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


// ✅ Update Idea
export const updateIdea = async (req, res) => {
    try {
        const idea = await PostIdea.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json({ success: true, idea });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


// ✅ Delete Idea
export const deleteIdea = async (req, res) => {
    try {
        await PostIdea.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Idea deleted" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


// 🔥 Convert Idea → Post (MOST IMPORTANT)


export const convertToPost = async (req, res) => {
    try {
        const idea = await PostIdea.findById(req.params.id);

        if (!idea) {
            return res.status(404).json({ message: "Idea not found" });
        }

        const post = await Post.create({
            title: idea.title,
            description: idea.description,
            type: idea.type,
        });

        // update idea status
        idea.status = "published";
        await idea.save();

        res.json({
            success: true,
            message: "Converted to Post",
            post
        });

    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};