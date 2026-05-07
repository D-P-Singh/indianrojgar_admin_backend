// controllers/providerController.js
import Provider from "../models/Provider.js";

export const saveProvider = async (req, res) => {
    try {
        const { name, config, enabled } = req.body;

        const provider = await Provider.findOneAndUpdate(
            { name },
            { config, enabled },
            { upsert: true, new: true }
        );

        res.json({ success: true, provider });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getProviders = async (req, res) => {
    const data = await Provider.find();
    res.json(data);
};