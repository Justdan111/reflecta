import { View, Text, Pressable } from "react-native"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
  FadeInUp,
  FadeInDown,
} from "react-native-reanimated"

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

interface StatCardProps {
  icon?: string
  label: string
  value: string | number
  description?: string
  title?: string
  buttonText?: string
  onPress?: () => void
}

export function StatCard({ icon, label, value, description, title, buttonText, onPress }: StatCardProps) {
  const scale = useSharedValue(1)

  const handlePress = () => {
    if (onPress) {
      scale.value = withSequence(
        withTiming(0.97, { duration: 100 }),
        withSpring(1, { damping: 10, stiffness: 200 })
      )
      onPress()
    }
  }

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  return (
    <View className="bg-[#1E1E1E] rounded-3xl overflow-hidden border border-[#2A2A2A]">
      {/* Top Section - Large Value */}
      <Animated.View 
        entering={FadeInUp.duration(700).delay(100)}
        className="bg-[#252525] px-6 py-12 items-center"
      >
        <Text className="text-[#C9A24D] text-6xl font-bold mb-3">{value}</Text>
        <Text className="text-[#9A9A9A] text-xs font-semibold tracking-wider">{label}</Text>
      </Animated.View>

      {/* Bottom Section - Details */}
      <Animated.View 
        entering={FadeInDown.duration(700).delay(200)}
        className="px-6 py-8"
      >
        {/* Icon and Title */}
        {(icon || title) && (
          <View className="flex-row items-start mb-4">
            {icon && <Text className="text-3xl mr-3">{icon}</Text>}
            <Text className="text-white text-xl font-medium flex-1 leading-7">
              {title}
            </Text>
          </View>
        )}

        {/* Description */}
        {description && (
          <Text className="text-[#9A9A9A] text-sm leading-6 mb-6">
            {description}
          </Text>
        )}

        {/* Button */}
        {onPress && (
          <AnimatedPressable 
            onPress={handlePress}
            style={animatedStyle}
            className="bg-[#6D5D8B] py-4 rounded-2xl active:opacity-90"
          >
            <Text className="text-white text-center font-semibold text-base">
              {buttonText || "View Details"}
            </Text>
          </AnimatedPressable>
        )}
      </Animated.View>
    </View>
  )
}