import { View, Text, ScrollView, SafeAreaView, Pressable, Switch } from "react-native"
import { useState } from "react"
import { ChevronLeft, ChevronRight, Trash2 } from "react-native-feather"
import { useRouter } from "expo-router"
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

export default function SettingsScreen() {
  const router = useRouter()
  const [biometricEnabled, setBiometricEnabled] = useState(true)
  const [reminderTime] = useState("9:30 PM")

  const learnMoreScale = useSharedValue(1)
  const deleteScale = useSharedValue(1)

  const handleLearnMorePress = () => {
    learnMoreScale.value = withSequence(
      withTiming(0.95, { duration: 100 }),
      withSpring(1, { damping: 10, stiffness: 200 })
    )
  }

  const handleDeletePress = () => {
    deleteScale.value = withSequence(
      withTiming(0.97, { duration: 100 }),
      withSpring(1, { damping: 10, stiffness: 200 })
    )
  }

  const learnMoreAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: learnMoreScale.value }],
  }))

  const deleteAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: deleteScale.value }],
  }))

  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]">
      <ScrollView className="flex-1 px-5 py-4">
        {/* Header */}
        <Animated.View 
          entering={FadeIn.duration(600)}
          className="flex-row items-center mb-8"
        >
          <Pressable onPress={() => router.back()} className="mr-4">
            <ChevronLeft color="#E5E5E5"  />
          </Pressable>
          <Text className="text-white text-2xl font-semibold flex-1 text-center mr-8">
            Settings
          </Text>
        </Animated.View>

        {/* Privacy Section */}
        <Animated.View entering={FadeInDown.duration(600).delay(100)}>
          <View className="bg-[#1A1A1A] rounded-2xl p-5 mb-6 border border-[#2A2A2A]">
            <View className="bg-[#2A2520] px-3 py-1 rounded-md self-start mb-3">
              <Text className="text-[#C9A24D] text-xs font-bold tracking-wider">
                PRIVATE
              </Text>
            </View>
            <Text className="text-white text-lg font-semibold mb-2">
              Privacy-first reflection
            </Text>
            <Text className="text-[#9A9A9A] text-sm mb-4 leading-5">
              Your thoughts are your own. Data is encrypted and stays on your device. We never see your reflections.
            </Text>
            <AnimatedPressable 
              style={learnMoreAnimatedStyle}
              onPress={handleLearnMorePress}
            >
              <Text className="text-[#6D5D8B] text-sm font-semibold">
                LEARN MORE →
              </Text>
            </AnimatedPressable>
          </View>
        </Animated.View>

        {/* Daily Rhythm Section */}
        <Animated.View entering={FadeInDown.duration(600).delay(200)}>
          <Text className="text-[#666666] text-xs font-semibold tracking-wider mb-3 ml-1">
            DAILY RHYTHM
          </Text>
          <View className="bg-[#1A1A1A] rounded-2xl border border-[#2A2A2A] mb-6 overflow-hidden">
            <Pressable className="flex-row justify-between items-center px-5 py-4 border-b border-[#2A2A2A]">
              <View className="flex-1">
                <Text className="text-white text-base font-medium mb-1">
                  Daily Reminder
                </Text>
                <Text className="text-[#666666] text-sm">Pause and reflect</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Text className="text-[#9A9A9A] text-base">{reminderTime}</Text>
                <ChevronRight color="#666666" />
              </View>
            </Pressable>
            
            <View className="flex-row justify-between items-center px-5 py-4">
              <View className="flex-1">
                <Text className="text-white text-base font-medium mb-1">
                  Biometric Lock
                </Text>
                <Text className="text-[#666666] text-sm">Use FaceID to unlock</Text>
              </View>
              <Switch
                value={biometricEnabled}
                onValueChange={setBiometricEnabled}
                trackColor={{ false: "#2A2A2A", true: "#6D5D8B" }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="#2A2A2A"
              />
            </View>
          </View>
        </Animated.View>

        {/* Ownership Section */}
        <Animated.View entering={FadeInDown.duration(600).delay(300)}>
          <Text className="text-[#666666] text-xs font-semibold tracking-wider mb-3 ml-1">
            OWNERSHIP
          </Text>
          <View className="bg-[#1A1A1A] rounded-2xl border border-[#2A2A2A] mb-6 overflow-hidden">
            <Pressable className="flex-row justify-between items-center px-5 py-4 border-b border-[#2A2A2A]">
              <Text className="text-white text-base font-medium">Export Data</Text>
              <View className="flex-row items-center gap-2">
                <Text className="text-[#666666] text-sm">JSON, PDF</Text>
                <ChevronRight color="#666666"  />
              </View>
            </Pressable>
            
            <Pressable className="flex-row justify-between items-center px-5 py-4 border-b border-[#2A2A2A]">
              <Text className="text-white text-base font-medium">Theme</Text>
              <View className="flex-row items-center gap-2">
                <Text className="text-[#666666] text-sm">Midnight</Text>
                <ChevronRight color="#666666"  />
              </View>
            </Pressable>

            <AnimatedPressable 
              style={deleteAnimatedStyle}
              onPress={handleDeletePress}
              className="flex-row justify-between items-center px-5 py-4"
            >
              <Text className="text-[#EF4444] text-base font-medium">
                Clear All Reflections
              </Text>
              <Trash2 color="#EF4444"  />
            </AnimatedPressable>
          </View>
        </Animated.View>

        {/* Reflecta Section */}
        <Animated.View entering={FadeInDown.duration(600).delay(400)}>
          <Text className="text-[#666666] text-xs font-semibold tracking-wider mb-3 ml-1">
            REFLECTA
          </Text>
          <View className="bg-[#1A1A1A] rounded-2xl border border-[#2A2A2A] mb-6 overflow-hidden">
            <Pressable className="flex-row justify-between items-center px-5 py-4 border-b border-[#2A2A2A]">
              <Text className="text-white text-base font-medium">About Reflecta</Text>
              <ChevronRight color="#666666"  />
            </Pressable>
            
            <Pressable className="flex-row justify-between items-center px-5 py-4 border-b border-[#2A2A2A]">
              <Text className="text-white text-base font-medium">Privacy Policy</Text>
              <ChevronRight color="#666666"  />
            </Pressable>

            <Pressable className="flex-row justify-between items-center px-5 py-4">
              <Text className="text-white text-base font-medium">Support</Text>
              <ChevronRight color="#666666"  />
            </Pressable>
          </View>
        </Animated.View>

        {/* Version Info */}
        <Animated.View 
          entering={FadeIn.duration(600).delay(500)}
          className="items-center py-8"
        >
          <Text className="text-[#666666] text-xs tracking-wider mb-2">
            VERSION 2.4.0 (82)
          </Text>
          <View className="flex-row gap-1">
            <View className="w-1 h-1 rounded-full bg-[#666666]" />
            <View className="w-1 h-1 rounded-full bg-[#666666]" />
            <View className="w-1 h-1 rounded-full bg-[#666666]" />
          </View>
        </Animated.View>

        {/* Bottom Spacer */}
        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  )
}