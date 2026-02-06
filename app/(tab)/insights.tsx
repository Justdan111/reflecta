
import { View, Text, ScrollView, Pressable, SafeAreaView, ActivityIndicator } from "react-native"
import { useRouter } from "expo-router"
import { useState, useEffect, useCallback } from "react"

import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeInRight,
  ZoomIn,
  SlideInRight,
} from "react-native-reanimated"
import { MoodDistribution } from "@/components/mood-distribution"
import { StatCard } from "@/components/stat-card"
import { ChevronLeft, RefreshCw } from "react-native-feather"
import { getInsights } from "@/services/reflection"

interface InsightsData {
  moodDistribution?: { day: string; value: number; color: string }[]
  moodUplift?: {
    value: string
    title: string
    description: string
  }
  aiInsight?: string
}

export default function InsightsScreen() {
  const router = useRouter()
  const [insights, setInsights] = useState<InsightsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchInsights = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await getInsights()
      setInsights(data)
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to load insights")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchInsights()
  }, [fetchInsights])

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-[#121212] justify-center items-center">
        <ActivityIndicator size="large" color="#6D5D8B" />
        <Text className="text-[#9A9A9A] mt-4">Loading insights...</Text>
      </SafeAreaView>
    )
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-[#121212] justify-center items-center px-6">
        <Text className="text-[#E5E5E5] text-lg mb-2">Unable to load insights</Text>
        <Text className="text-[#9A9A9A] text-center mb-6">{error}</Text>
        <Pressable 
          onPress={fetchInsights}
          className="bg-[#6D5D8B] px-6 py-3 rounded-xl flex-row items-center gap-2"
        >
          <RefreshCw color="#fff" width={18} height={18} />
          <Text className="text-white font-semibold">Retry</Text>
        </Pressable>
      </SafeAreaView>
    )
  }

  const hasMoodData = insights?.moodDistribution && insights.moodDistribution.length > 0
  const hasMoodUplift = insights?.moodUplift?.title

  return (
    <SafeAreaView className="flex-1 bg-[#121212]">
      <ScrollView className="flex-1 px-6 py-4 gap-4">
        <Animated.View 
          entering={FadeIn.duration(600)}
          className="flex-row items-center mb-6 relative"
        >
          <Pressable 
            onPress={() => router.back()} 
            className="absolute left-0"
            style={{ zIndex: 1 }}
          >
            <ChevronLeft color="#E5E5E5" />
          </Pressable>
          <Text className="flex-1 text-center text-[#9A9A9A] text-lg font-semibold tracking-widest">
            REFLECTA
          </Text>
        </Animated.View>

        {/* Mood Distribution */}
        <View className="mt-2 mb-6">
        <Animated.Text 
          entering={SlideInRight.duration(600).delay(200)}
          className="text-xl font-semibold text-[#E5E5E5] mb-2 "
        >
          Weekly Rhythm
        </Animated.Text>
        <Animated.Text 
          entering={SlideInRight.duration(600).delay(200)}
          className="  text-[#9A9A9A] mb-4"
        >
          MOOD DISTRIBUTION
        </Animated.Text>
        
        <Animated.View entering={FadeInDown.duration(700).delay(300)}>
          {hasMoodData ? (
            <MoodDistribution moods={insights?.moodDistribution} />
          ) : (
            <View className="bg-[#1E1E1E] rounded-2xl p-8 border border-[#2A2A2A] items-center">
              <Text className="text-5xl mb-4">📈</Text>
              <Text className="text-[#E5E5E5] text-lg font-semibold mb-2 text-center">
                No mood patterns yet
              </Text>
              <Text className="text-[#9A9A9A] text-sm text-center leading-6">
                Check in for a few days to see your weekly mood distribution.
              </Text>
            </View>
          )}
        </Animated.View>
         </View>

        {/* Mood Uplift Stat */}
          <View>
             <Animated.Text 
          entering={SlideInRight.duration(600).delay(200)}
          className="text-xl font-semibold text-[#E5E5E5] mb-4 "
        >
          Activity Insights
        </Animated.Text>

        {hasMoodUplift ? (
          <StatCard
            value={insights?.moodUplift?.value || "—"}
            label="MOOD UPLIFT"
            icon="🏃"
            title={insights?.moodUplift?.title || ""}
            description={insights?.moodUplift?.description || ""}
            buttonText="View Details"
            onPress={() => router.push("/weekly")}
          />
        ) : (
          <Animated.View 
            entering={FadeInUp.duration(600).delay(400)}
            className="bg-[#1E1E1E] rounded-2xl p-6 border border-[#2A2A2A] items-center"
          >
            <Text className="text-4xl mb-3">🔍</Text>
            <Text className="text-[#E5E5E5] text-base font-semibold mb-2 text-center">
              Insights coming soon
            </Text>
            <Text className="text-[#9A9A9A] text-sm text-center leading-6">
              Continue reflecting to unlock personalized activity insights.
            </Text>
          </Animated.View>
        )}
          </View>
     


        {/* Weekly Rhythm */}
        <View className="mt-6 gap-3">
         

          {/* AI Insight */}
          <Animated.View 
            entering={FadeInUp.duration(700).delay(500)}
            className="bg-[#1E1E1E] rounded-xl p-4 border border-[#2A2A2A]"
          >
            <View className="flex-row items-start gap-3">
              <Animated.Text 
                entering={ZoomIn.duration(500).delay(700)}
                className="text-3xl"
              >
                💡
              </Animated.Text>
              <View className="flex-1">
                {insights?.aiInsight ? (
                  <Animated.Text 
                    entering={FadeInRight.duration(600).delay(800)}
                    className="text-[#E5E5E5] italic text-lg font-medium"
                  >
                    &quot;{insights.aiInsight}&quot;
                  </Animated.Text>
                ) : (
                  <Animated.Text 
                    entering={FadeInRight.duration(600).delay(800)}
                    className="text-[#666666] italic text-base"
                  >
                    Your personalized AI insights will appear here as you continue your reflection journey.
                  </Animated.Text>
                )}
               
              </View>
            </View>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}