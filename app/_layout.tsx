import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { AppProvider } from '@/contexts/app-context';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return (
    <AppProvider>
      <ThemeProvider value={DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="devotional/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="paywall" options={{ presentation: 'modal', headerShown: false }} />
        </Stack>
        <StatusBar style="dark" />
      </ThemeProvider>
    </AppProvider>
  );
}
