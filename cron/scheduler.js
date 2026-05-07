// // cron/scheduler.js
// import cron from "node-cron";
// import Campaign from "../models/Campaign.js";
// import { sendNotification } from "../controllers/notificationController.js";

// cron.schedule("* * * * *", async () => {
//     console.log("Checking scheduled campaigns...");

//     const now = new Date();

//     const campaigns = await Campaign.find({
//         status: "draft",
//         scheduledAt: { $lte: now },
//     });

//     for (let c of campaigns) {
//         await sendNotification(c);

//         c.status = "sent";
//         await c.save();
//     }
// });
// cron/scheduler.js
import cron from "node-cron";
import Campaign from "../models/Campaign.js";
import { sendNotification } from "../controllers/notificationController.js";

cron.schedule("* * * * *", async () => {
    const now = new Date();

    const campaigns = await Campaign.find({
        status: "draft",
        scheduledAt: { $lte: now },
    });

    for (let c of campaigns) {
        await sendNotification(c);
        c.status = "sent";
        await c.save();
    }
});