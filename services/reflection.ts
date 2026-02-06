import api from "@/lib/api";

// Types
export interface Reflection {
  id: string;
  mood: number;
  note: string;
  createdAt: string;
  userId: string;
}

export interface WeeklyDayData {
  day: string;
  mood: number;
}

export interface WeeklySummary {
  weeklyData: WeeklyDayData[];
  dateRange: string;
  avgMood: string;
  topEmotion: string;
  reflections: string;
  streak: string;
  insight: string;
}

export interface MoodDistributionItem {
  day: string;
  value: number;
  color: string;
}

export interface MoodUplift {
  value: string;
  title: string;
  description: string;
}

export interface Insights {
  moodDistribution: MoodDistributionItem[];
  moodUplift: MoodUplift;
  aiInsight: string;
}

export async function createReflection(
  mood: number,
  note: string
): Promise<Reflection> {
  // Validate mood is between 1-5
  if (mood < 1 || mood > 5) {
    throw new Error("Mood must be between 1 and 5");
  }

  // Validate note length
  if (note.length > 500) {
    throw new Error("Note must be 500 characters or less");
  }

  const res = await api.post<Reflection>("/reflections", { mood, note });
  return res.data;
}

export async function getWeeklySummary(): Promise<WeeklySummary> {
  const res = await api.get<WeeklySummary>("/reflections/weekly");
  return res.data;
}

export async function getInsights(): Promise<Insights> {
  const res = await api.get<Insights>("/reflections/insights");
  return res.data;
}
