import axios from "axios";
import { eosConfig } from "./eosConfig";

const axiosInstance = axios.create({
  baseURL: eosConfig.apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
