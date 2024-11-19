import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack, useNavigation, useRouter} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import 'react-native-reanimated';

import {useColorScheme} from '@/hooks/useColorScheme';
import {Colors} from "@/constants/Colors";
import {StatusBar} from "expo-status-bar";
import {TouchableOpacity, Text} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Provider, useSelector} from "react-redux";
import store from "@/redux/store";
import {AuthProvider, useAuth} from "@/contexts/AuthProvider";
import ProtectedRoute from "@/contexts/ProtectedRoute";
import {useNavigationState} from "@react-navigation/core";
import WebSocketProvider from "@/contexts/WebsocketProvider";


SplashScreen.preventAutoHideAsync();

 function RootLayoutComponent() {
    const state = useSelector((state: any) => state.core)
    const colorScheme = useColorScheme();
    const router = useRouter();
    const navigation  = useNavigation()
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });
    const {logout}=useAuth()

    // List of protected routes
    const publicRoutes = [
        'index',
        'auth/loginScreen',
        'auth/AuthAfterLoginWithGoogleScreen',
        '+not-found',
        undefined,
        // add any other protected routes here
    ];
     const loginType = useSelector((state: any) => state.core.loginType);
    // Track current route
    const currentRoute = useNavigationState(state2 => {
        const route = state2?.routes[state2.index];
        console.log("JJJJJJJJJJJJ----> ",route?.name)
        return route?.name;
    });
    const isAuthenticated=():boolean=>{
        return state.loginType !== "";

    }
    const handleRouteChange = () => {
        // Fetch or update `currentRoute` as per navigation state
        if (!publicRoutes.includes(currentRoute) && !isAuthenticated()) {
            router.replace('auth/loginScreen' as never); // Redirect to login if not authenticated
        }
    };
    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }else {
            return
        }
        handleRouteChange();
    }, [loaded,currentRoute,loginType]);



    const getOptions = (title: string, headerShow: boolean, headerBgColor?: string) => {
        return {
            headerShown: headerShow,
            title: title,
            headerStyle: {
                backgroundColor: headerBgColor ? headerBgColor : Colors.brand.background,
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
                <TouchableOpacity style={{paddingHorizontal: 15}} onPress={() => { /* Handle back action */
                }}>
                    <Ionicons name="chevron-back" size={24} color={Colors.brand.dark}/>
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity style={{paddingHorizontal: 15}} onPress={() => { logout()}}>
                    <Text style={{color: 'red', fontWeight: 'bold'}}>Log out <AntDesign name="logout" size={12}
                                                                                        color={Colors.brand.red}/></Text>
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
                            <Stack.Screen name="index" options={{headerShown: false}}/>
                            <Stack.Screen name="auth/loginScreen" options={getOptions("Login", true)}/>
                            <Stack.Screen name="auth/AuthAfterLoginWithGoogleScreen"
                                          options={getOptions("Telco Login Profile", true)}/>
                            <Stack.Screen name="auth/AuthAfterLoginNormalScreen"
                                          options={getOptions("Telco Login Profile #", true)}/>

                            {/* Protected Routes */}

                                <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                                <Stack.Screen name="home/HomeWorkerScreen"
                                              options={getOptions2("Home", true, Colors.brand.white)}/>
                                <Stack.Screen name="sales/SaleProcess1Type"
                                              options={getOptions("Sale step 2 Type ", true)}/>
                                <Stack.Screen name="sales/SaleNetworkScreen"
                                              options={getOptions("Sale step 1 Network", true)}/>
                                <Stack.Screen name="sales/SaleRechargeNumberScreen"
                                              options={getOptions("Sale step 3 Recharge number", true)}/>
                                <Stack.Screen name="sales/SaleProductScreen"
                                              options={getOptions("Sale step 4 Product", true)}/>
                                <Stack.Screen name="sales/SaleResultSuccessScreen"
                                              options={getOptions("Sale step 5 Result success", true)}/>

                                <Stack.Screen name="settings/SettingMenuScreen"
                                              options={getOptions("Setting Menus", true)}/>
                                <Stack.Screen name="settings/SettingSellerScreen"
                                              options={getOptions("Manage Seller", true)}/>
                            <Stack.Screen name="settings/SettingManageCompanyScreen"
                                          options={getOptions("Manage Organization", true)}/>
                            <Stack.Screen name="settings/SettingManageDealerScreen"
                                          options={getOptions("Manage Dealer", true)}/>
                            <Stack.Screen name="settings/SettingManageSubdealerScreen"
                                          options={getOptions("Manage Subdealer", true)}/>
                            <Stack.Screen name="settings/SettingManageSupervisorScreen"
                                          options={getOptions("Manage Supervisor", true)}/>



                                <Stack.Screen name="settings/additional/AddUserScreen"
                                              options={getOptions("Setting Add User", true)}/>

                            <Stack.Screen name="+not-found"/>
                        </Stack>
                    </ThemeProvider>
        </>
    );
}

export default function RootLayout(){
    return (
        <Provider store={store}>
            <AuthProvider>
                <WebSocketProvider />
                <RootLayoutComponent />
            </AuthProvider>
        </Provider>
    );
}

