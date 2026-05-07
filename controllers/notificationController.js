// // controllers/notificationController.js
// import Campaign from "../models/Campaign.js";
// import Provider from "../models/Provider.js";

// import { sendOneSignal } from "../services/onesignalService.js";
// import { sendFirebase } from "../services/firebaseService.js";
// import { sendCustom } from "../services/customService.js";

// export const createCampaign = async (req, res) => {
//     try {
//         const data = req.body;

//         const campaign = await Campaign.create(data);

//         // अगर तुरंत भेजना है
//         if (data.scheduleType === "now") {
//             await sendNotification(data);
//             campaign.status = "sent";
//             await campaign.save();
//         }

//         res.json({ success: true, campaign });

//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// export  const sendNotification = async (data) => {
//     const provider = await Provider.findOne({ name: data.provider });

//     if (!provider || !provider.enabled) {
//         throw new Error("Provider not enabled");
//     }

//     switch (data.provider) {
//         case "onesignal":
//             return sendOneSignal(data, provider.config);

//         case "firebase":
//             return sendFirebase(data, provider.config);

//         case "custom":
//             return sendCustom(data, provider.config);

//         default:
//             throw new Error("Invalid provider");
//     }
// };
// controllers/notificationController.js
import Campaign from "../models/Campaign.js";
import Provider from "../models/Provider.js";
import Analytics from "../models/Analytics.js";

import { sendOneSignal } from "../services/onesignalService.js";
import { sendFirebase } from "../services/firebaseService.js";
import { sendCustom } from "../services/customService.js";

export const sendNotification = async (data) => {
    const provider = await Provider.findOne({ name: data.provider });

    // if (!provider || !provider.enabled) {
    //     throw new Error("Provider not enabled");
    // } else if (!provider) {
    //     throw new Error("Provider not found");
    // } else if (!provider.enabled) {
    //     throw new Error("Provider is disabled");
    // }
    // पहले यह जांचें कि प्रोवाइडर मौजूद है या नहीं

    let response;

    switch (data.provider) {
        case "onesignal":
            response = await sendOneSignal(data);
            break;
        case "firebase":
            response = await sendFirebase(data, provider.config);
            break;
        case "custom":
            response = await sendCustom(data, provider.config);
            break;
    }

    await Analytics.create({
        campaignId: data._id,
        sent: 1,
        clicks: 0,
        opened: 0,
    });

    return response;
};

export const createCampaign = async (req, res) => {
    try {
        const data = req.body;

        const campaign = await Campaign.create(data);

        if (data.scheduleType === "now") {
            await sendNotification(campaign);
            campaign.status = "sent";
            await campaign.save();
        }

        res.json({ success: true, campaign });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getCampaigns = async (req, res) => {
    const data = await Campaign.find().sort({ createdAt: -1 });
    res.json(data);
};