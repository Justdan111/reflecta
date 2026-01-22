import { View, Text, ScrollView, TextInput, Pressable, SafeAreaView } from "react-native"
import { ArrowLeft, CheckCircle, MoreHorizontal } from "react-native-feather"
import { useState } from "react"
import { useRouter } from "expo-router"
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  SlideInLeft,
  SlideInRight,
  ZoomIn,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated"

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export default function JournalScreen() {
  const router = useRouter()
  const [entries, setEntries] = useState([
    {
      id: 1,
      date: "Today",
      mood: "Calm",
      text: "Had a great morning session. Feeling peaceful and focused.",
    },
    {
      id: 2,
      date: "Yesterday",
      mood: "Content",
      text: "Productive day at work. Good conversations with team.",
    },
  ])

  const saveButtonScale = useSharedValue(1)

  const handleSavePress = () => {
    saveButtonScale.value = withSequence(
      withTiming(0.95, { duration: 100 }),
      withSpring(1, { damping: 8, stiffness: 200 })
    )
  }

  const saveButtonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: saveButtonScale.value }],
  }))

  const [menuVisible, setMenuVisible] = useState(false)
  const handleMenuOption = (option) => {
    setMenuVisible(false)
    // Add logic for each option here
    if (option === 'Edit') {
      // handle edit
    } else if (option === 'Delete') {
      // handle delete
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-[#121212]">
      <ScrollView className="flex-1 px-6 py-4">
        {/* Header */}
        <Animated.View 
          entering={FadeIn.duration(500)}
          className="flex-row justify-between items-center mb-10"
        >
          <Pressable onPress={() => router.back()}> 
            <ArrowLeft color="#E5E5E5" />
          </Pressable>
          <Text className="text-2xl font-bold text-[#E5E5E5] flex-1 text-center">Daily Note</Text>
          <View style={{ position: 'relative' }}>
            <Pressable onPress={() => setMenuVisible((v) => !v)}>
              <MoreHorizontal color="#E5E5E5" />
            </Pressable>
            {menuVisible && (
              <>
                {/* Overlay to close menu when clicking outside */}
                <Pressable
                  onPress={() => setMenuVisible(false)}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: '200vw',
                    height: '200vh',
                    backgroundColor: 'rgba(0,0,0,0.01)',
                    zIndex: 19,
                  }}
                />
                <View
                  style={{
                    position: 'absolute',
                    top: 30,
                    right: 0,
                    zIndex: 20,
                    backgroundColor: '#000',
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: '#2A2A2A',
                    minWidth: 130,
                    shadowColor: '#000',
                    shadowOpacity: 0.4,
                    shadowRadius: 16,
                    shadowOffset: { width: 0, height: 8 },
                    elevation: 30,
                  }}
                >
                  <Pressable onPress={() => handleMenuOption('Edit')} style={{ padding: 14 }}>
                    <Text style={{ color: '#E5E5E5', fontSize: 16 }}>Edit</Text>
                  </Pressable>
                  <Pressable onPress={() => handleMenuOption('Delete')} style={{ padding: 14 }}>
                    <Text style={{ color: '#E57373', fontSize: 16 }}>Delete</Text>
                  </Pressable>
                  <Pressable onPress={() => setMenuVisible(false)} style={{ padding: 14 }}>
                    <Text style={{ color: '#9A9A9A', fontSize: 16 }}>Cancel</Text>
                  </Pressable>
                </View>
              </>
            )}
          </View>
        </Animated.View>

        <View className="flex-1 justify-between gap-9">
          {/* Reflective Prompt */}
          <View>
            <Animated.View 
              entering={SlideInLeft.duration(600).delay(100)}
              className="mb-6 gap-2"
            >
              <Text className="text-2xl font-bold text-[#E5E5E5]">
                Reflect on your day
              </Text>
              <Text className="text-md text-[#9A9A9A] font-medium">
                Take a moment to capture what shaped your energy.
              </Text>
            </Animated.View>
        
            {/* Add New Entry */}
            <Animated.View
              entering={ZoomIn.duration(600).delay(200)}
            >
              <Pressable className="bg-[#1E1E1E] rounded-2xl border border-[#2A2A2A] mb-6 px-4 pt-4 pb-0 min-h-[320px] flex-col justify-between">
                <TextInput
                  placeholder="What influenced your mood today?"
                  placeholderTextColor="#666666"
                  className="text-[#E5E5E5] text-lg flex-1"
                  multiline
                  numberOfLines={10}
                  style={{ minHeight: 120, color: '#E5E5E5', fontSize: 18, padding: 0, margin: 0, textAlignVertical: 'top' }}
                />
                <View className="flex-row justify-between items-center border-t border-[#2A2A2A] px-1 py-3 w-full" style={{ marginTop: 8 }}>
                  <Text className="text-xs text-[#9A9A9A]">END-TO-END ENCRYPTED</Text>
                  <Text className="text-xs text-[#9A9A9A]">0/100</Text>
                </View>
              </Pressable>
            </Animated.View>

            <AnimatedPressable 
              entering={FadeInUp.duration(600).delay(300)}
              style={saveButtonAnimatedStyle}
              onPress={handleSavePress}
              className="bg-[#6D5D8B] px-5 w-10/12 py-3 rounded-3xl self-center mb-8 items-center"
            >
              <View className="flex-row items-center gap-3">
                <Text className="text-white font-semibold text-lg">Save entry</Text>
                <CheckCircle color="#fff" width={20} height={20} style={{ marginRight: 8 }} />
              </View>
            </AnimatedPressable>
          </View>

          {/* Previous Entries */}
          <View>
            <Animated.Text 
              entering={SlideInRight.duration(600).delay(400)}
              className="text-lg font-semibold text-[#E5E5E5] mb-4"
            >
              Recent Entries
            </Animated.Text>
            {entries.map((entry, index) => (
              <Animated.View 
                key={entry.id}
                entering={FadeInDown.duration(500).delay(500 + index * 100)}
                className="bg-[#1E1E1E] rounded-xl p-4 mb-3 border border-[#2A2A2A]"
              >
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-sm text-[#9A9A9A]">{entry.date}</Text>
                  <Text className="text-xs bg-[#2A2A2A] px-3 py-1 rounded-full text-[#C9A24D]">{entry.mood}</Text>
                </View>
                <Text className="text-[#E5E5E5] text-sm leading-6">{entry.text}</Text>
              </Animated.View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}