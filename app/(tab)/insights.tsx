
import { View, Text, ScrollView, Pressable, SafeAreaView } from "react-native"
import { useRouter } from "expo-router"

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
import { ChevronLeft } from "react-native-feather"
import {getInsights} from "@/services/reflection"


export default function InsightsScreen() {
  const router = useRouter()


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
          <MoodDistribution  />
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

        <StatCard
            value="+24%"
            label="MOOD UPLIFT"
            icon="🏃"
            title="Exercise correlates with higher mood"
            description="On days you logged physical activity, your baseline mood was significantly higher than inactive days."
            buttonText="View Details"
              onPress={() => router.push("/weekly")}
                />
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
                <Animated.Text 
                  entering={FadeInRight.duration(600).delay(800)}
                  className="text-[#E5E5E5] italic text-lg font-medium"
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