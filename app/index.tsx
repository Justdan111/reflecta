
import { View, Text,  ScrollView, Pressable } from "react-native"
import { useRouter } from "expo-router"
import { X, HelpCircle } from "react-native-feather"
import { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"

const MOODS = [
  { id: 1, emoji: "✨", label: "Radiant", description: "Feeling energized" },
  { id: 2, emoji: "🙂", label: "Calm", description: "Peaceful and grounded" },
  { id: 3, emoji: "🤔", label: "Pensive", description: "Thoughtful mood" },
  { id: 4, emoji: "🌱", label: "Content", description: "Satisfied and ok" },
  { id: 5, emoji: "☁️", label: "Drifting", description: "Scattered focus" },
  { id: 6, emoji: "🌙", label: "Quiet", description: "Calm and subdued" },
]

export default function MoodSelectionScreen() {
  const router = useRouter()
  const [selectedMood, setSelectedMood] = useState<number | null>(null)

  return (
    <SafeAreaView className="flex-1 bg-[#121212]">
      <ScrollView className="flex-1 px-6 py-4">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-8">
          <Pressable onPress={() => router.back()}>
            <X color="#666666"  />
          </Pressable>
          <Text className="text-center flex-1 text-[#E5E5E5] font-semibold">REFLECTA</Text>
          <HelpCircle color="#666666"  />
        </View>

        {/* Title */}
        <View className="mb-8">
          <Text className="text-3xl font-bold text-[#E5E5E5] mb-2">What&apos;s your mood</Text>
          <Text className="text-3xl font-bold text-[#C9A24D] italic">right now?</Text>
        </View>

        {/* Mood Grid */}
        <View className="flex-row flex-wrap justify-between mb-8 gap-4">
          {MOODS.map((mood) => (
            <Pressable
              key={mood.id}
              onPress={() => setSelectedMood(mood.id)}
              className={`w-[48%] p-4 rounded-2xl items-center justify-center border-2 transition-all ${
                selectedMood === mood.id ? "border-[#C9A24D] bg-[#1E1E1E]" : "border-[#2A2A2A] bg-[#1E1E1E]"
              }`}
            >
              <Text className="text-5xl mb-2">{mood.emoji}</Text>
              <Text className="text-[#E5E5E5] font-semibold text-center">{mood.label}</Text>
            </Pressable>
          ))}
        </View>

        {/* Selected Mood Info */}
        {selectedMood && (
          <View className="bg-[#1E1E1E] rounded-xl p-4 border border-[#2A2A2A] mb-8">
            <Text className="text-[#9A9A9A] text-sm mb-2">
              You&apos;re feeling {MOODS.find((m) => m.id === selectedMood)?.label.toLowerCase()} today.
            </Text>
            <Text className="text-[#9A9A9A] text-sm">{MOODS.find((m) => m.id === selectedMood)?.description}</Text>
          </View>
        )}

        {/* Continue Button */}
        <Pressable
          className={`py-4 px-6 rounded-xl mb-4 ${selectedMood ? "bg-[#6D5D8B]" : "bg-[#2A2A2A]"}`}
          disabled={!selectedMood}
        >
          <Text className={`text-center font-semibold text-lg ${selectedMood ? "text-white" : "text-[#666666]"}`}>
            Continue
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  )
}
