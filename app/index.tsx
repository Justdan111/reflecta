
import { View, Text, SafeAreaView, TextInput, Pressable, ScrollView } from "react-native"
import { useRouter } from "expo-router"
import { X } from "react-native-feather"
import { useState } from "react"

export default function DailyNoteScreen() {
  const router = useRouter()
  const [note, setNote] = useState("")

  return (
    <SafeAreaView className="flex-1 bg-[#121212]">
      <ScrollView className="flex-1 px-6 py-4">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-8">
          <Text className="text-2xl font-bold text-[#E5E5E5]">Daily Note</Text>
          <Pressable onPress={() => router.back()}>
            <X color="#6D5D8B" size={28} />
          </Pressable>
        </View>

        {/* Description */}
        <Text className="text-lg font-semibold text-[#E5E5E5] mb-2">Reflect on your day</Text>
        <Text className="text-[#9A9A9A] text-sm mb-6">Take a moment to capture what shaped your energy.</Text>

        {/* Text Input */}
        <View className="bg-[#1E1E1E] rounded-2xl p-4 border border-[#2A2A2A] mb-4">
          <TextInput
            placeholder="What influenced your mood today?"
            placeholderTextColor="#666666"
            className="text-[#E5E5E5] text-base min-h-64"
            multiline
            numberOfLines={10}
            value={note}
            onChangeText={setNote}
          />
          <View className="flex-row justify-between items-center mt-4 pt-4 border-t border-[#2A2A2A]">
            <Text className="text-[#9A9A9A] text-xs font-semibold">🔒 END-TO-END ENCRYPTED</Text>
            <Text className="text-[#9A9A9A] text-xs">{note.length}/1000</Text>
          </View>
        </View>

        {/* Save Button */}
        <Pressable
          className="bg-[#6D5D8B] rounded-xl py-3 mb-3"
          onPress={() => {
            // Save logic here
            router.back()
          }}
        >
          <Text className="text-white text-center font-semibold">Save entry ✓</Text>
        </Pressable>

        {/* Skip Button */}
        <Pressable onPress={() => router.back()}>
          <Text className="text-[#9A9A9A] text-center text-sm font-medium">Skip for now</Text>
        </Pressable>

        {/* Sync Status */}
        <View className="mt-8 items-center">
          <Text className="text-[#9A9A9A] text-xs">🌐 REFLECTA CLOUD SYNCED</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
