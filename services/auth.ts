import api from "@/lib/api";
import * as SecureStore from "expo-secure-store";

export async function login(email: string, password: string) {
  const res = await api.post("/auth/login", { email, password });

  const { token, user } = res.data;

  await SecureStore.setItemAsync("token", token);
  await SecureStore.setItemAsync("user", JSON.stringify(user));

  return user;
}

export async function register(
  name: string,
  email: string,
  password: string
) {
  const res = await api.post("/auth/register", {
    name,
    email,
    password,
  });

  return res.data;
}

export async function logout() {
  await SecureStore.deleteItemAsync("token");
  await SecureStore.deleteItemAsync("user");
}
