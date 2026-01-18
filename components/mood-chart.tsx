import { View, Text } from "react-native"
import Animated, {
  FadeIn,
  FadeInUp,
} from "react-native-reanimated"
import Svg, { Path, Circle, Defs, LinearGradient, Stop } from "react-native-svg"

interface WeeklyData {
  day: string
  mood: number
}

interface MoodChartProps {
  weeklyData?: WeeklyData[]
  stability?: string
}

export function MoodChart({ weeklyData, stability }: MoodChartProps) {
  const WEEKLY_DATA = weeklyData || [
    { day: "MON", mood: 2.5 },
    { day: "TUE", mood: 3.2 },
    { day: "WED", mood: 3.8 },
    { day: "THU", mood: 3.5 },
    { day: "FRI", mood: 2.8 },
    { day: "SAT", mood: 3.0 },
    { day: "SUN", mood: 4.5 },
  ]

  const maxMood = 5
  const chartHeight = 240
  const chartWidth = 340

  // Calculate smooth curve path
  const createSmoothPath = () => {
    const padding = 20
    const width = chartWidth - padding * 2
    const segmentWidth = width / (WEEKLY_DATA.length - 1)
    
    let path = "M"
    
    WEEKLY_DATA.forEach((item, idx) => {
      const x = padding + idx * segmentWidth
      const y = chartHeight - (item.mood / maxMood) * (chartHeight - 40)
      
      if (idx === 0) {
        path += `${x},${y}`
      } else {
        const prevX = padding + (idx - 1) * segmentWidth
        const prevY = chartHeight - (WEEKLY_DATA[idx - 1].mood / maxMood) * (chartHeight - 40)
        const cpX1 = prevX + segmentWidth / 3
        const cpX2 = x - segmentWidth / 3
        path += ` C${cpX1},${prevY} ${cpX2},${y} ${x},${y}`
      }
    })
    
    return path
  }

  const getPointPosition = (index: number) => {
    const padding = 20
    const width = chartWidth - padding * 2
    const segmentWidth = width / (WEEKLY_DATA.length - 1)
    const x = padding + index * segmentWidth
    const y = chartHeight - (WEEKLY_DATA[index].mood / maxMood) * (chartHeight - 40)
    return { x, y }
  }

  return (
    <View className="bg-[#1E1E1E] rounded-2xl p-6 border border-[#2A2A2A] mb-6">
      {/* Header */}
      <Animated.View 
        entering={FadeIn.duration(600)}
        className="flex-row justify-between items-start mb-8"
      >
        <View>
          <Text className="text-[#9A9A9A] text-xs font-semibold tracking-wider mb-2">
            MOOD TRENDS
          </Text>
          <Text className="text-[#6D5D8B] text-4xl font-bold">Resilient</Text>
        </View>
        <View className="bg-[#3A3A2A] px-4 py-2 rounded-full border border-[#4A4A3A]">
          <Text className="text-[#C9A24D] font-semibold text-sm">
            {stability || "+12% Stability"}
          </Text>
        </View>
      </Animated.View>

      {/* Chart with Smooth Curve */}
      <Animated.View 
        entering={FadeInUp.duration(800).delay(200)}
        className="mb-6"
        style={{ height: chartHeight }}
      >
        {/* Grid Lines */}
        <View className="absolute inset-0">
          {[0, 1, 2, 3].map((i) => (
            <View
              key={i}
              className="absolute w-full border-b border-[#2A2A2A]"
              style={{ top: i * (chartHeight / 3) }}
            />
          ))}
        </View>

        {/* Smooth Curve Line */}
        <Svg width={chartWidth} height={chartHeight}>
          <Defs>
            <LinearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0" stopColor="#6D5D8B" stopOpacity="1" />
              <Stop offset="1" stopColor="#8D7DAB" stopOpacity="1" />
            </LinearGradient>
          </Defs>
          
          <Path
            d={createSmoothPath()}
            stroke="url(#lineGradient)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Data Points */}
          {WEEKLY_DATA.map((item, idx) => {
            const { x, y } = getPointPosition(idx)
            const isHighlight = idx === 2 || idx === 6 // Wednesday and Sunday
            return (
              <Circle
                key={idx}
                cx={x}
                cy={y}
                r={isHighlight ? 6 : 4}
                fill={isHighlight ? "#C9A24D" : "#6D5D8B"}
                stroke={isHighlight ? "#C9A24D" : "#8D7DAB"}
                strokeWidth="2"
              />
            )
          })}
        </Svg>
      </Animated.View>

      {/* Day Labels */}
      <Animated.View 
        entering={FadeInUp.duration(600).delay(400)}
        className="flex-row justify-between px-2"
      >
        {WEEKLY_DATA.map((item, idx) => (
          <Text key={idx} className="text-[#666666] text-xs font-medium">
            {item.day}
          </Text>
        ))}
      </Animated.View>
    </View>
  )
}