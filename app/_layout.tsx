import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import {Colors} from "@/constants/Colors";
import {StatusBar} from "expo-status-bar";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  const getOptions = (title: string, headerShow: boolean,headerBgColor?:string) => {
    return {
      headerShown: headerShow,
      title: title,
      headerStyle: {
        backgroundColor:headerBgColor?headerBgColor: Colors.brand.background,
      },
      headerTintColor: Colors.brand.dark,
    }
  }

  if (!loaded) {
    return null;
  }

  return (
      <>
        {colorScheme === 'dark' ? (
            <StatusBar style="light" backgroundColor={"white"} translucent={true}/>
        ) : (
            <StatusBar style="dark" backgroundColor={"white"} translucent={true}/>
        )}
      <ThemeProvider value={colorScheme === 'dark' ? DefaultTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="auth/loginScreen" options={getOptions("Login Telco",true)} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
        </>
  );
}
