import axios from "axios";

const baseUrl = devMode
  ? import.meta.env.VITE_LOCALHOST_URL
  : import.meta.env.VITE_BACKEND_URL;

export default axios.create({
  baseURL: baseUrl,
});
