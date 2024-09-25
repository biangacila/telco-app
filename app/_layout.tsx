import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import {Colors} from "@/constants/Colors";
import {StatusBar} from "expo-status-bar";
import {TouchableOpacity,Text} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from 'react-native-vector-icons/AntDesign';

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

  const getOptions2 = (title: string, headerShow: boolean, headerBgColor?: string) => {
    return {
      headerShown: headerShow,
      title: title,
      headerStyle: {
        backgroundColor: headerBgColor ? headerBgColor : Colors.brand.background,
      },
      headerTintColor: Colors.brand.dark,
      headerLeft: () => (
          <TouchableOpacity style={{ paddingHorizontal: 15 }} onPress={() => { /* Handle back action */ }}>
            <Ionicons name="chevron-back" size={24} color={Colors.brand.dark} />
          </TouchableOpacity>
      ),
      headerRight: () => (
          <TouchableOpacity style={{ paddingHorizontal: 15 }} onPress={() => { /* Handle log out */ }}>
            <Text style={{ color: 'red', fontWeight: 'bold' }}>Log out <AntDesign name="logout" size={12} color={Colors.brand.red} /></Text>
          </TouchableOpacity>
      ),
    };
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
          <Stack.Screen name="auth/loginScreen" options={getOptions("Login",true)} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="home/HomeWorkerScreen" options={getOptions2("Home",true,Colors.brand.white)} />
          <Stack.Screen name="sales/SaleProcess1Type" options={getOptions("Sale step 2 Type ",true)} />
          <Stack.Screen name="sales/SaleNetworkScreen" options={getOptions("Sale step 1 Network",true)} />
          <Stack.Screen name="sales/SaleRechargeNumberScreen" options={getOptions("Sale step 3 Recharge number",true)} />
          <Stack.Screen name="sales/SaleProductScreen" options={getOptions("Sale step 4 Product",true)} />
          <Stack.Screen name="sales/SaleResultSuccessScreen" options={getOptions("Sale step 5 Result success",true)} />

          <Stack.Screen name="settings/SettingMenuScreen" options={getOptions("Settings ",true)} />

          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
        </>
  );
}
