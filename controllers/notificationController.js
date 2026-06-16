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
import axios from "axios";

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



//  cron Notification Scheduler
import Organization from "../models/Organization.js";
import { fetchSSCNotifications, fetchUPSCNotifications, fetchUPSSSCNotifications } from "../services/scraperService.js";
import { saveNewNotifications } from "../services/notificationService.js";
import Notification from "../models/Notification.js";

export const getNotifications = async (req, res) => {
  const notifications = await Notification.find().sort({ publishedAt: -1 }).limit(100).populate("organization", "name shortName");
 return res.json({notifications:notifications});
}
            
            
export const checkNotifications = async (req, res) => {
    try {

        const organizations = await Organization.find();
        for (const org of organizations) {
            if (!org.method || !org.shortName) {
                continue;
            }
            try {

                // console.log(`Checking ${org.shortName}`);

                let notifications = [];

                if (org.method === "api") {
                     notifications = await scrapeOrganizationAPI(org);
                } else {
                    notifications = await scrapeOrganizationAPI(org);
                }

                await saveNewNotifications(org._id, notifications);
return res.json({
    success: true,
    message: `Notifications checked and saved for ${org.shortName}`
});
            } catch (error) {

                console.error(
                    `${org.shortName} failed:`,
                    error.message
                );

            }
        }
        // for (const org of organizations) {
        //     console.log(`Checking notifications for ${org.method} (${org.shortName})`);
        //     if (!org.method || !org.shortName || !org.apiUrl) {
        //         continue;
        //     }
        //     //; // अगर method या apiUrl नहीं है तो स्किप करें
        //     let notifications = [];

        //     if (org.method === "api") {

        //         notifications =
        //             await scrapeOrganizationAPI(org);

        //     } else {

        //         notifications =
        //             await scrapeOrganization(
        //                 org.notificationPageLink
        //             );
        //     }
        //     //console.log(`Fetched ${notifications} notifications for ${org.shortName} (${org.method})`
        //     //);
        //     await saveNewNotifications(
        //         org._id,
        //         notifications
        //     );
        // }
        return res.json({
            success: true,
            message: "Notifications checked and saved"
        });
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            error: error.message
        }
        )
    }


};
export const scrapeOrganizationAPI = async (org) => {

    switch (org.shortName) {

        case "ssc":
            return await fetchSSCNotifications(org);

        case "rrb":
            return await fetchRRBNotifications(org);

        case "upsssc":
            return await fetchUPSSSCNotifications(org);

        case "upsc":
            return await fetchUPSCNotifications(org);

        case "nta":
            return await fetchNTANotifications();

        case "ibps":
            return await fetchIBPSNotifications();

        default:
            console.log(
                `No API handler for ${org.shortName}`
            );
            return [];
    }
};
