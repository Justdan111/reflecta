
import { View, Text, ScrollView,  TextInput, Pressable } from "react-native"
import { ArrowLeft, CheckCircle, MoreHorizontal } from "react-native-feather"
import { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"


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

  return (
    <SafeAreaView className="flex-1 bg-[#121212]">
      <ScrollView className="flex-1 px-6 py-4">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-10">
          <Pressable onPress={() => router.push("/journal")}> 
            <ArrowLeft color="#6D5D8B" />
          </Pressable>
          <Text className="text-2xl font-bold text-[#E5E5E5] flex-1 text-center">Daily Note</Text>
          <Pressable onPress={() => {/* open menu logic here */}}>
            <MoreHorizontal color="#6D5D8B" />
          </Pressable>
        </View>


         <View className="flex-1 justify-between gap-9">
        {/* Reflective Prompt */}
        <View>
            <View className="mb-6 gap-2">
          <Text className="text-2xl font-bold text-[#E5E5E5]">
           Reflect on your day
          </Text>
          <Text className="text-md text-[#9A9A9A] font-medium">
          Take a moment to capture what shaped your energy .
          </Text>
        </View>
        
        {/* Add New Entry */}
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

         <Pressable className="bg-[#6D5D8B] px-5 w-10/12 py-3 rounded-3xl self-center mb-8 items-center">
              <View className="flex-row items-center gap-3">
                <Text className="text-white font-semibold text-lg">Save entry</Text>
                
                 <CheckCircle color="#fff" width={20} height={20} style={{ marginRight: 8 }} />
                 
              </View>
            </Pressable>
        </View>

        {/* Previous Entries */}
        <View>
        <Text className="text-lg font-semibold text-[#E5E5E5] mb-4">Recent Entries</Text>
        {entries.map((entry) => (
          <View key={entry.id} className="bg-[#1E1E1E] rounded-xl p-4 mb-3 border border-[#2A2A2A]">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-sm text-[#9A9A9A]">{entry.date}</Text>
              <Text className="text-xs bg-[#2A2A2A] px-3 py-1 rounded-full text-[#C9A24D]">{entry.mood}</Text>
            </View>
            <Text className="text-[#E5E5E5] text-sm leading-6">{entry.text}</Text>
          </View>
        ))}
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
