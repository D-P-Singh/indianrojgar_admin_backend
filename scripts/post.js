import mongoose from "mongoose";
import Category from "../models/Category.js"     // tumhare Post model ka path
import Post from "../models/PostSchema.js"// tumhare Category model ka path

// async function migratePostCategories() {
//     // Find posts jisme category abhi string hai
//     const posts = await Posts.find();
   
// //console.log(`Found ${posts.length} posts to migrate.`);
//     for (const post of posts) {
//      //   console.log(typeof(post?.category))
//     //    const cat  = new mongoose.Types.ObjectId(post.category);
//     //    console.log(cat)
//     //     post.category =cat
//     //     await post.save();
//     }
//     for (let post of posts) {
//         // console.log(`Migrating post: ${post.title} with category: ${post.category}`);
//         // String ko Category collection me search karo
//        // const cat = await Category.findOne({ _id: post.category });

//         // if (cat) {
//         //     // Agar category mil gayi to ObjectId assign karo
//         //     post.category = cat._id;
//         //     await post.save();
//         //     console.log(`Migrated: ${post.title} -> ${cat.categoryName}`);
//         // } else {
//         //     console.log(`Category not found for: ${post.category}`);
//         // }
//     }

//     console.log("Migration complete ✅");

// }


async function migratePostCategories() {
    const posts = await Post.find({ category: { $type: "string" } });
    let count = 0;
   // console.log("run",posts)
    for (const post of posts) {
        try {
            if (typeof post.category === "string") {
                await Post.updateOne(
                    { _id: post._id },
                    {
                        $set: {
                            category: new mongoose.Types.ObjectId(post.category),
                        },
                    }
                );

                count++;
                console.log(`Updated: ${post._id}`);
            }
        } catch (err) {
            console.log(`Error: ${post._id}`, err.message);
        }
    // for (const p of posts) {
    //     try {
    //         // string ko ObjectId me convert karo
    //         const catId = new mongoose.Types.ObjectId(p.category);

    //         p.category = catId;
    //         await p.save();

    //         console.log(`Migrated post ${p._id} -> category ${catId}`);
    //     } catch (err) {
    //         console.error(`Invalid ObjectId string: ${p.category}`);
    //     }
    // }
}
}

export default migratePostCategories