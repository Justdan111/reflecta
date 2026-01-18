import { Text } from "react-native"
import Animated, {
  FadeInUp,
} from "react-native-reanimated"

interface StatsCardProps {
  icon?: string
  label: string
  value: string
  accent?: boolean
}

export function StatsCard({ icon, label, value, accent }: StatsCardProps) {
  return (
    <Animated.View 
      entering={FadeInUp.duration(600)}
      className="bg-[#1E1E1E] rounded-2xl p-5 border border-[#2A2A2A] flex-1"
    >
      {/* Icon */}
      {icon && (
        <Text className="text-3xl mb-3">{icon}</Text>
      )}
      
      {/* Label */}
      <Text className="text-[#9A9A9A] text-xs font-semibold tracking-wider mb-2">
        {label}
      </Text>
      
      {/* Value */}
      <Text className={`text-2xl font-bold ${accent ? "text-[#C9A24D]" : "text-white"}`}>
        {value}
      </Text>
    </Animated.View>
  )
}