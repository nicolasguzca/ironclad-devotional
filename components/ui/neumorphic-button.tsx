import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { neumorphicColors, neumorphicShadows } from '@/constants/neumorphic';

interface NeumorphicButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  variant?: 'primary' | 'secondary';
}

export function NeumorphicButton({
  title,
  onPress,
  style,
  textStyle,
  variant = 'primary'
}: NeumorphicButtonProps) {
  const [pressed, setPressed] = useState(false);

  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'primary' ? styles.primaryButton : styles.secondaryButton,
        pressed && styles.pressed,
        style,
      ]}
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      activeOpacity={1}
    >
      <Text style={[
        styles.text,
        variant === 'primary' ? styles.primaryText : styles.secondaryText,
        textStyle
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: neumorphicColors.accent.primary,
    ...neumorphicShadows.card,
  },
  secondaryButton: {
    backgroundColor: neumorphicColors.background,
    ...neumorphicShadows.card,
  },
  pressed: {
    ...neumorphicShadows.pressed,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: neumorphicColors.text.primary,
  },
});
