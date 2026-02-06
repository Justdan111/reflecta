import { View, Text, ScrollView, Pressable, SafeAreaView, ActivityIndicator } from "react-native"
import { ChevronLeft, Share2, RefreshCw } from "react-native-feather"
import { useRouter } from "expo-router"
import { useState, useEffect, useCallback } from "react"
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
import { getWeeklySummary } from "@/services/reflection"


const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

interface WeeklySummaryData {
  weeklyData?: { day: string; mood: number }[]
  dateRange?: string
  avgMood?: string
  topEmotion?: string
  reflections?: string
  streak?: string
  insight?: string
}

export default function WeeklyScreen() {
  const router = useRouter()
  const exportButtonScale = useSharedValue(1)
  const [summary, setSummary] = useState<WeeklySummaryData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchWeeklySummary = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await getWeeklySummary()
      setSummary(data)
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to load weekly summary")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchWeeklySummary()
  }, [fetchWeeklySummary])

  const handleExportPress = () => {
    exportButtonScale.value = withSequence(
      withTiming(0.97, { duration: 100 }),
      withSpring(1, { damping: 10, stiffness: 200 })
    )
  }

  const exportButtonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: exportButtonScale.value }],
  }))

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-[#121212] justify-center items-center">
        <ActivityIndicator size="large" color="#6D5D8B" />
        <Text className="text-[#9A9A9A] mt-4">Loading weekly summary...</Text>
      </SafeAreaView>
    )
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-[#121212] justify-center items-center px-6">
        <Text className="text-[#E5E5E5] text-lg mb-2">Unable to load summary</Text>
        <Text className="text-[#9A9A9A] text-center mb-6">{error}</Text>
        <Pressable 
          onPress={fetchWeeklySummary}
          className="bg-[#6D5D8B] px-6 py-3 rounded-xl flex-row items-center gap-2"
        >
          <RefreshCw color="#fff" width={18} height={18} />
          <Text className="text-white font-semibold">Retry</Text>
        </Pressable>
      </SafeAreaView>
    )
  }

  const weeklyData = summary?.weeklyData
  const hasData = weeklyData && weeklyData.length > 0

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
          <Text className="text-[#666666] text-sm mb-6">{summary?.dateRange || "This Week"}</Text>
        </Animated.View>

        {/* Mood Chart or Empty State */}
        {hasData ? (
          <MoodChart weeklyData={weeklyData} />
        ) : (
          <Animated.View 
            entering={FadeInDown.duration(600).delay(200)}
            className="bg-[#1E1E1E] rounded-2xl p-8 border border-[#2A2A2A] mb-6 items-center"
          >
            <Text className="text-5xl mb-4">📊</Text>
            <Text className="text-[#E5E5E5] text-lg font-semibold mb-2 text-center">
              No mood data yet
            </Text>
            <Text className="text-[#9A9A9A] text-sm text-center leading-6">
              Start checking in daily to see your mood trends visualized here.
            </Text>
          </Animated.View>
        )}

        {/* Stats Grid */}
        <View className="gap-3 mb-8">
          <View className="flex-row gap-3">
            <View className="flex-1">
              <StatsCard icon="😊" label="AVG MOOD" value={summary?.avgMood || "—"} />
            </View>
            <View className="flex-1">
              <StatsCard icon="🧘" label="TOP EMOTION" value={summary?.topEmotion || "—"} />
            </View>
          </View>
          <View className="flex-row gap-3">
            <View className="flex-1">
              <StatsCard icon="📝" label="REFLECTIONS" value={summary?.reflections || "0 Posts"} />
            </View>
            <View className="flex-1">
              <StatsCard icon="⚡" label="STREAK" value={summary?.streak || "0 Days"} />
            </View>
          </View>
        </View>

        {/* Insights Section */}
        <Animated.View entering={FadeInDown.duration(600).delay(300)}>
          <Text className="text-white text-xl font-bold mb-4">Insights</Text>
          <View className="bg-[#1E1E1E] rounded-2xl p-5 border border-[#2A2A2A] mb-6">
            {summary?.insight ? (
              <Text className="text-[#9A9A9A] italic text-sm leading-6">
                &quot;{summary.insight}&quot;
              </Text>
            ) : (
              <View className="items-center py-2">
                <Text className="text-[#666666] text-sm text-center leading-6">
                  Keep reflecting to unlock personalized insights about your mood patterns.
                </Text>
              </View>
            )}
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