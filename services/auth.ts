import api from "@/lib/api";
import * as SecureStore from "expo-secure-store";

// Types
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export async function login(email: string, password: string): Promise<User> {
  const res = await api.post<AuthResponse>("/auth/login", { email, password });

  const { token, user } = res.data;

  await SecureStore.setItemAsync("token", token);
  await SecureStore.setItemAsync("user", JSON.stringify(user));

  return user;
}

export async function register(
  name: string,
  email: string,
  password: string
): Promise<User> {
  const res = await api.post<AuthResponse>("/auth/register", {
    name,
    email,
    password,
  });

  const { token, user } = res.data;

  // Store token and user after successful registration
  await SecureStore.setItemAsync("token", token);
  await SecureStore.setItemAsync("user", JSON.stringify(user));

  return user;
}

export async function getProfile(): Promise<User> {
  const res = await api.get<User>("/auth/profile");
  return res.data;
}

export async function logout(): Promise<void> {
  await SecureStore.deleteItemAsync("token");
  await SecureStore.deleteItemAsync("user");
}

export async function getStoredUser(): Promise<User | null> {
  const userJson = await SecureStore.getItemAsync("user");
  return userJson ? JSON.parse(userJson) : null;
}

export async function isAuthenticated(): Promise<boolean> {
  const token = await SecureStore.getItemAsync("token");
  return !!token;
}
