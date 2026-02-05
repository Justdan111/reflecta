import api from "@/lib/api";


export async function createReflection(mood: number, note: string) {
  const res = await api.post("/reflections", { mood, note });
  return res.data;
}

export async function getWeeklySummary() {
  const res = await api.get("/reflections/weekly");
  return res.data;
}

export async function getInsights() {
  const res = await api.get("/reflections/insights");
  return res.data;
}
