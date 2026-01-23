import { View, Text, ScrollView, Pressable, SafeAreaView } from "react-native"
import { useRouter } from "expo-router"
import { useState } from "react"
import { Bookmark, Settings as SettingsIcon } from "react-native-feather"
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
  withTiming,
  SharedValue,
} from "react-native-reanimated"

const MOODS = [
  { id: 1, emoji: "😔", label: "Sad", color: "#6D5D8B" },
  { id: 2, emoji: "😕", label: "Pensive", color: "#6D5D8B" },
  { id: 3, emoji: "😐", label: "Neutral", color: "#6D5D8B" },
  { id: 4, emoji: "🙂", label: "Calm", color: "#C9A24D" },
  { id: 5, emoji: "✨", label: "Radiant", color: "#C9A24D" },
]

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export default function HomeScreen() {
  const router = useRouter()
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  
  const buttonScale = useSharedValue(1)
  const moodScales = MOODS.map(() => useSharedValue(1))

  const handleMoodPress = (index: number, moodId: number) => {
    setSelectedMood(moodId)
    
    moodScales[index].value = withSequence(
      withTiming(0.85, { duration: 100 }),
      withSpring(1, { damping: 8, stiffness: 200 })
    )
  }

  const handleCheckInPress = () => {
    if (selectedMood) {
      buttonScale.value = withSequence(
        withTiming(0.95, { duration: 100 }),
        withTiming(1, { duration: 100 })
      )
      setTimeout(() => router.push("/journal"), 200)
    }
  }

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }))

  // Create animated styles for each mood at the top level
  const moodAnimatedStyles = [
    useAnimatedStyle(() => ({ transform: [{ scale: moodScales[0].value }] })),
    useAnimatedStyle(() => ({ transform: [{ scale: moodScales[1].value }] })),
    useAnimatedStyle(() => ({ transform: [{ scale: moodScales[2].value }] })),
    useAnimatedStyle(() => ({ transform: [{ scale: moodScales[3].value }] })),
    useAnimatedStyle(() => ({ transform: [{ scale: moodScales[4].value }] })),
  ]

  return (
    <SafeAreaView className="flex-1 bg-[#121212]">
      <ScrollView className="flex-1 px-6 py-4">
        {/* Header */}
        <Animated.View 
          entering={FadeIn.duration(600)}
          className="flex-row justify-between items-center mb-8"
        >
          <Pressable onPress={() => router.push("/settings")}>
            <SettingsIcon color="#E5E5E5" />
          </Pressable>
          <Text className="text-2xl font-bold text-[#E5E5E5]">Reflecta</Text>
          <Pressable onPress={() => router.push("/journal")}>
            <Bookmark color="#E5E5E5" />
          </Pressable>
        </Animated.View>

        <View className="justify-between flex-1 gap-8 mt-8">
          {/* Daily Check-in Card */}
          <Animated.View 
            entering={FadeInUp.duration(600).delay(100)}
            className="mb-8"
          >
            <View className="mb-4 flex justify-center items-center text-center flex-1">
              <Text className="text-4xl font-semibold text-[#E5E5E5] mb-2 text-center">
                How are you feeling today?
              </Text>
              <Text className="text-xl text-[#9A9A9A] mb-6 text-center">
                Take a moment to breathe and check in with yourself.
              </Text>
            </View>

            {/* Mood Selection */}
            <View className="flex-row justify-between mb-6 bg-[#1E1E1E] p-4 rounded-3xl border border-[#2A2A2A]">
              {MOODS.map((mood, index) => (
                <AnimatedPressable
                  key={mood.id}
                  entering={FadeIn.duration(400).delay(200 + index * 100)}
                  style={moodAnimatedStyles[index]}
                  onPress={() => handleMoodPress(index, mood.id)}
                  className={`w-14 h-14 rounded-full justify-center items-center ${
                    selectedMood === mood.id ? "bg-[#6D5D8B] border-2 border-[#C9A24D]" : "bg-[#2A2A2A]"
                  }`}
                >
                  <Text className="text-4xl">{mood.emoji}</Text>
                </AnimatedPressable>
              ))}
            </View>

            {selectedMood && (
              <Animated.View entering={FadeInDown.duration(400)}>
                <Text className="text-lg text-[#9A9A9A] mb-4">
                  You&apos;re feeling {MOODS.find((m) => m.id === selectedMood)?.label.toLowerCase()} today.
                </Text>
              </Animated.View>
            )}

            {/* Check-in Button */}
            <AnimatedPressable
              style={buttonAnimatedStyle}
              onPress={handleCheckInPress}
              className={`py-3 px-6 rounded-xl ${selectedMood ? "bg-[#6D5D8B]" : "bg-[#2A2A2A]"}`}
              disabled={!selectedMood}
            >
              <Text className={`text-center font-semibold ${selectedMood ? "text-white" : "text-[#666666]"}`}>
                Check In
              </Text>
            </AnimatedPressable>
          </Animated.View>

          {/* Quick Stats */}
          <Animated.View entering={FadeInUp.duration(600).delay(400)}>
            <Text className="text-lg font-semibold text-[#E5E5E5] mb-4">This Week</Text>
            <View className="gap-3 mb-6">
              <Animated.View entering={FadeInUp.duration(500).delay(500)}>
                <Pressable
                  onPress={() => router.push("/weekly")}
                  className="bg-[#1E1E1E] rounded-xl p-4 border border-[#2A2A2A] flex-row justify-between items-center active:opacity-70"
                >
                  <Text className="text-[#9A9A9A]">View Weekly Summary</Text>
                  <Text className="text-[#C9A24D] font-semibold">→</Text>
                </Pressable>
              </Animated.View>
              
              <Animated.View 
                entering={FadeInUp.duration(500).delay(600)}
                className="bg-[#1E1E1E] rounded-xl p-4 border border-[#2A2A2A] flex-row justify-between items-center"
              >
                <Text className="text-[#9A9A9A]">Reflections</Text>
                <Text className="text-2xl font-bold text-[#E5E5E5]">14</Text>
              </Animated.View>
              
              <Animated.View 
                entering={FadeInUp.duration(500).delay(700)}
                className="bg-[#1E1E1E] rounded-xl p-4 border border-[#2A2A2A] flex-row justify-between items-center"
              >
                <Text className="text-[#9A9A9A]">Streak</Text>
                <Text className="text-2xl font-bold text-[#C9A24D]">8 Days</Text>
              </Animated.View>
            </View>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}