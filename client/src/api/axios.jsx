import axios from "axios";

//TODO: move baseURL to env

export default axios.create({
  baseURL: "http://localhost:8000",
});
