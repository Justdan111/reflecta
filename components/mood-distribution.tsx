
import { View, Text, Pressable } from "react-native"
import Animated, {
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withDelay,
} from "react-native-reanimated"
import { useEffect } from "react"

interface Mood {
  day: string
  value: number
  color: string
}

interface MoodDistributionProps {
  moods?: Mood[]
  onExplore?: () => void
}

export function MoodDistribution({ moods, onExplore }: MoodDistributionProps) {
  const MOODS = moods || [
    { day: "Mon", value: 65, color: "#6D5D8B" },
    { day: "Tue", value: 80, color: "#6D5D8B" },
    { day: "Wed", value: 50, color: "#6D5D8B" },
    { day: "Thu", value: 70, color: "#6D5D8B" },
    { day: "Fri", value: 45, color: "#C9A24D" },
    { day: "Sat", value: 90, color: "#6D5D8B" },
    { day: "Sun", value: 85, color: "#6D5D8B" },
  ]

  const maxValue = Math.max(...MOODS.map(m => m.value))

  return (
    <View className="bg-[#1E1E1E] rounded-2xl p-6 border border-[#2A2A2A]">
      {/* Chart */}
      <View className="h-64 mb-8 flex-row items-end justify-between gap-2">
        {MOODS.map((mood, index) => {
          const heightPercentage = (mood.value / maxValue) * 100
          return (
            <MoodBar 
              key={mood.day} 
              mood={mood} 
              heightPercentage={heightPercentage} 
              index={index}
            />
          )
        })}
      </View>

      {/* Title and Description */}
      <View className="mb-6">
        <View className="flex-row items-center mb-3">
          <Text className="text-2xl mr-2">📅</Text>
          <Text className="text-[#E5E5E5] text-lg font-semibold">
            Your mood is lowest on Mondays
          </Text>
        </View>
        <Text className="text-[#9A9A9A] text-sm leading-6">
          Based on your entries from the last 30 days. You tend to feel more drained following Sunday evenings.
        </Text>
      </View>

      {/* Explore Button */}
      <Pressable 
        onPress={onExplore}
        className="bg-[#6D5D8B] py-4 rounded-2xl active:opacity-80"
      >
        <Text className="text-white text-center font-semibold text-base">
          Explore Pattern
        </Text>
      </Pressable>
    </View>
  )
}

interface MoodBarProps {
  mood: Mood
  heightPercentage: number
  index: number
}

function MoodBar({ mood, heightPercentage, index }: MoodBarProps) {
  const height = useSharedValue(0)

  useEffect(() => {
    height.value = withDelay(
      index * 100,
      withSpring(heightPercentage, {
        damping: 15,
        stiffness: 100,
      })
    )
  }, [heightPercentage, index])

  const animatedStyle = useAnimatedStyle(() => ({
    height: `${height.value}%`,
  }))

  return (
    <Animated.View 
      entering={FadeInUp.duration(500).delay(index * 80)}
      className="flex-1 items-center justify-end"
    >
      <Animated.View 
        style={[animatedStyle, { backgroundColor: mood.color }]} 
        className="w-full rounded-lg min-h-[20px]" 
      />
    </Animated.View>
  )
}