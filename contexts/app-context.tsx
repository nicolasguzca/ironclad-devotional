import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';

interface UserProfile {
  id: string;
  user_id: string;
  display_name: string;
  avatar_url: string | null;
  is_premium: boolean;
  member_since: string;
  bible_translation: string;
  daily_reminder_enabled: boolean;
  reminder_time: string;
}

interface UserStats {
  current_streak: number;
  longest_streak: number;
  total_devotionals_completed: number;
  goal_percentage: number;
  last_activity_date: string | null;
}

interface AppContextType {
  isPremium: boolean;
  setIsPremium: (value: boolean) => void;
  userProfile: UserProfile | null;
  userStats: UserStats | null;
  isLoading: boolean;
  refreshUserData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isPremium, setIsPremium] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUserData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (profile) {
          setUserProfile(profile);
          setIsPremium(profile.is_premium);
        }

        const { data: stats } = await supabase
          .from('user_stats')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (stats) {
          setUserStats(stats);
        } else {
          setUserStats({
            current_streak: 12,
            longest_streak: 15,
            total_devotionals_completed: 45,
            goal_percentage: 85,
            last_activity_date: new Date().toISOString().split('T')[0]
          });
        }
      } else {
        setUserProfile({
          id: 'mock-id',
          user_id: 'mock-user-id',
          display_name: 'David',
          avatar_url: null,
          is_premium: false,
          member_since: '2023-01-01',
          bible_translation: 'ESV',
          daily_reminder_enabled: true,
          reminder_time: '07:00:00'
        });
        setUserStats({
          current_streak: 12,
          longest_streak: 15,
          total_devotionals_completed: 45,
          goal_percentage: 85,
          last_activity_date: new Date().toISOString().split('T')[0]
        });
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      setUserProfile({
        id: 'mock-id',
        user_id: 'mock-user-id',
        display_name: 'David',
        avatar_url: null,
        is_premium: false,
        member_since: '2023-01-01',
        bible_translation: 'ESV',
        daily_reminder_enabled: true,
        reminder_time: '07:00:00'
      });
      setUserStats({
        current_streak: 12,
        longest_streak: 15,
        total_devotionals_completed: 45,
        goal_percentage: 85,
        last_activity_date: new Date().toISOString().split('T')[0]
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUserData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        isPremium,
        setIsPremium,
        userProfile,
        userStats,
        isLoading,
        refreshUserData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
