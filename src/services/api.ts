import axios from "axios";

const api = axios.create({
  baseURL: "https://nodedeploy.rcout1nho.dev",
});

export default api;
