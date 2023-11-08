import axios from "axios";
let devMode = false;
if (import.meta.env.MODE === "development") devMode = true;

const baseUrl = devMode
  ? import.meta.env.VITE_LOCALHOST_URL
  : import.meta.env.VITE_BACKEND_URL;

export default axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});
