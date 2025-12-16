import { View, Text, StyleSheet } from 'react-native';
import { Link, Stack } from 'expo-router';
import { neumorphicColors } from '@/constants/neumorphic';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text style={styles.title}>This screen doesn't exist.</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go to home screen</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: neumorphicColors.background,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: neumorphicColors.text.primary,
    marginBottom: 16,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 16,
    fontWeight: '600',
    color: neumorphicColors.accent.primary,
  },
});
