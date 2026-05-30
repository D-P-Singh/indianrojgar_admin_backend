import { response } from "express";
import Post from "../models/PostSchema.js";

// export const getPost = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const post = await Post.findById(id);
//         if (!post) return res.status(404).json({ message: "Post not found" });
//         res.json({ success: true, response: post });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }
//  export const createPost = async (req, res) => {
//     try {
//         const body = req.body;
//         console.log("Received POST request with body:", body);
//         const data = await Post.exists({ slug: body.slug });
//         if (data) {
//             console.log("Slug already exists:", body.slug);
//             return res.json({
//                 response: true, success: true,
//                 message: "Post slug is already taken"
//             });
//         }
//         console.log("Slug is available:", body.slug);
//         const response = await Post.create(body);
//        res.json({
//             response: response,
//             success: true,
//             message: "Post successfully created"
//         });

//     }

//     catch (error) {
//         console.log("Error checking slug availability:", error);
//         return res.json({
//             response: null,
//             success: false,
//             message: "Error checking slug availability"
//         });
//     }
// }
// export const updatePost = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const body = req.body;
//         const post = await Post.findById(id);
//         if (!post) return res.status(404).json({ message: "Post not found" });
//         const data = await Post.exists({ slug: body.slug, _id: { $ne: id } });
//         if (data) {
//             return res.json({
//                 response: true, success: true,
//                 message: "Post slug is already taken"
//             });
//         }
//         const updatedPost = await Post.findByIdAndUpdate(id, body, { new: true });
//         res.json({
//             response: updatedPost,
//             success: true,
//             message: "Post successfully updated"
//         });

//     } catch (error) {

//     }

// }

// export const getPosts = async (req, res) => {
//     try {
//         const {
//             search = "",
//             status,
//             page = 1,
//             limit = 10,
//             sortField = "createdAt",
//             sortOrder = "desc",
//         } = req.query;

//         // 🔍 Search (title)
//         const searchQuery = {
//             title: { $regex: search, $options: "i" },
//         };

//         // ✅ Filter
//         if (status && status !== "all") {
//             searchQuery.status = status;
//         }

//         // 📊 Sorting
//         const sort = {
//             [sortField]: sortOrder === "asc" ? 1 : -1,
//         };

//         // 📄 Pagination
//         const skip = (page - 1) * limit;

//         const posts = await Post.find(searchQuery)
//             .sort(sort)
//             .skip(skip)
//             .limit(Number(limit));

//         const total = await Post.countDocuments(searchQuery);

//         res.json({
//             posts,
//             total,
//             currentPage: Number(page),
//             totalPages: Math.ceil(total / limit),
//         });

