import axios from "axios";
import * as cheerio from "cheerio";

export const fetchSSCNotifications = async (org) => {
    //console.log("Fetching SSC notifications from API...");
    const url =
        "https://ssc.gov.in/api/general-website/portal/records?page=1&limit=10&contentType=notice-boards&key=createdAt&order=DESC&pageType=filter&isAttachment=true&attributes=id,headline,redirectUrl,createdAt";

    const { data } = await axios.get(url);
    //console.log(`Fetched ${data.data.length} notifications from SSC API.`);
    return data.data.map(item => ({
        externalId: item.id,
        title: item.headline,
        notificationUrl: item.redirectUrl,
        publishedAt: item.createdAt
    }));
};


export const fetchUPSCNotifications = async (org) => {
    try {
        console.log("Fetching UPSC notifications from API...");

        const { data } = await axios.post(
            "https://upsconline.nic.in/ngrp_api/exam/V1/examList/get"
        );

        if (!data?.response?.examList) {
            console.log("No exam list found");
            return [];
        }

        return data.response.examList.map((item) => ({
            externalId: item._id,
            title: item.exam_name,
            notificationUrl: `https://upsconline.nic.in/exam/${item._id}`,
            publishedAt: item.notice_date
                ? new Date(item.notice_date)
                : new Date(),
        }));
    } catch (error) {
        console.error("UPSC Scraper Error:", error.message);
        return [];
    }
};

export const fetchRajasthanPublicServiceCommissionNotifications = async (org) => {
    //console.log("Fetching Rajasthan Public Service Commission notifications from API...");
    const url =
        "https://rpsc.rajasthan.gov.in/notification/getNotificationList";
}
export const fetchRajasthanHighCourtNotifications = async (org) => {
    //console.log("Fetching Rajasthan High Court notifications from API...");
    const url =
        "https://hcraj.nic.in/hcraj/notification/getNotificationList";
}
export const fetchRSMSSBNotifications = async (org) => {
    //console.log("Fetching RSMSSB notifications from API...");
    const url =
        "https://rsmssb.rajasthan.gov.in/notification/getNotificationList";


}

// UPSSSC के लिए अलग से स्क्रैपर क्योंकि उनकी वेबसाइट पर API नहीं है
export const fetchUPSSSCNotifications = async (org) => {
    try {
        console.log("Fetching UPSSSC notifications by scraping...");
        const url =
            "https://upsssc.gov.in/News.aspx?id=1";

        const { data } = await axios.get(url);

        const $ = cheerio.load(data);

        const notifications = [];

        $("a").each((i, el) => {

            const href = $(el).attr("href");
            const title = $(el).text().trim();

            if (
                href &&
                href.toLowerCase().includes(".pdf")
            ) {

                const pdfUrl =
                    new URL(
                        href,
                        "https://upsssc.gov.in"
                    ).href;

                notifications.push({
                    externalId: pdfUrl,
                    notificationUrl: pdfUrl,
                    title,
                    publishedAt: new Date(),
                });
            }
        });

        return notifications;

    } catch (error) {

        console.error(
            "UPSSSC Scraper Error:",
            error.message
        );

        return [];
    }
};











// import axios from "axios";
// import * as cheerio from "cheerio";

// export const scrapeOrganizationSSC = async (url) => {
//     try {
//         const { data } = await axios.get(url, {
//             timeout: 20000,
//             headers: {
//                 "User-Agent": "Mozilla/5.0"
//             }
//         });

//         const $ = cheerio.load(data);

//         const itemsMap = new Map(); // 🔥 auto unique

//         // =========================
//         // 1. <a> TAG SCRAPING
//         // =========================
//         $("a").each((_, el) => {
//             let href = $(el).attr("href");
//             let title = $(el).text()?.trim();

//             extractLink(href, title, url, itemsMap);
//         });

//         // =========================
//         // 2. BUTTON / DIV LINKS
//         // =========================
//         $("button, div").each((_, el) => {
//             let text = $(el).text()?.trim();

//             let onclick = $(el).attr("onclick");

//             if (onclick) {
//                 const match = onclick.match(/https?:\/\/[^\s'"]+\.pdf/);
//                 if (match) {
//                     extractLink(match[0], text, url, itemsMap);
//                 }
//             }
//         });

//         // =========================
//         // 3. INPUT LINKS (rare govt sites)
//         // =========================
//         $("input").each((_, el) => {
//             let value = $(el).attr("value");
//             let dataLink = $(el).attr("data-link");

//             if (dataLink?.includes(".pdf")) {
//                 extractLink(dataLink, value, url, itemsMap);
//             }
//         });

//         return Array.from(itemsMap.values());

//     } catch (err) {
//         console.error("❌ Scraper error:", err.message);
//         return [];
//     }
// };


// // =========================
// // HELPER FUNCTION (CORE)
// // =========================
// function extractLink(href, title, baseUrl, map) {

//     if (!href) return;

//     // skip junk
//     if (
//         href === "#" ||
//         href.startsWith("javascript") ||
//         href.startsWith("mailto")
//     ) return;

//     // absolute URL fix
//     if (href.startsWith("/")) {
//         const base = new URL(baseUrl).origin;
//         href = base + href;
//     }

//     // only PDFs
//     if (!href.includes(".pdf")) return;

//     // fallback title logic
//     let cleanTitle =
//         title ||
//         href.split("/").pop().replace(".pdf", "") ||
//         "PDF Notification";

//     cleanTitle = cleanTitle.replace(/\s+/g, " ").trim();

//     // unique key
//     map.set(href, {
//         url: href,
//         title: cleanTitle
//     });
// }