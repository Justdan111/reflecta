import { View, Text, ScrollView, TextInput, Pressable, SafeAreaView, Modal, Alert, ActivityIndicator } from "react-native"
import { ArrowLeft, CheckCircle, MoreHorizontal } from "react-native-feather"
import { useState } from "react"
import { useRouter, useLocalSearchParams } from "expo-router"
import { createReflection } from "@/services/reflection"
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
  const { mood } = useLocalSearchParams<{ mood: string }>()
  const [noteText, setNoteText] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const saveButtonScale = useSharedValue(1)
  const [menuVisible, setMenuVisible] = useState(false)

  const handleSavePress = async () => {
    if (!noteText.trim()) {
      Alert.alert("Empty Note", "Please write something about your day.")
      return
    }

    saveButtonScale.value = withSequence(
      withTiming(0.95, { duration: 100 }),
      withSpring(1, { damping: 8, stiffness: 200 })
    )

    setIsLoading(true)
    try {
      const moodValue = mood ? parseInt(mood, 10) : 3 // Default to neutral if no mood
      await createReflection(moodValue, noteText.trim())
      Alert.alert("Success", "Your reflection has been saved!", [
        { text: "OK", onPress: () => router.back() }
      ])
      setNoteText("")
    } catch (error: any) {
      Alert.alert("Error", error?.response?.data?.message || "Failed to save reflection. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const saveButtonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: saveButtonScale.value }],
  }))

  const handleMenuOption = (option: string) => {
    setMenuVisible(false)
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
          className="flex-row justify-between items-center mb-10 relative z-50"
        >
          <Pressable onPress={() => router.back()}> 
            <ArrowLeft color="#E5E5E5" />
          </Pressable>
          <Text className="text-2xl font-bold text-[#E5E5E5] flex-1 text-center">Daily Note</Text>
          
          <Pressable onPress={() => setMenuVisible(true)}>
            <MoreHorizontal color="#E5E5E5" />
          </Pressable>
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
                  value={noteText}
                  onChangeText={setNoteText}
                  maxLength={500}
                  editable={!isLoading}
                  style={{ minHeight: 120, color: '#E5E5E5', fontSize: 18, padding: 0, margin: 0, textAlignVertical: 'top' }}
                />
                <View className="flex-row justify-between items-center border-t border-[#2A2A2A] px-1 py-3 w-full" style={{ marginTop: 8 }}>
                  <Text className="text-xs text-[#9A9A9A]">END-TO-END ENCRYPTED</Text>
                  <Text className="text-xs text-[#9A9A9A]">{noteText.length}/500</Text>
                </View>
              </Pressable>
            </Animated.View>

            <AnimatedPressable 
              entering={FadeInUp.duration(600).delay(300)}
              style={saveButtonAnimatedStyle}
              onPress={handleSavePress}
              disabled={isLoading}
              className={`px-5 w-10/12 py-3 rounded-3xl self-center mb-8 items-center ${isLoading ? 'bg-[#4D4D6B]' : 'bg-[#6D5D8B]'}`}
            >
              <View className="flex-row items-center gap-3">
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <>
                    <Text className="text-white font-semibold text-lg">Save entry</Text>
                    <CheckCircle color="#fff" width={20} height={20} style={{ marginRight: 8 }} />
                  </>
                )}
              </View>
            </AnimatedPressable>
          </View>

          {/* Previous Entries - Empty State */}
          <View>
            <Animated.Text 
              entering={SlideInRight.duration(600).delay(400)}
              className="text-lg font-semibold text-[#E5E5E5] mb-4"
            >
              Recent Entries
            </Animated.Text>
            <Animated.View 
              entering={FadeInDown.duration(500).delay(500)}
              className="bg-[#1E1E1E] rounded-xl p-6 border border-[#2A2A2A] items-center"
            >
              <Text className="text-4xl mb-3">📝</Text>
              <Text className="text-[#E5E5E5] text-base font-semibold mb-2 text-center">
                No entries yet
              </Text>
              <Text className="text-[#9A9A9A] text-sm text-center leading-6">
                Your saved reflections will appear here.
              </Text>
            </Animated.View>
          </View>
        </View>
      </ScrollView>

      {/* Menu Modal with proper z-index */}
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable 
          className="flex-1 bg-black/50"
          onPress={() => setMenuVisible(false)}
        >
          <View className="absolute top-16 right-6 bg-[#1A1A1A] rounded-2xl border border-[#2A2A2A] min-w-[160px] shadow-2xl">
            <Pressable 
              onPress={() => handleMenuOption('Edit')}
              className="px-5 py-4 border-b border-[#2A2A2A] active:bg-[#2A2A2A]"
            >
              <Text className="text-white text-base">Edit</Text>
            </Pressable>
            <Pressable 
              onPress={() => handleMenuOption('Delete')}
              className="px-5 py-4 border-b border-[#2A2A2A] active:bg-[#2A2A2A]"
            >
              <Text className="text-red-400 text-base">Delete</Text>
            </Pressable>
            <Pressable 
              onPress={() => setMenuVisible(false)}
              className="px-5 py-4 active:bg-[#2A2A2A]"
            >
              <Text className="text-[#9A9A9A] text-base">Cancel</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  )
}