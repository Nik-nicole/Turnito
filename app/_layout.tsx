// app/_layout.tsx  (o donde tengas RootLayout)
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import 'react-native-reanimated';

import SplashAnimation from '@/components/animations/splashAnimation';
import { useColorScheme } from '@/hooks/theme/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Oculta splash nativo rápido para usar overlay JS
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          <Stack.Screen name="Instructions" options={{ headerShown: false }} />
        </Stack>

        <SplashAnimation
          visible={showSplash}
          onFinish={() => setShowSplash(false)}
          logoSource={require('../assets/images/Logo.png')}
          backgroundColor="#8C52FF"
        />
      </View>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
