import axios from "axios";

export const sendOneSignal = async (data) => {
    try {
        const response = await axios.post(
            "https://onesignal.com/api/v1/notifications",
            {
                app_id: "bb3d7023-e985-4871-9a78-d3c583d8dd40",
                contents: { en: data.message },
                headings: { en: data.title },

                included_segments: ["All"],

                url: data.url || "https://yourwebsite.com",
            },
            {
                headers: {
                    Authorization: `Basic os_v2_app_xm6xai7jqvehdgty2pcyhwg5ict2ouu74gyuttv2ffj7emag2t6zeowzo5sdthwfwj7ymlujufq2yxl5luonaaacv4657vdaa3vilwa
`,
                    "Content-Type": "application/json",
                },
            }
        );
console.log("OneSignal Response:", response.data);
        return response.data;

    } catch (error) {
        console.log("OneSignal Error:", error.response?.data || error.message);
        throw new Error("OneSignal failed");
    }
};