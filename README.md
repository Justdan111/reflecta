# Reflecta

A privacy-focused mood journaling app for iOS and Android. Check in with how you're feeling each day, write a short reflection, and see your mood trends and insights over time.

Built with **Expo** (React Native), **expo-router** for navigation, and **NativeWind** (Tailwind) for styling.

---

## What it does

- **Daily check-in** — Pick a mood (1–5) and write a short note about your day.
- **Journal** — Capture a reflection tied to the mood you selected.
- **Weekly summary** — See your week at a glance: mood chart, average mood, top emotion, reflection count, and streak.
- **Insights** — Mood distribution across the week plus an AI-generated insight.
- **Settings** — Reminders, biometric lock, data export, and account options.
- **Auth** — Email/password login and signup, with the session token stored securely on-device.

---

## Getting started

```bash
npm install       # install dependencies
npm start         # start the Expo dev server
```

Then open the app in one of:

- **iOS simulator** — `npm run ios`
- **Android emulator** — `npm run android`
- **Web** — `npm run web`
- **Expo Go** — scan the QR code from `npm start`

### Backend

The app talks to a REST API. Set the URL in [lib/api.ts](lib/api.ts):

```ts
const API_URL = "http://localhost:4000/api";
```

- iOS simulator: `localhost`
- Android emulator: `10.0.2.2`
- Physical device: your computer's local IP

The backend itself is **not** part of this repo — you need to run it separately.

---

## Project structure

```
app/                     Screens (file-based routing via expo-router)
  _layout.tsx            Root stack: (auth) + (tab) groups
  index.tsx              Entry — redirects based on auth state
  (auth)/                Login & signup screens
    login.tsx
    signup.tsx
  (tab)/                 Main tab navigation (requires auth)
    home.tsx             Daily mood check-in + weekly stats
    journal.tsx          Write & save a reflection
    weekly.tsx           Weekly summary (hidden from tab bar)
    insights.tsx         Mood distribution + AI insight
    settings.tsx         Preferences & account
components/              Reusable UI (charts, stat cards, mood selector)
lib/api.ts               Axios client + auth token interceptors
services/
  auth.ts                login / register / logout / profile
  reflection.ts          create reflection, weekly summary, insights
assets/                  Icons & images
```

---

## How it works

### Navigation & auth

- [app/index.tsx](app/index.tsx) checks for a stored token and redirects to either the login screen or the home tabs.
- [app/(tab)/_layout.tsx](app/(tab)/_layout.tsx) guards the tab group — no token means a redirect back to login.
- Screens live in route groups: `(auth)` for logged-out screens, `(tab)` for the main app.

### API layer

[lib/api.ts](lib/api.ts) creates a shared Axios instance with two interceptors:

- **Request** — attaches the stored `Bearer` token to every call.
- **Response** — on a `401`, clears the saved token and user (logging the user out).

Tokens and user data are kept in the device keychain via `expo-secure-store`.

### Services

Screens call typed helper functions rather than Axios directly:

| Function | Endpoint | Purpose |
|---|---|---|
| `login(email, password)` | `POST /auth/login` | Sign in, store token |
| `register(name, email, password)` | `POST /auth/register` | Sign up, store token |
| `getProfile()` | `GET /auth/profile` | Current user |
| `createReflection(mood, note)` | `POST /reflections` | Save a check-in (mood 1–5, note ≤ 500 chars) |
| `getWeeklySummary()` | `GET /reflections/weekly` | Weekly chart + stats |
| `getInsights()` | `GET /reflections/insights` | Mood distribution + AI insight |

---

## Design notes

- **Theme** — dark UI throughout. Background `#121212`, accent purple `#6D5D8B`, gold `#C9A24D`.
- **Moods** — scored 1 (Sad) to 5 (Radiant), shown as emoji on the home screen.
- **Animations** — `react-native-reanimated` powers entrance transitions and press feedback.
- **Loading & empty states** — each data screen handles loading spinners, retry-on-error, and friendly empty states when there's no data yet.

---

## Tech stack

- Expo SDK 54 / React Native 0.81 / React 19
- expo-router (typed routes, React Compiler enabled)
- NativeWind + Tailwind CSS
- Axios for HTTP
- expo-secure-store for token storage
- react-native-reanimated for animations
- react-native-feather & @expo/vector-icons for icons
