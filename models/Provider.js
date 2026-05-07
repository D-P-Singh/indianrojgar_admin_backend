// models/Provider.js
import mongoose from "mongoose";

const providerSchema = new mongoose.Schema({
    name: String, // onesignal, firebase, custom
    config: Object,
    enabled: Boolean,
});

export default mongoose.model("Provider", providerSchema);