
import { View, Text, ScrollView, SafeAreaView, Pressable } from "react-native"
import { useRouter } from "expo-router"

import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeInLeft,
  FadeInRight,
  ZoomIn,
  SlideInRight,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated"
import { MoodDistribution } from "@/components/mood-distribution"
import { StatCard } from "@/components/stat-card"

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)



export default function InsightsScreen() {
  const router = useRouter()
  const upliftCardScale = useSharedValue(1)
  const detailsButtonScale = useSharedValue(1)

  const handleUpliftCardPress = () => {
    upliftCardScale.value = withSequence(
      withTiming(0.98, { duration: 100 }),
      withSpring(1, { damping: 10, stiffness: 200 })
    )
  }

  const handleDetailsPress = () => {
    detailsButtonScale.value = withSequence(
      withTiming(0.95, { duration: 100 }),
      withSpring(1, { damping: 8, stiffness: 200 })
    )
  }

  const upliftCardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: upliftCardScale.value }],
  }))

  const detailsButtonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: detailsButtonScale.value }],
  }))

  return (
    <SafeAreaView className="flex-1 bg-[#121212]">
      <ScrollView className="flex-1 px-6 py-4">
        <Animated.Text 
          entering={FadeIn.duration(600)}
          className="text-2xl font-bold text-[#E5E5E5] mb-8"
        >
          Personal Insights
        </Animated.Text>

        {/* Mood Distribution */}
        <Animated.Text 
          entering={SlideInRight.duration(600).delay(200)}
          className="text-lg font-semibold text-[#E5E5E5] mb-4"
        >
          Your Patterns
        </Animated.Text>
        
        <Animated.View entering={FadeInDown.duration(700).delay(300)}>
          <MoodDistribution  />
        </Animated.View>

        {/* Mood Uplift Stat */}
        <StatCard
            value="+24%"
            label="MOOD UPLIFT"
            icon="🏃"
            title="Exercise correlates with higher mood"
            description="On days you logged physical activity, your baseline mood was significantly higher than inactive days."
            buttonText="View Details"
            onPress={() => console.log('View details')}
                />


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
                className="text-2xl"
              >
                💡
              </Animated.Text>
              <View className="flex-1">
                <Animated.Text 
                  entering={FadeInRight.duration(600).delay(800)}
                  className="text-[#E5E5E5] italic text-sm font-medium"
                >
                  &quot;Do these patterns resonate with you today?&quot;
                </Animated.Text>
               
              </View>
            </View>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}