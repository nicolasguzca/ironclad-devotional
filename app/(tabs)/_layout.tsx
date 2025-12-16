import { Tabs } from 'expo-router';
import React from 'react';
import { Home, Book, PlaySquare, User, Calendar } from 'lucide-react-native';
import { neumorphicColors } from '@/constants/neumorphic';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: neumorphicColors.accent.primary,
        tabBarInactiveTintColor: neumorphicColors.text.tertiary,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: neumorphicColors.background,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="bible"
        options={{
          title: 'Bible',
          tabBarIcon: ({ color, size }) => <Book size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendar',
          tabBarIcon: ({ color, size }) => <Calendar size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: 'Library',
          tabBarIcon: ({ color, size }) => <PlaySquare size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
