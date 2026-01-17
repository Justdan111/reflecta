
import { View, Text, ScrollView, Pressable, } from "react-native"
import { useRouter } from "expo-router"
import { useState } from "react"
import { Book, Bookmark, BookOpen, LogOut, Settings as SettingsIcon } from "react-native-feather"
import { SafeAreaView } from "react-native-safe-area-context"

const MOODS = [
  { id: 1, emoji: "😔", label: "Sad", color: "#6D5D8B" },
  { id: 2, emoji: "😕", label: "Pensive", color: "#6D5D8B" },
  { id: 3, emoji: "😐", label: "Neutral", color: "#6D5D8B" },
  { id: 4, emoji: "🙂", label: "Calm", color: "#C9A24D" },
  { id: 5, emoji: "✨", label: "Radiant", color: "#C9A24D" },
]

export default function HomeScreen() {
  const router = useRouter()
  const [selectedMood, setSelectedMood] = useState<number | null>(null)

  return (
    <SafeAreaView className="flex-1 bg-[#121212]">
      <ScrollView className="flex-1 px-6 py-4 ">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-8">
          <Pressable onPress={() => router.push("/settings")}>
            <SettingsIcon color="#6D5D8B"  />
          </Pressable>
           <Text className="text-2xl font-bold text-[#E5E5E5]">Reflecta</Text>
            <Pressable onPress={() => router.push("/journal")}>
            <Bookmark color="#6D5D8B"  />
            </Pressable>
        </View>


      <View className="justify-between flex-1 gap-8 mt-8">
        {/* Daily Check-in Card */}
        <View className=" mb-8">
          
          <View className="mb-4 flex justify-center items-center text-center flex-1">
          <Text className="text-4xl font-semibold text-[#E5E5E5] mb-2 text-center">How are you feeling today?</Text>
          <Text className="text-xl text-[#9A9A9A] mb-6 text-center">Take a moment to breathe and check in with yourself.</Text>
        </View>

          {/* Mood Selection */}
          <View className="flex-row justify-between mb-6 bg-[#1E1E1E] p-4 rounded-3xl border border-[#2A2A2A]">
            {MOODS.map((mood) => (
              <Pressable
                key={mood.id}
                onPress={() => setSelectedMood(mood.id)}
                className={`w-14 h-14 rounded-full justify-center items-center transition-all ${
                  selectedMood === mood.id ? "bg-[#6D5D8B] border-2 border-[#C9A24D]" : "bg-[#2A2A2A]"
                }`}
              >
                <Text className="text-4xl">{mood.emoji}</Text>
              </Pressable>
            ))}
          </View>

          {selectedMood && (
            <Text className="text-lg text-[#9A9A9A] mb-4">
              You&apos;re feeling {MOODS.find((m) => m.id === selectedMood)?.label.toLowerCase()} today.
            </Text>
          )}

          {/* Check-in Button */}
          <Pressable
            onPress={() => {
              if (selectedMood) {
                router.push("/journal")
              }
            }}
            className={`py-3 px-6 rounded-xl transition-all ${selectedMood ? "bg-[#6D5D8B]" : "bg-[#2A2A2A]"}`}
            disabled={!selectedMood}
          >
            <Text className={`text-center font-semibold ${selectedMood ? "text-white" : "text-[#666666]"}`}>
              Check In
            </Text>
          </Pressable>
        </View>

        {/* Quick Stats */}
        <View>
        <Text className="text-lg font-semibold text-[#E5E5E5] mb-4">This Week</Text>
        <View className="gap-3 mb-6">
          <Pressable
            onPress={() => router.push("/weekly")}
            className="bg-[#1E1E1E] rounded-xl p-4 border border-[#2A2A2A] flex-row justify-between items-center active:opacity-70"
          >
            <Text className="text-[#9A9A9A]">View Weekly Summary</Text>
            <Text className="text-[#C9A24D] font-semibold">→</Text>
          </Pressable>
          <View className="bg-[#1E1E1E] rounded-xl p-4 border border-[#2A2A2A] flex-row justify-between items-center">
            <Text className="text-[#9A9A9A]">Reflections</Text>
            <Text className="text-2xl font-bold text-[#E5E5E5]">14</Text>
          </View>
          <View className="bg-[#1E1E1E] rounded-xl p-4 border border-[#2A2A2A] flex-row justify-between items-center">
            <Text className="text-[#9A9A9A]">Streak</Text>
            <Text className="text-2xl font-bold text-[#C9A24D]">8 Days</Text>
          </View>
          </View>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}
