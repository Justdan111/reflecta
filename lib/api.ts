import axios, { AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";

// Change this to your actual backend URL
// For iOS simulator: use localhost
// For Android emulator: use 10.0.2.2
// For physical device: use your computer's local IP address
const API_URL = "http://localhost:4000/api";

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - attach token automatically
api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors globally
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ message: string }>) => {
    // Handle 401 Unauthorized - clear token and redirect to login
    if (error.response?.status === 401) {
      await SecureStore.deleteItemAsync("token");
      await SecureStore.deleteItemAsync("user");
      // You could emit an event here to trigger navigation to login
    }

    return Promise.reject(error);
  }
);

export default api;
