// services/customService.js
import axios from "axios";

export const sendCustom = async (data, config) => {
    return axios.post(config.apiUrl, data);
};