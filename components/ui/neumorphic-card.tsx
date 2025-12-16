import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { neumorphicColors, neumorphicShadows } from '@/constants/neumorphic';

interface NeumorphicCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  pressed?: boolean;
}

export function NeumorphicCard({ children, style, pressed = false }: NeumorphicCardProps) {
  return (
    <View
      style={[
        styles.card,
        pressed ? styles.pressed : styles.raised,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: neumorphicColors.background,
    borderRadius: 16,
    padding: 16,
  },
  raised: {
    ...neumorphicShadows.card,
  },
  pressed: {
    ...neumorphicShadows.pressed,
  },
});
