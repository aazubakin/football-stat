import axios from "axios";
const token = process.env.VUE_APP_API;
const baseURL = process.env.VUE_APP_URL;

export default {
  getStat(url, params) {
    const apiClient = axios.create({
      baseURL: baseURL,
      headers: {
        Accept: "application/json",
        "X-Auth-Token": token,
        "Content-Type": "application/json",
      },
    });
    return apiClient.get(url, { params: params });
  },
};
