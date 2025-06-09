import axios from "axios";

const apiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000",
  timeout: 5000,
});

export default apiInstance;
