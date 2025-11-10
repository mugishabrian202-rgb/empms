import axios from "axios";

const API_BASE = (import.meta as any).env?.VITE_API_URL || "http://localhost:5000";

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
