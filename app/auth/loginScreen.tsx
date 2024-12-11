import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions} from 'react-native';
import {Colors} from "@/constants/Colors";
import {useFocusEffect, useNavigation} from "expo-router";
import RoundedIcon from "@/components/public/RoundedIcon";
import {links} from "@/constants/links";
import {LineWithTextMiddle} from "@/components/public/LineWithTextMiddle";
import LoginWithProvider from "@/components/auth/LoginWithProvider";
import {isUserHasLogin, logoutFromPreviewLogin} from "@/services/service_auth";
import {bool} from "prop-types";
import {CompanyType, User2} from "@/types/type-model";
import {initialUser2} from "@/types/type_initialize";
import GenericButton from "@/components/FormInputs/GenericButton";
import {ReduxSetCurrentCompany, ReduxSetLoginToken, ReduxSetLoginWithProvider} from "@/redux/actions";
import {useDispatch} from "react-redux";
import PanelSelector from "@/components/settings/PanelSelector";
import {getTransactionDateTime, loadCompanies} from "@/services/functions";
import {FetchDataFromDomainDrivenPostWithError} from "@/services/service-domain-driven";
import {SERVER_AUTH_SERVICE} from "@/config/server-connection";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BarVersionController from "@/components/common/BarVersionController";


const {width, height} = Dimensions.get("screen")
export default function LoginScreen() {
    const [sync, setSync] = useState(false)
    const [hasLogin, setHasLogin] = useState(false);
    const [storeToken, setStoreToken] = useState("");
    const [storeUser, setStoreUser] = useState<User2>(initialUser2);
    const [continueWithLogin, setContinueWithLogin] = useState(false);
    const [DataCompanies, setDataCompanies] = useState<CompanyType[]>([])
    const [InputUsername,setInputUsername]=useState("")
    const [InputPassword,setInputPassword]=useState("")
    const navigation = useNavigation();
    const dispatch = useDispatch()

    // Example usage
    const transactionNumber = "TCS-BT8001-UC10011-UC10011-S2726-0679876138-700-1733412081";
    const dateTime = getTransactionDateTime(transactionNumber);
    console.log(`((::- Transaction Date and Time: ${dateTime.date+" "+dateTime.time}`);

    useFocusEffect(
        useCallback(() => {
            console.log('Screen is focused');
            // Perform any actions here
            initialFetchData().then(null);

            return () => {
                console.log('Screen is unfocused');
                // Perform cleanup actions here
            };
        }, [])
    );

    const initialFetchData=async ()=>{
        if (!sync) {
            setSync(true)
            isUserHasLogin((ok: boolean, user: User2, token: string) => {
                console.log("!>isUserHasLogin > ", ok, user, token);
                if (ok) {
                    setHasLogin(ok)
                    setStoreUser(user)
                    setStoreToken(token)
                    navigation.navigate("auth/AuthAfterLoginNormalScreen2" as never)
                }
            }).then(() => {
                console.log("Am done isUserHasLogin");
            })
        }
    }

    useEffect(() => {
        /*if (!sync) {
            setSync(true)
            isUserHasLogin((ok: boolean, user: User2, token: string) => {
                console.log("!>isUserHasLogin > ", ok, user, token);
                if (ok) {
                    setHasLogin(ok)
                    setStoreUser(user)
                    setStoreToken(token)
                    navigation.navigate("auth/AuthAfterLoginNormalScreen" as never)
                }
            }).then(() => {
                console.log("Am done isUserHasLogin");
            })
        }*/
        //loadCompanies(setDataCompanies).then(null)

    }, []);

    const cleanInputUsername=(inValue:string):string=>{
        inValue = inValue.trim()
        inValue = inValue.toLowerCase()
        return inValue
    }
    const cleanInputPassword=(inValue:string):string=>{
        inValue = inValue.trim()
        return inValue
    }
    const onLogin = async () => {
        if(InputUsername==""){
            alert("Error username is required!")
            return
        }
        if(InputPassword==""){
            alert("Error password is required!")
            return
        }

        let payload={
            username: cleanInputUsername(InputUsername),
            password: cleanInputPassword(InputPassword),
        }
        console.log("XXPayload > ",payload)
        const endpoint = "/logins"
        let res=
            await FetchDataFromDomainDrivenPostWithError(payload,SERVER_AUTH_SERVICE, endpoint)
        console.log("submit login res > ",res)
        if(res.status==="success"){
            console.log("SUCCESS login res > ",res.data)
            let data:{token:string,user:User2} = res.data;
            onLoginSuccess(data.token,data.user)
        }else{
            console.log("FAIL LOGIN > ", res.error.message)
            alert(res.error.message)
        }

        //navigation.navigate("home/HomeWorkerScreen" as never)
    }
    const onLoginSuccess=async (token:string,user:User2)=>{
        console.log("(****> onLoginSuccess token: ",token)
        console.log("(****> onLoginSuccess user: ",user)
        let defaultImage = `https://via.placeholder.com/150`
        if(user.picture ===""){
            user.picture = defaultImage
        }
        await AsyncStorage.setItem("@user", JSON.stringify(user));
        dispatch(ReduxSetLoginWithProvider(user))
        await AsyncStorage.setItem("@userInfo", JSON.stringify(user));
        await AsyncStorage.setItem("@userType", "provider");
        await AsyncStorage.setItem("@userCode", user.code);
        dispatch(ReduxSetLoginToken(token))
        await AsyncStorage.setItem("@userToken", token);
        await AsyncStorage.setItem("@user", JSON.stringify(user));
        console.log('><<< LET GO TO AFTER AUTH SUCCESS :', user);
        navigation.navigate("auth/AuthAfterLoginNormalScreen" as never)
        return
    }
    const onContinuePreview = () => {
        setContinueWithLogin(true)
        //
    }
    const onLogoutPreview = () => {
        setContinueWithLogin(false)
        logoutFromPreviewLogin().then(() => {
            navigation.navigate("index" as never)
        })
    }
    const onSelectCompany = (company: any) => {
        dispatch(ReduxSetCurrentCompany(company))
        navigation.navigate("home/HomeWorkerScreen" as never)
    }

    return (
        <View style={styles.container}>
            {/* Logo Section */}
            <View style={styles.logoContainer}>
                <Image
                    source={require('@/assets/images/bg/login2.jpg')} // Replace with your logo URL
                    style={styles.logo}
                />
            </View>

            {/* Login Form */}
            <View style={styles.formContainer}>
                {/*<Text style={styles.title}>Login</Text>*/}

                <TextInput
                    placeholder="Email"
                    placeholderTextColor="#A9A9A9"
                    style={styles.input}
                    onChangeText={(text) => setInputUsername(text)}
                    autoCapitalize={"none"}
                />
                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#A9A9A9"
                    secureTextEntry
                    style={styles.input}
                    onChangeText={(text:string)=>setInputPassword(text)}
                />

                <TouchableOpacity style={styles.loginButton} onPress={onLogin}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>

                <View style={styles.groupForgetPassword}>
                    {/* Forgot Password */}
                    <TouchableOpacity>
                        <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>navigation.navigate("auth/AuthRegisterScreen" as never)}>
                        <Text style={styles.forgotPasswordText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* OR text */}
            <View style={styles.withSocialMediaContainer}>
                <LineWithTextMiddle
                    title={"Or"}
                    styleTitle={{
                        fontSize: 18,
                        color: Colors.brand.lightGray,
                        textAlign: 'center',
                    }}
                    styleLine={{backgroundColor: Colors.brand.lightGray}}
                    styleBox={{width: width}}
                />

                {/* Login with social media */}
                <LoginWithProvider/>
            </View>
            <View style={{width:width-40,justifyContent:'center',alignItems: 'center'}}>
                <BarVersionController />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    innerLogoutBtn: {
        flexDirection: 'row',
        justifyContent: "flex-end",
        alignItems: "center",
        paddingHorizontal: 10,
        backgroundColor: Colors.brand.white,
        height: 30,
        width: width - 40 - 120,
    },
    btnGroup: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20
    },
    logo2: {
        width: 100,
        height: 100,
        resizeMode: "contain"
    },
    hasLoginName: {
        fontSize: 18,
        fontWeight: "bold"
    },
    hasLoginEmail: {
        fontSize: 14,
        fontWeight: "normal",
        color: Colors.brand.blue,
    },
    hasLoginBox2: {
        paddingLeft: 20
    },
    hasLoginBox1: {
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: Colors.brand.white,
        width: width - 40,
        alignSelf: "center",
        marginTop: 10,
        borderRadius: 5,
    },
    socialsView: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 20
    },
    groupForgetPassword: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        marginTop: 20
    },
    formContainer: {
        backgroundColor: Colors.brand.white,
        marginVertical: 10,
        marginHorizontal: -20,
        padding: 20,
        width: -20,
        borderRadius: 10,
    },
    withSocialMediaContainer: {
        backgroundColor: Colors.brand.white,
        marginVertical: 10,
        marginHorizontal: -20,
        padding: 20,
        width: -20,
        borderRadius: 0,
        marginTop: -10,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.brand.background, // Dark background
        justifyContent: 'center',
        padding: 20,
        paddingTop: 80
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 40,
        backgroundColor: Colors.brand.blue,
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    logo: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        borderRadius: 40,
        backgroundColor: Colors.brand.orange,
    },
    title: {
        fontSize: 32,
        color: Colors.brand.gray,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: Colors.brand.white,
        borderRadius: 5,
        height: 50,
        marginBottom: 20,
        paddingHorizontal: 15,
        fontSize: 16,
        color: Colors.brand.gray,
        borderColor: Colors.brand.background,
        borderStyle: "solid",
        borderWidth: 1,
    },
    loginButton: {
        backgroundColor: Colors.brand.white, // Green button color
        borderRadius: 25,
        paddingVertical: 15,
        alignItems: 'center',
        marginBottom: 15,
        borderColor: Colors.brand.lightRed,
        borderStyle: "solid",
        borderWidth: 1,
    },
    loginButtonText: {
        color: Colors.brand.lightRed,
        fontSize: 18,
        fontWeight: 'bold',
    },
    forgotPasswordText: {
        color: Colors.brand.blue,
        fontSize: 16,
        textAlign: 'center',
    },
});
