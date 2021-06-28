import axios from "axios";

export const databaseAds = axios.create({
  baseURL: "./ads.json",
  timeout: "10000"
});

export const databaseFB = axios.create({
  baseURL: "https://ads-store-app-default-rtdb.firebaseio.com/",
  timeout: 10000
});

export const storage = axios.create({
  baseURL: "https://api.apisful.com/v1/",
  headers: {
    "X-Api-Key": process.env.VUE_APP_API_STORAGE_KEYS
  }
});

export default storage;
