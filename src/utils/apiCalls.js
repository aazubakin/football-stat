import axios from "axios";

export default {
  getStat(url, token) {
    const apiClient = axios.create({
      baseURL: "http://api.football-data.org/v2/",
      headers: {
        Accept: "application/json",
        "X-Auth-Token": token,
        "Content-Type": "application/json",
      },
    });
    return apiClient.get(url);
  },
};
