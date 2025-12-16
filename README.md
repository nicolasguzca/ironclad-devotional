# Ironclad - Men's Devotional App

A beautifully designed mobile devotional app for men, featuring light neumorphic UI design, daily devotionals, Bible reading, video sermons, and progress tracking.

## Features

### Core Functionality
- **Daily Devotionals**: Access daily devotional content with scripture, reflections, and prayers
- **Bible Reader**: Read the Bible with selectable translations and premium study notes
- **Video Library**: Watch sermon videos organized by categories with continue watching feature
- **Calendar View**: Track your devotional progress with streak counter and goal tracking
- **Profile Settings**: Customize your experience with bible translation, reminders, and preferences

### Freemium Model
- Free tier includes daily devotionals, Bible reading, and select videos
- Premium features include:
  - Theological deep dives
  - Bible study notes and commentary
  - Full video library access
  - Ad-free experience
  - Offline downloads

### Premium Content Locking
- Lock icons indicate premium-only content
- Clicking locked content shows the paywall modal
- Toggle premium status from paywall for testing

## Technical Stack

- **Framework**: Expo (React Native)
- **Navigation**: Expo Router with tab-based navigation
- **Database**: Supabase (PostgreSQL)
- **Styling**: React Native StyleSheet with neumorphic design system
- **Icons**: Lucide React Native

## Design System

### Neumorphic Light Theme
- Background color: `#E0E5EC`
- Soft shadows for depth and elevation
- Rounded corners (12-20px border radius)
- Blue accent color: `#3B82F6`

### Color Palette
- Primary text: `#1A202C`
- Secondary text: `#4A5568`
- Tertiary text: `#718096`
- Accent blue: `#3B82F6`
- Success green: `#10B981`

## Screens

### Home (Dashboard)
- Personalized greeting with user avatar
- Horizontal date selector
- Featured daily devotional card with progress tracking
- Verse of the day
- Quick action cards (Bible, Videos, Prayer, Community)

### Calendar
- Month view with navigation
- Streak counter and goal tracking cards
- Visual progress indicators
- Daily devotional preview

### Bible
- Chapter and verse display
- Translation selector
- Premium study notes (locked for free users)
- Navigation between chapters

### Library (Watch)
- Search and category filters
- Featured sermon
- Continue watching section
- Latest sermons list
- Premium content marked with lock icons

### Profile (Settings)
- User profile with avatar
- Account settings (email, password)
- Devotional preferences (translation, reminders)
- App preferences (autoplay, dark mode)
- Support and legal links

### Devotional Detail
- Full-screen devotional reading experience
- Hero image
- Scripture highlight with bookmark/copy actions
- Multiple content paragraphs
- Related video suggestion
- Daily prayer section
- "Complete Day" action button

### Paywall Modal
- Premium feature list with checkmarks
- Pricing card with annual plan
- Call-to-action button
- Restore purchases option
- Terms and disclaimer

## Database Schema

### Tables
- `devotionals`: Daily devotional content
- `videos`: Sermon and teaching videos
- `user_progress`: Track user's devotional completion
- `user_stats`: Streak and goal tracking
- `user_profiles`: User preferences and settings

### Row Level Security
All tables have RLS enabled with policies for authenticated users to manage their own data.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. The app will open in Expo Go on your device or simulator

## Environment Variables

The following environment variables are configured in `.env`:
- `EXPO_PUBLIC_SUPABASE_URL`: Supabase project URL
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous key

## Premium Testing

To test premium features:
1. Navigate to any locked content
2. Tap the locked item to open the paywall
3. Click "Start Free Trial" button
4. The app will upgrade to premium mode
5. Access all previously locked content

## Project Structure

```
app/
├── (tabs)/              # Tab navigation screens
│   ├── index.tsx       # Home/Dashboard
│   ├── bible.tsx       # Bible Reader
│   ├── calendar.tsx    # Progress Calendar
│   ├── library.tsx     # Video Library
│   └── profile.tsx     # Settings
├── devotional/
│   └── [id].tsx        # Devotional detail
├── paywall.tsx         # Premium upgrade modal
└── _layout.tsx         # Root layout

components/
└── ui/                 # Reusable UI components
    ├── neumorphic-card.tsx
    └── neumorphic-button.tsx

contexts/
└── app-context.tsx     # Global state management

constants/
├── neumorphic.ts       # Design system
└── theme.ts            # Theme configuration

lib/
└── supabase.ts         # Supabase client
```

## License

Private project - All rights reserved
