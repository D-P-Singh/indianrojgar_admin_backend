import axios from "axios";

export const sendTelegramAlert = async (text) => {
    try {
        await axios.post(
            `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
            {
                chat_id: process.env.TELEGRAM_CHAT_ID,
                text,
            }
        );
    } catch (err) {
        console.error("Telegram Error:", err.message);
    }
};