//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
// export const deletePost = async (req, res) => {
//     try {
//         await Post.findByIdAndDelete(req.params.id);
//         res.json({ message: "Post deleted" });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
export const bulkDeletePosts = async (req, res) => {
    try {
        const { ids } = req.body;

        // await Post.deleteMany({
        //     _id: { $in: ids },
        // });

        res.json({ message: "Selected posts deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPost = async (req, res) => {

    try {

        const { id } = req.params;

        const post = await Post.findById(id)
            .populate(
                "createdBy",
                "name email role"
            );

        // not found

        if (!post) {

            return res.status(404).json({

                success: false,

                message: "Post not found"

            });

        }

        // editor can access only own post

        if (

            req.user.role === "editor" &&

            post.createdBy._id.toString() !==
            req.user.id

        ) {

            return res.status(403).json({

                success: false,

                message: "Access denied"

            });

        }

        return res.status(200).json({

            success: true,

            response: post

        });

    } catch (error) {

        console.log(
            "Get post error:",
            error
        );

        return res.status(500).json({

            success: false,

            message: "Server error"

        });

    }
};
export const createPost = async (req, res) => {
    // console.log(JSON.stringify(req.body.sections, null, 2));
    // return res.status(200).json({

    //     response: null,
      
    // });

    try {

        const body = req.body;

        // console.log(
        //     "Received POST request:",
        //     body
        // );

        // slug check

        const existingPost =
            await Post.findOne({
                slug: body.slug
            });

        if (existingPost) {

            return res.status(200).json({

                response: null,

                success: false,

                message: "Post slug already exists"
            });

        }

        // create post

        const response =
            await Post.create({

                ...body,

                createdBy: req.user.id

            });

        return res.status(201).json({

            response,

            success: true,

            message:
                "Post successfully created"

        });

    } catch (error) {

        console.log(
            "Create post error:",
            error
        );

        return res.status(500).json({

            response: null,
message: error,
            success: false,

            message: "Server error"

        });

    }
};
export const updatePost = async (
    req,
    res
) => {

    try {

        const { id } = req.params;

        const body = req.body;

        // find post

        const post =
            await Post.findById(id);

        if (!post) {

            return res.status(404).json({

                success: false,

                message: "Post not found"

            });

        }

        // editor can update only own post

        if (

            req.user.role === "editor" &&

            post.createdBy.toString() !==
            req.user.id

        ) {

            return res.status(403).json({

                success: false,

                message: "Access denied"

            });

        }

        // slug check

        const slugExists =
            await Post.exists({

                slug: body.slug,

                _id: { $ne: id }

            });

        if (slugExists) {

            return res.status(400).json({

                success: false,

                message:
                    "Post slug already taken"

            });

        }

        // update post

        const updatedPost =
            await Post.findByIdAndUpdate(

                id,

                body,

                {
                    new: true,
                    runValidators: true
                }

            ).populate(
                "createdBy",
                "name email role"
            );

        return res.status(200).json({

            success: true,

            response: updatedPost,

            message:
                "Post successfully updated"

        });

    } catch (error) {

        console.log(
            "Update post error:",
            error
        );

        return res.status(500).json({

            success: false,
            error: error,
            message: "Server error"

        });

    }

};
export const getPosts = async (req, res) => {
    try {
        const {
            search = "",
            status = "all",
            organization = "all",
            page = 1,
            limit = 10,
            sortField = "createdAt",
            sortOrder = "desc",
        } = req.query;

        const searchQuery = {};

        // Search
        if (search.trim()) {
            searchQuery.title = {
                $regex: search,
                $options: "i",
            };
        }

        // Organization Filter
        if (organization && organization !== "all") {
            searchQuery.organization = organization;
        }

        // Status Filter
        if (status && status !== "all") {
            searchQuery.status = status;
        }

        // Editor can only see own posts
        if (req.user.role === "editor") {
            searchQuery.createdBy = req.user.id;
        }

        // Sorting
        const sort = {
            [sortField]: sortOrder === "asc" ? 1 : -1,
        };

        // Pagination
        const skip = (Number(page) - 1) * Number(limit);

        // Posts
        const posts = await Post.find(searchQuery)
            .populate("createdBy", "name email role")
            .populate("organization", "organisationName")
            .sort(sort)
            .skip(skip)
            .limit(Number(limit));

        // Count
        const total = await Post.countDocuments(searchQuery);

        return res.status(200).json({
            success: true,
            posts,
            total,
            currentPage: Number(page),
            totalPages: Math.ceil(total / Number(limit)),
        });

    } catch (error) {
        console.log("Get posts error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
export const deletePost = async (
    req,
    res
) => {

    try {

        const { id } = req.params;

        // find post

        const post =
            await Post.findById(id);

        if (!post) {

            return res.status(404).json({

                success: false,

                message:
                    "Post not found"

            });

        }

        // delete post

        await Post.findByIdAndDelete(
            id
        );

        return res.status(200).json({

            success: true,

            message:
                "Post deleted successfully"

        });

    } catch (error) {

        console.log(
            "Delete post error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Server error"

        });

    }

};

/*  Only admin use */

// ✅ Get all pending posts
export const getPendingPosts = async (req, res) => {
    try {
        const posts = await Post.find({ status: "pending" })
            .populate("author", "name email")
            .sort({ createdAt: -1 });

        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// APPROVE POST
export const approvePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            { approvalStatus: "approved" },
            { new: true }
        );

        res.json({
            success: true,
            message: "Post approved",
            post
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// REJECT POST
export const rejectPost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            { approvalStatus: "rejected" },
            { new: true }
        );

        res.json({
            success: true,
            message: "Post rejected",
            post
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
