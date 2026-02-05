import { View, Text, TextInput, Pressable, SafeAreaView, KeyboardAvoidingView, Platform } from "react-native"
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
import { Eye, EyeOff } from "react-native-feather"

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export default function LoginScreen() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  
  const loginButtonScale = useSharedValue(1)

  const handleLogin = () => {
    loginButtonScale.value = withSequence(
      withTiming(0.97, { duration: 100 }),
      withSpring(1, { damping: 10, stiffness: 200 })
    )
    // Add login logic here
    setTimeout(() => {
      router.push("/home")
    }, 300)
  }

  const loginButtonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: loginButtonScale.value }],
  }))

  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]">
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 px-6 py-4 justify-between">
          {/* Header */}
          <Animated.View 
            entering={FadeIn.duration(800)}
            className="mt-12 mb-8"
          >
            <Text className="text-[#6D5D8B] text-5xl font-bold mb-3">Reflecta</Text>
            <Text className="text-white text-3xl font-bold mb-2">Welcome back</Text>
            <Text className="text-[#9A9A9A] text-base">
              Continue your reflection journey
            </Text>
          </Animated.View>

          {/* Form */}
          <View className="flex-1 justify-center">
            <Animated.View 
              entering={FadeInUp.duration(700).delay(200)}
              className="mb-6"
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
              entering={FadeInUp.duration(700).delay(300)}
              className="mb-6"
            >
              <Text className="text-[#E5E5E5] text-sm font-medium mb-2 ml-1">
                Password
              </Text>
              <View className="bg-[#1A1A1A] rounded-2xl border border-[#2A2A2A] px-4 py-4 flex-row items-center">
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
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
              entering={FadeInUp.duration(700).delay(400)}
            >
              <Pressable className="mb-6">
                <Text className="text-[#6D5D8B] text-sm font-semibold text-right">
                  Forgot password?
                </Text>
              </Pressable>
            </Animated.View>

            <AnimatedPressable
              entering={FadeInUp.duration(700).delay(500)}
              style={loginButtonAnimatedStyle}
              onPress={handleLogin}
              className="bg-[#6D5D8B] py-4 rounded-2xl mb-6"
            >
              <Text className="text-white text-center font-semibold text-lg">
                Sign In
              </Text>
            </AnimatedPressable>

            <Animated.View 
              entering={FadeInUp.duration(700).delay(600)}
              className="flex-row justify-center items-center"
            >
              <Text className="text-[#9A9A9A] text-sm">
                Don&apos;t have an account?{" "}
              </Text>
              <Pressable onPress={() => router.push("/signup")}>
                <Text className="text-[#6D5D8B] text-sm font-semibold">
                  Sign Up
                </Text>
              </Pressable>
            </Animated.View>
          </View>

          {/* Privacy Notice */}
          <Animated.View 
            entering={FadeIn.duration(700).delay(700)}
            className="mb-4"
          >
            <View className="bg-[#1A1A1A] rounded-2xl p-4 border border-[#2A2A2A]">
              <View className="flex-row items-center mb-2">
                <Text className="text-2xl mr-2">🔒</Text>
                <Text className="text-[#E5E5E5] text-sm font-semibold">
                  Your privacy matters
                </Text>
              </View>
              <Text className="text-[#9A9A9A] text-xs leading-5">
                All your reflections are end-to-end encrypted and stored securely on your device.
              </Text>
            </View>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}