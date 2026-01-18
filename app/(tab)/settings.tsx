

import { View, Text, ScrollView, SafeAreaView, Pressable, Switch } from "react-native"
import { useState } from "react"
import { ChevronRight } from "react-native-feather"

export default function SettingsScreen() {
  const [biometricEnabled, setBiometricEnabled] = useState(true)
  const [reminderTime, setReminderTime] = useState("9:30 PM")

  return (
    <SafeAreaView className="flex-1 bg-[#121212]">
      <ScrollView className="flex-1 px-6 py-4">
        <Text className="text-2xl font-bold text-[#E5E5E5] mb-8">Settings</Text>

        {/* Privacy Section */}
        <Text className="text-xs uppercase text-[#9A9A9A] font-semibold mb-3">PRIVACY</Text>
        <View className="bg-[#1E1E1E] rounded-xl p-4 mb-6 border border-[#2A2A2A]">
          <Text className="text-[#C9A24D] text-xs font-bold mb-2">PRIVATE</Text>
          <Text className="text-[#E5E5E5] font-semibold mb-2">Privacy-first reflection</Text>
          <Text className="text-[#9A9A9A] text-sm mb-3 leading-5">
            Your thoughts are your own. Data is encrypted and stays on your device. We never see your reflections.
          </Text>
          <Pressable>
            <Text className="text-[#6D5D8B] text-sm font-semibold">LEARN MORE →</Text>
          </Pressable>
        </View>

        {/* Daily Rhythm Section */}
        <Text className="text-xs uppercase text-[#9A9A9A] font-semibold mb-3">DAILY RHYTHM</Text>
        <View className="bg-[#1E1E1E] rounded-xl border border-[#2A2A2A] mb-6">
          <Pressable className="flex-row justify-between items-center p-4 border-b border-[#2A2A2A]">
            <View>
              <Text className="text-[#E5E5E5] font-semibold">Daily Reminder</Text>
              <Text className="text-[#9A9A9A] text-sm">Pause and reflect</Text>
            </View>
            <Text className="text-[#C9A24D] font-semibold">{reminderTime}</Text>
          </Pressable>
          <Pressable className="flex-row justify-between items-center p-4">
            <View>
              <Text className="text-[#E5E5E5] font-semibold">Biometric Lock</Text>
              <Text className="text-[#9A9A9A] text-sm">Use FaceID to unlock</Text>
            </View>
            <Switch
              value={biometricEnabled}
              onValueChange={setBiometricEnabled}
              trackColor={{ false: "#2A2A2A", true: "#6D5D8B" }}
              thumbColor={biometricEnabled ? "#E5E5E5" : "#666666"}
            />
          </Pressable>
        </View>

        {/* Ownership Section */}
        <Text className="text-xs uppercase text-[#9A9A9A] font-semibold mb-3">OWNERSHIP</Text>
        <View className="bg-[#1E1E1E] rounded-xl border border-[#2A2A2A] mb-6">
          <Pressable className="flex-row justify-between items-center p-4 border-b border-[#2A2A2A]">
            <View>
              <Text className="text-[#E5E5E5] font-semibold">Export Data</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Text className="text-[#C9A24D] font-semibold text-sm">JSON, PDF</Text>
              <ChevronRight color="#666666"  />
            </View>
          </Pressable>
          <Pressable className="flex-row justify-between items-center p-4">
            <Text className="text-[#E5E5E5] font-semibold">Theme</Text>
            <View className="flex-row items-center gap-2">
              <Text className="text-[#9A9A9A] text-sm">Midnight</Text>
              <ChevronRight color="#666666"  />
            </View>
          </Pressable>
        </View>

        {/* Danger Zone */}
        <View className="bg-[#1E1E1E] rounded-xl border border-red-900 p-4 mb-6">
          <Pressable>
            <Text className="text-red-500 font-semibold">Clear All Reflections</Text>
          </Pressable>
        </View>

        {/* App Info */}
        <View className="items-center py-8">
          <Text className="text-[#9A9A9A] text-sm">VERSION 2.6.0 (82)</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
