import Notification from "../models/Notification.js";

export const saveNewNotifications = async (organizationId, items = []) => {

    console.log(
        `Saving ${items.length} notifications for organization ${organizationId}...`
    );

    try {

        const newItems = [];

        for (const item of items) {

            // Dono hi nahi hain to skip
            if (
                !item.externalId &&
                !item.notificationUrl
            ) {
                continue;
            }

            const query = {
                organization: organizationId,
            };

            if (item.externalId) {
                query.externalId = item.externalId;
            } else {
                query.notificationUrl =
                    item.notificationUrl;
            }

            const exists =
                await Notification.findOne(query);

            if (exists) {
                continue;
            }

            const notification = {
                organization: organizationId,

                title: item.title,

                publishedAt:
                    item.publishedAt || null,
            };

            // Sirf tab save karo jab value ho
            if (item.externalId) {
                notification.externalId =
                    item.externalId;
            }

            if (item.notificationUrl) {
                notification.notificationUrl =
                    item.notificationUrl;
            } else {
                // Fallback URL
                notification.notificationUrl =
                    `external-${item.externalId}`;
            }

            newItems.push(notification);
        }

        console.log(
            "New Items Count:",
            newItems.length
        );

        if (newItems.length === 0) {
            console.log(
                "No new notifications found."
            );
            return [];
        }

        const saved =
            await Notification.insertMany(
                newItems,
                { ordered: false }
            );

        console.log(
            `Saved ${saved.length} notifications`
        );

        return saved;

    } catch (err) {

        console.error(
            "❌ Error saving notifications:"
        );

        console.error(err);

        return [];
    }
};