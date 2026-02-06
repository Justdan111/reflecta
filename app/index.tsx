import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    SecureStore.getItemAsync("token").then((token) => {
      setIsAuth(!!token);
    });
  }, []);

  // Show loading while checking auth
  if (isAuth === null) {
    return (
      <View className="flex-1 bg-[#121212] justify-center items-center">
        <ActivityIndicator size="large" color="#6D5D8B" />
      </View>
    );
  }

  // Redirect based on auth state
  if (isAuth) {
    return <Redirect href="/(tab)/home" />;
  }

  return <Redirect href="/(auth)/login" />;
}
