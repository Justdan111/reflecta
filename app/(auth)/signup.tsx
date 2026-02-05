import { View, Text, TextInput, Pressable, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from "react-native"
import { useState } from "react"
import { useRouter } from "expo-router"
import Animated, {
  FadeIn,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated"
import { Eye, EyeOff, ChevronLeft } from "react-native-feather"

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export default function SignupScreen() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  
  const signupButtonScale = useSharedValue(1)

  const handleSignup = () => {
    if (!agreedToTerms) {
      alert("Please accept the privacy policy and terms")
      return
    }
    if (password !== confirmPassword) {
      alert("Passwords don't match")
      return
    }
    
    signupButtonScale.value = withSequence(
      withTiming(0.97, { duration: 100 }),
      withSpring(1, { damping: 10, stiffness: 200 })
    )
    // Add signup logic here
    setTimeout(() => {
      router.push("/home")
    }, 300)
  }

  const signupButtonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: signupButtonScale.value }],
  }))

  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]">
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-6 py-4">
          {/* Header */}
          <Animated.View 
            entering={FadeIn.duration(600)}
            className="flex-row items-center mb-8"
          >
            <Pressable onPress={() => router.back()} className="mr-4">
              <ChevronLeft color="#E5E5E5"  />
            </Pressable>
          </Animated.View>

          <Animated.View 
            entering={FadeIn.duration(800).delay(100)}
            className="mb-8"
          >
            <Text className="text-[#6D5D8B] text-5xl font-bold mb-3">Reflecta</Text>
            <Text className="text-white text-3xl font-bold mb-2">Create account</Text>
            <Text className="text-[#9A9A9A] text-base">
              Start your journey to better self-awareness
            </Text>
          </Animated.View>

          {/* Form */}
          <View className="mb-6">
            <Animated.View 
              entering={FadeInUp.duration(700).delay(200)}
              className="mb-5"
            >
              <Text className="text-[#E5E5E5] text-sm font-medium mb-2 ml-1">
                Name
              </Text>
              <View className="bg-[#1A1A1A] rounded-2xl border border-[#2A2A2A] px-4 py-4">
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Your name"
                  placeholderTextColor="#666666"
                  autoCapitalize="words"
                  className="text-white text-base"
                />
              </View>
            </Animated.View>

            <Animated.View 
              entering={FadeInUp.duration(700).delay(300)}
              className="mb-5"
            >
              <Text className="text-[#E5E5E5] text-sm font-medium mb-2 ml-1">
                Email
              </Text>
              <View className="bg-[#1A1A1A] rounded-2xl border border-[#2A2A2A] px-4 py-4">
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="your@email.com"
                  placeholderTextColor="#666666"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="text-white text-base"
                />
              </View>
            </Animated.View>

            <Animated.View 
              entering={FadeInUp.duration(700).delay(400)}
              className="mb-5"
            >
              <Text className="text-[#E5E5E5] text-sm font-medium mb-2 ml-1">
                Password
              </Text>
              <View className="bg-[#1A1A1A] rounded-2xl border border-[#2A2A2A] px-4 py-4 flex-row items-center">
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Create a password"
                  placeholderTextColor="#666666"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  className="text-white text-base flex-1"
                />
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <EyeOff color="#666666"  />
                  ) : (
                    <Eye color="#666666"  />
                  )}
                </Pressable>
              </View>
            </Animated.View>

            <Animated.View 
              entering={FadeInUp.duration(700).delay(500)}
              className="mb-6"
            >
              <Text className="text-[#E5E5E5] text-sm font-medium mb-2 ml-1">
                Confirm Password
              </Text>
              <View className="bg-[#1A1A1A] rounded-2xl border border-[#2A2A2A] px-4 py-4 flex-row items-center">
                <TextInput
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Confirm your password"
                  placeholderTextColor="#666666"
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  className="text-white text-base flex-1"
                />
                <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? (
                    <EyeOff color="#666666"  />
                  ) : (
                    <Eye color="#666666"  />
                  )}
                </Pressable>
              </View>
            </Animated.View>

            {/* Terms Agreement */}
            <Animated.View 
              entering={FadeInUp.duration(700).delay(600)}
              className="mb-6"
            >
              <Pressable 
                onPress={() => setAgreedToTerms(!agreedToTerms)}
                className="flex-row items-start"
              >
                <View className={`w-5 h-5 rounded border-2 mr-3 mt-0.5 items-center justify-center ${agreedToTerms ? "bg-[#6D5D8B] border-[#6D5D8B]" : "border-[#666666]"}`}>
                  {agreedToTerms && (
                    <Text className="text-white text-xs font-bold">✓</Text>
                  )}
                </View>
                <Text className="text-[#9A9A9A] text-sm leading-5 flex-1">
                  I agree to the{" "}
                  <Text className="text-[#6D5D8B] font-semibold">Privacy Policy</Text>
                  {" "}and{" "}
                  <Text className="text-[#6D5D8B] font-semibold">Terms of Service</Text>
                </Text>
              </Pressable>
            </Animated.View>

            <AnimatedPressable
              entering={FadeInUp.duration(700).delay(700)}
              style={signupButtonAnimatedStyle}
              onPress={handleSignup}
              className={`py-4 rounded-2xl mb-6 ${agreedToTerms ? "bg-[#6D5D8B]" : "bg-[#2A2A2A]"}`}
              disabled={!agreedToTerms}
            >
              <Text className={`text-center font-semibold text-lg ${agreedToTerms ? "text-white" : "text-[#666666]"}`}>
                Create Account
              </Text>
            </AnimatedPressable>

            <Animated.View 
              entering={FadeInUp.duration(700).delay(800)}
              className="flex-row justify-center items-center mb-6"
            >
              <Text className="text-[#9A9A9A] text-sm">
                Already have an account?{" "}
              </Text>
              <Pressable onPress={() => router.back()}>
                <Text className="text-[#6D5D8B] text-sm font-semibold">
                  Sign In
                </Text>
              </Pressable>
            </Animated.View>
          </View>

          {/* Privacy Notice */}
          <Animated.View 
            entering={FadeIn.duration(700).delay(900)}
            className="mb-8"
          >
            <View className="bg-[#1A1A1A] rounded-2xl p-4 border border-[#2A2A2A]">
              <View className="flex-row items-center mb-2">
                <Text className="text-2xl mr-2">🔒</Text>
                <Text className="text-[#E5E5E5] text-sm font-semibold">
                  End-to-end encrypted
                </Text>
              </View>
              <Text className="text-[#9A9A9A] text-xs leading-5">
                Your reflections are encrypted and stored locally on your device. We never have access to your personal thoughts and entries.
              </Text>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}