# Reflecta API Documentation

Base URL: `http://localhost:4000/api`

All requests require `Authorization: Bearer <token>` header (handled automatically by the API interceptor).

---

## Authentication

### Login

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response:**
```json
{
  "token": "jwt_token_string",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "user@example.com"
  }
}
```

**Error Response:**
```json
{
  "message": "Invalid credentials"
}
```

---

### Register

**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response:**
```json
{
  "token": "jwt_token_string",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "user@example.com"
  }
}
```

**Error Response:**
```json
{
  "message": "Email already exists"
}
```

---

## Reflections

### Create Reflection

**Endpoint:** `POST /reflections`

**Used by:** Journal screen when user saves an entry

**Request Body:**
```json
{
  "mood": 3,
  "note": "Had a productive day at work today..."
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `mood` | integer | Yes | Mood value (1-5) |
| `note` | string | Yes | Journal entry text (max 500 chars) |

**Mood Values:**
| Value | Emoji | Label |
|-------|-------|-------|
| 1 | 😔 | Sad |
| 2 | 😕 | Pensive |
| 3 | 😐 | Neutral |
| 4 | 🙂 | Calm |
| 5 | ✨ | Radiant |

**Success Response:**
```json
{
  "id": "reflection_id",
  "mood": 3,
  "note": "Had a productive day at work today...",
  "createdAt": "2026-02-06T10:30:00Z",
  "userId": "user_id"
}
```

**Error Response:**
```json
{
  "message": "Failed to save reflection"
}
```

---

### Get Insights

**Endpoint:** `GET /reflections/insights`

**Used by:** Insights screen to display mood distribution and analysis

**Success Response:**
```json
{
  "moodDistribution": [
    { "day": "Mon", "value": 65, "color": "#6D5D8B" },
    { "day": "Tue", "value": 80, "color": "#6D5D8B" },
    { "day": "Wed", "value": 50, "color": "#6D5D8B" },
    { "day": "Thu", "value": 70, "color": "#6D5D8B" },
    { "day": "Fri", "value": 45, "color": "#C9A24D" },
    { "day": "Sat", "value": 90, "color": "#6D5D8B" },
    { "day": "Sun", "value": 85, "color": "#6D5D8B" }
  ],
  "moodUplift": {
    "value": "+24%",
    "title": "Exercise correlates with higher mood",
    "description": "On days you logged physical activity, your baseline mood was significantly higher than inactive days."
  },
  "aiInsight": "Do these patterns resonate with you today?"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `moodDistribution` | array | Weekly mood values for bar chart |
| `moodDistribution[].day` | string | Day abbreviation (Mon, Tue, Wed, Thu, Fri, Sat, Sun) |
| `moodDistribution[].value` | number | Mood percentage (0-100 scale) |
| `moodDistribution[].color` | string | Hex color for the bar (e.g., "#6D5D8B") |
| `moodUplift` | object | Activity insight card data |
| `moodUplift.value` | string | Stat value (e.g., "+24%", "3.5x") |
| `moodUplift.title` | string | Insight headline |
| `moodUplift.description` | string | Detailed explanation text |
| `aiInsight` | string | AI-generated reflective question |

**Error Response:**
```json
{
  "message": "Failed to load insights"
}
```

---

### Get Weekly Summary

**Endpoint:** `GET /reflections/weekly`

**Used by:** Weekly screen to display week overview with chart and stats

**Success Response:**
```json
{
  "weeklyData": [
    { "day": "MON", "mood": 2.5 },
    { "day": "TUE", "mood": 3.2 },
    { "day": "WED", "mood": 3.8 },
    { "day": "THU", "mood": 3.5 },
    { "day": "FRI", "mood": 2.8 },
    { "day": "SAT", "mood": 3.0 },
    { "day": "SUN", "mood": 4.5 }
  ],
  "dateRange": "Feb 12 — Feb 18",
  "avgMood": "Positive",
  "topEmotion": "Calm",
  "reflections": "14 Posts",
  "streak": "8 Days",
  "insight": "You felt more creative mid-week, often associated with your morning journaling habit. Notice how your calm state on Sunday correlates with your digital detox."
}
```

| Field | Type | Description |
|-------|------|-------------|
| `weeklyData` | array | Daily mood data for line/area chart |
| `weeklyData[].day` | string | Day abbreviation uppercase (MON, TUE, WED, THU, FRI, SAT, SUN) |
| `weeklyData[].mood` | number | Mood score (1.0 - 5.0 scale, decimals allowed) |
| `dateRange` | string | Display string for week range (e.g., "Feb 12 — Feb 18") |
| `avgMood` | string | Average mood label (e.g., "Positive", "Neutral", "Low") |
| `topEmotion` | string | Most frequent emotion (e.g., "Calm", "Content", "Anxious") |
| `reflections` | string | Reflection count with label (e.g., "14 Posts") |
| `streak` | string | Current streak with label (e.g., "8 Days") |
| `insight` | string | AI-generated weekly insight/summary text |

**Error Response:**
```json
{
  "message": "Failed to load weekly summary"
}
```

---

## Screen → API Mapping

| Screen | API Endpoint | Method | Description |
|--------|--------------|--------|-------------|
| Login | `/auth/login` | POST | User authentication |
| Signup | `/auth/register` | POST | User registration |
| Home | — | — | No API calls (mood selection only) |
| Journal | `/reflections` | POST | Save reflection entry |
| Insights | `/reflections/insights` | GET | Load mood insights |
| Weekly | `/reflections/weekly` | GET | Load weekly summary |

---

## Error Handling

All error responses follow this format:

```json
{
  "message": "Human-readable error description"
}
```

The app displays this message in an Alert dialog to the user.

---

## Notes

- Token is stored in `expo-secure-store` under key `"token"`
- Token is automatically attached to all requests via axios interceptor
- All timestamps are in ISO 8601 format (UTC)
- Mood values use 1-5 scale internally, converted to percentages (0-100) for charts where needed
