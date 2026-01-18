import { View, Text, ScrollView, SafeAreaView, Pressable } from "react-native"
import { ChevronLeft, Share2 } from "react-native-feather"
import { useRouter } from "expo-router"
import { StatsCard } from "@/components/stats-card"
import { MoodChart } from "@/components/mood-chart"
import Animated, {
  FadeIn,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated"

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const WEEKLY_DATA = [
  { day: "MON", mood: 2.5 },
  { day: "TUE", mood: 3.2 },
  { day: "WED", mood: 3.8 },
  { day: "THU", mood: 3.5 },
  { day: "FRI", mood: 2.8 },
  { day: "SAT", mood: 3.0 },
  { day: "SUN", mood: 4.5 },
]

export default function WeeklyScreen() {
  const router = useRouter()
  const exportButtonScale = useSharedValue(1)

  const handleExportPress = () => {
    exportButtonScale.value = withSequence(
      withTiming(0.97, { duration: 100 }),
      withSpring(1, { damping: 10, stiffness: 200 })
    )
  }

  const exportButtonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: exportButtonScale.value }],
  }))

  return (
    <SafeAreaView className="flex-1 bg-[#121212]">
      <ScrollView className="flex-1 px-6 py-4">
        {/* Header */}
        <Animated.View 
          entering={FadeIn.duration(600)}
          className="flex-row justify-between items-center mb-6"
        >
          <Pressable onPress={() => router.back()}>
            <ChevronLeft color="#E5E5E5"  />
          </Pressable>
          <Text className="text-[#9A9A9A] text-lg font-semibold tracking-widest">
            REFLECTA
          </Text>
          <Pressable>
            <Share2 color="#E5E5E5" />
          </Pressable>
        </Animated.View>

        {/* Title */}
        <Animated.View entering={FadeInDown.duration(600).delay(100)}>
          <Text className="text-white text-3xl font-bold mb-2">
            Your week at a glance
          </Text>
          <Text className="text-[#666666] text-sm mb-6">Feb 12 — Feb 18</Text>
        </Animated.View>

        {/* Mood Chart */}
        <MoodChart weeklyData={WEEKLY_DATA} />

        {/* Stats Grid */}
        <View className="gap-3 mb-8">
          <View className="flex-row gap-3">
            <View className="flex-1">
              <StatsCard icon="😊" label="AVG MOOD" value="Positive" />
            </View>
            <View className="flex-1">
              <StatsCard icon="🧘" label="TOP EMOTION" value="Calm" />
            </View>
          </View>
          <View className="flex-row gap-3">
            <View className="flex-1">
              <StatsCard icon="📝" label="REFLECTIONS" value="14 Posts" />
            </View>
            <View className="flex-1">
              <StatsCard icon="⚡" label="STREAK" value="8 Days" />
            </View>
          </View>
        </View>

        {/* Insights Section */}
        <Animated.View entering={FadeInDown.duration(600).delay(300)}>
          <Text className="text-white text-xl font-bold mb-4">Insights</Text>
          <View className="bg-[#1E1E1E] rounded-2xl p-5 border border-[#2A2A2A] mb-6">
            <Text className="text-[#9A9A9A] italic text-sm leading-6">
              &quot;You felt more creative mid-week, often associated with your morning journaling habit. Notice how your calm
              state on Sunday correlates with your digital detox.&quot;
            </Text>
          </View>
        </Animated.View>

        {/* Export Button */}
        <AnimatedPressable 
          entering={FadeInDown.duration(600).delay(400)}
          style={exportButtonAnimatedStyle}
          onPress={handleExportPress}
          className="bg-[#6D5D8B] rounded-2xl py-4 mb-4"
        >
          <View className="flex-row items-center justify-center gap-2">
            <Text className="text-white font-semibold text-base">📄 Export PDF Journal</Text>
          </View>
        </AnimatedPressable>

        <Animated.Text 
          entering={FadeIn.duration(600).delay(500)}
          className="text-[#666666] text-xs text-center mb-8 tracking-wider"
        >
          END-TO-END ENCRYPTED DATA
        </Animated.Text>

        {/* Bottom Spacer for Tab Bar */}
        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  )
}