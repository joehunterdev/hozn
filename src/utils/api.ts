import axios from "axios";
import { API_CONFIG } from "./config";

export const api = axios.create({
  baseURL: `${API_CONFIG.baseUrl}/auth`,
  headers: {
    "Content-Type": "application/json",
  },
});
