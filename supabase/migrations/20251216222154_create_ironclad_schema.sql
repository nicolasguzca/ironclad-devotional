/*
  # Ironclad Devotional App Schema

  1. New Tables
    - `devotionals`
      - `id` (uuid, primary key)
      - `title` (text)
      - `subtitle` (text)
      - `scripture_reference` (text)
      - `scripture_text` (text)
      - `content` (text)
      - `prayer` (text)
      - `image_url` (text)
      - `series` (text)
      - `date` (date)
      - `read_time` (integer) - in minutes
      - `is_premium` (boolean)
      - `created_at` (timestamptz)
      
    - `videos`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `pastor` (text)
      - `thumbnail_url` (text)
      - `duration` (integer) - in seconds
      - `views` (integer)
      - `category` (text)
      - `is_premium` (boolean)
      - `created_at` (timestamptz)
      
    - `user_progress`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `devotional_id` (uuid, references devotionals)
      - `completed` (boolean)
      - `progress_percentage` (integer)
      - `completed_at` (timestamptz)
      - `created_at` (timestamptz)
      
    - `user_stats`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users, unique)
      - `current_streak` (integer)
      - `longest_streak` (integer)
      - `total_devotionals_completed` (integer)
      - `goal_percentage` (integer)
      - `last_activity_date` (date)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      
    - `user_profiles`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users, unique)
      - `display_name` (text)
      - `avatar_url` (text)
      - `is_premium` (boolean)
      - `member_since` (date)
      - `bible_translation` (text)
      - `daily_reminder_enabled` (boolean)
      - `reminder_time` (time)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create devotionals table
CREATE TABLE IF NOT EXISTS devotionals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text,
  scripture_reference text NOT NULL,
  scripture_text text NOT NULL,
  content text NOT NULL,
  prayer text,
  image_url text,
  series text,
  date date NOT NULL DEFAULT CURRENT_DATE,
  read_time integer DEFAULT 5,
  is_premium boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create videos table
CREATE TABLE IF NOT EXISTS videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  pastor text NOT NULL,
  thumbnail_url text,
  duration integer NOT NULL,
  views integer DEFAULT 0,
  category text NOT NULL,
  is_premium boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create user_progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  devotional_id uuid REFERENCES devotionals NOT NULL,
  completed boolean DEFAULT false,
  progress_percentage integer DEFAULT 0,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, devotional_id)
);

-- Create user_stats table
CREATE TABLE IF NOT EXISTS user_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL UNIQUE,
  current_streak integer DEFAULT 0,
  longest_streak integer DEFAULT 0,
  total_devotionals_completed integer DEFAULT 0,
  goal_percentage integer DEFAULT 0,
  last_activity_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL UNIQUE,
  display_name text NOT NULL,
  avatar_url text,
  is_premium boolean DEFAULT false,
  member_since date DEFAULT CURRENT_DATE,
  bible_translation text DEFAULT 'ESV',
  daily_reminder_enabled boolean DEFAULT true,
  reminder_time time DEFAULT '07:00:00',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE devotionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Devotionals policies (public read)
CREATE POLICY "Anyone can view devotionals"
  ON devotionals FOR SELECT
  TO authenticated
  USING (true);

-- Videos policies (public read)
CREATE POLICY "Anyone can view videos"
  ON videos FOR SELECT
  TO authenticated
  USING (true);

-- User progress policies
CREATE POLICY "Users can view own progress"
  ON user_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON user_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- User stats policies
CREATE POLICY "Users can view own stats"
  ON user_stats FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own stats"
  ON user_stats FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own stats"
  ON user_stats FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- User profiles policies
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Insert sample devotionals
INSERT INTO devotionals (title, subtitle, scripture_reference, scripture_text, content, prayer, image_url, series, date, read_time, is_premium) VALUES
('Strength in Stillness', 'Part 3 • The Man of God Series', 'Psalm 46:10', 'Be still, and know that I am God. I will be exalted among the nations, I will be exalted in the earth!', 'In our modern world of constant motion and noise, the concept of stillness can seem counterintuitive. We equate busyness with productivity and silence with emptiness. Yet God calls us to something different - to be still and know that He is God.

This isn''t a passive stillness, but an active trust. It''s about quieting the chaos around us and within us to hear God''s voice more clearly. When we''re constantly moving, we can miss the subtle ways God is working in our lives.

Consider the prophet Elijah, who found God not in the earthquake, wind, or fire, but in the gentle whisper. Our strength isn''t found in our constant striving, but in our ability to rest in God''s sovereignty and trust His timing.', 'Lord, help me to be still before You today. In the midst of my busy schedule and endless to-do lists, grant me the wisdom to pause and recognize Your presence. Teach me that my strength comes not from my efforts, but from knowing You. Amen.', 'https://images.pexels.com/photos/1906794/pexels-photo-1906794.jpeg', 'The Man of God', '2023-10-25', 5, false),
('Walking in Integrity', 'The Walk Series', 'Proverbs 10:9', 'Whoever walks in integrity walks securely, but he who makes his ways crooked will be found out.', 'Integrity is often described as doing the right thing when no one is watching. It''s about the consistency of character, ensuring that our outer life matches our inner convictions. When we compartmentalize our lives, presenting one version of ourselves at church and another at work, we create fissures in our foundation.

In a world that often rewards shortcuts and surface-level success, walking in integrity can feel like a disadvantage. You might see others getting ahead by bending the rules or shading the truth.

However, scripture reminds us that the security found in honesty far outweighs the temporary gains of deceit. A life of integrity is a life free from the fear of being "found out." It is a life of peace.', 'Lord, help me to walk in integrity today. Give me the courage to be honest even when it costs me, and the wisdom to value a clean conscience over a quick win. Amen.', 'https://images.pexels.com/photos/1438408/pexels-photo-1438408.jpeg', 'The Walk', '2023-10-04', 5, false),
('The Cost of Compromise', 'Deep Dive Series', 'Daniel 1:8', 'But Daniel resolved that he would not defile himself with the king''s food, or with the wine that he drank. Therefore he asked the chief of the eunuchs to allow him not to defile himself.', 'Daniel faced a critical decision in Babylon. He could have easily justified compromising his convictions - after all, he was far from home, and who would know? Yet he understood that compromise isn''t about who''s watching, but about who we''re becoming.

Every compromise we make shapes our character. Small concessions become patterns, patterns become habits, and habits become our character. Daniel knew that the food laws weren''t just about diet; they represented his covenant relationship with God.

As men, we face countless opportunities to compromise daily. It might be in our business dealings, our entertainment choices, or how we speak about others when they''re not present. Each decision either reinforces our integrity or chips away at it.', 'Father, give me the courage of Daniel to stand firm in my convictions, even when it''s costly. Help me see that every compromise shapes who I''m becoming, and grant me the strength to honor You in all circumstances. Amen.', 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg', 'Theological Deep Dive', '2023-10-12', 8, true);

-- Insert sample videos
INSERT INTO videos (title, description, pastor, thumbnail_url, duration, views, category, is_premium) VALUES
('Walking in Unwavering Faith', 'Exploring what it means to trust God completely in every circumstance', 'Pastor David Miller', 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg', 1935, 1243, 'Daily', false),
('The Book of James: Part 3', 'Continuing our journey through practical Christian living', 'Dr. Robert Smith', 'https://images.pexels.com/photos/1112048/pexels-photo-1112048.jpeg', 720, 856, 'Daily', false),
('Power of Prayer', 'Understanding the transformative power of consistent prayer', 'Rev. James Wilson', 'https://images.pexels.com/photos/3184193/pexels-photo-3184193.jpeg', 1125, 2104, 'Spiritual', false),
('Manhood in 21st Century', 'A panel discussion on biblical manhood in modern culture', 'Panel Discussion', 'https://images.pexels.com/photos/1708820/pexels-photo-1708820.jpeg', 2700, 3421, 'Lifestyle', false),
('Finding Peace', 'Discovering God''s peace in the midst of life''s storms', 'Pastor Sarah Jenkins', 'https://images.pexels.com/photos/1906794/pexels-photo-1906794.jpeg', 1330, 1876, 'Wellness', false),
('Marriage Workshop: Communication', 'Building stronger marriages through biblical communication', 'Dr. Mark Thompson', 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg', 3600, 945, 'Marriage', true),
('Leading Your Family', 'Biblical principles for spiritual leadership at home', 'Michael Thompson', 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg', 1800, 1654, 'Marriage', true);