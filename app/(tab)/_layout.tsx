import { Redirect, Tabs } from "expo-router"
import React, { useEffect, useState } from "react"
import { Ionicons } from "@expo/vector-icons";
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from "react-native-reanimated";
import * as SecureStore from "expo-secure-store";

export default function TabsLayout() {

  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    SecureStore.getItemAsync("token").then((token) => {
      setIsAuth(!!token);
    });
  }, []);

  if (isAuth === null) return null;

  if (!isAuth) {
    return <Redirect href="/(auth)/login" />;
  }
  
   // Animated tab icon component
  const AnimatedTabIcon: React.FC<{ name: keyof typeof Ionicons.glyphMap; color: string; size: number; focused: boolean }> = ({ name, color, size, focused }) => {
    const scale = useSharedValue(focused ? 1.2 : 1);
    React.useEffect(() => {
      scale.value = withTiming(focused ? 1.2 : 1, { duration: 300 });
    }, [focused]);
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));
    return (
      <Animated.View style={animatedStyle}>
        <Ionicons name={name} size={size} color={color} />
      </Animated.View>
    );
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#121212",
          borderTopColor: "#2A2A2A",
          height: 70,
          paddingBottom: 12,
          paddingTop: 8,
        },
        tabBarActiveTintColor: "#6D5D8B",
        tabBarInactiveTintColor: "#666666",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon name="home" color={color} size={size} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          title: "Journal",
            tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon name="book" color={color} size={size} focused={focused} />
          ),
        }}
      />
       <Tabs.Screen
            name="weekly"
            options={{
              title: "Weekly",
              href: null, // Hidden from tab bar
            }}
          />
      <Tabs.Screen
        name="insights"
        options={{
          title: "Insights",
           tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon name="trending-up" color={color} size={size} focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon name="settings" color={color} size={size} focused={focused} />
          ),
          tabBarLabel: "Settings",
        }}
      />

      
    </Tabs>
  )
}
