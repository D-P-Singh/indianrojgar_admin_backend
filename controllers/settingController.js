import Settings from "../models/Settings.js";
import Category from "../models/Category.js";
export const getSettings = async (req, res) => {
    try {
        const settings = await Settings.findOne();
        res.json({success: true, settings });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
}



export const updateSettings = async (req, res) => {
    try {
        const { section, value } = req.body;

        if (!section || !value) {
            return res.status(400).json({
                success: false,
                message: "Section and value required"
            });
        }

        // Get existing settings (single document)
        let settings = await Settings.findOne();

        // Agar settings exist nahi karti
        if (!settings) {
            settings = new Settings({});
        }

        // Dynamic update
        settings[section] = {
            ...settings[section],
            ...value
        };

        await settings.save();

        return res.json({
            success: true,
            message: `${section} updated successfully`,
            settings
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

export const deleteSettings = async (req, res) => {
    try {
        //  await Settings.deleteMany({});
        res.json({ success: true, message: "All settings deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

// category

// ✅ Create Category
export const createCategory = async (req, res) => {
//
   // await Category.collection.dropIndex("name_1");

    try {
        const { categoryName, slug, description, seoTitle, seoDescription, seoKeywords } = await req.body;
        console.log("Received category data:", req.body);
     
         console.log("Generated slug:", slug);
        if (!categoryName || !slug || !description || !seoTitle || !seoDescription || !seoKeywords) {
            return res.status(400).json({ success: false,    message: "Category All fields are required" });
        }
        const category = new Category({
            categoryName: categoryName.trim(),
            slug,
            description,
            seoTitle,
            seoDescription,
            seoKeywords,
        });

        const savedCategory = await category.save();
        res.status(201).json({ success: true, category: savedCategory });
    } catch (error) {
            console.error("Error creating category:", error);
        res.status(400).json({ success: false, message: error.message });
    }
};

// ✅ Get All Categories
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ categoryName: 1 });
        res.status(200).json({ success: true, categories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Get Single Category by Slug
export const getCategoryBySlug = async (req, res) => {
    try {
        const category = await Category.findOne({ slug: req.params.slug });
        if (!category) return res.status(404).json({ success: false, message: "Category not found" });
        res.status(200).json({ success: true, category });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Update Category
export const updateCategory = async (req, res) => {
    try {
        const updatedCategory = await Category.findOneAndUpdate(
            { slug: req.params.slug },
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedCategory) return res.status(404).json({ success: false, message: "Category not found" });
        res.status(200).json({ success: true, category: updatedCategory });
    } catch (error) {
        res.status(400).json({ success: false,   message: error.message });
    }
};

// ✅ Delete Category
export const deleteCategory = async (req, res) => {
    try {
       // const deletedCategory = await Category.findOneAndDelete({ slug: req.params.slug });

      //  if (!deletedCategory) return res.status(404).json({ success: false, message: "Category not found" });
        res.status(200).json({ success: true, message: "Category is not deleted " });
    } catch (error) {
        res.status(500).json({ success: false,   message: error.message });
    }
};
