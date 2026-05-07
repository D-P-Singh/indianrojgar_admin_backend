import Settings from "../models/Settings.js";

export const getSettings = async (req, res) => {
    try {
        const settings = await Settings.findOne();
        res.json({ settings });
    } catch (err) {
        res.status(500).json({ error: err.message });
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