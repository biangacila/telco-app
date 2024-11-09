import {Dimensions, Image, Linking, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ButtonStage from "@/components/public/ButtonStage";
import FrameDirectionH from "@/components/public/FrameDirectionH";
import {useNavigation,useRouter} from "expo-router";
import {useDispatch, useSelector} from "react-redux";
import ContainerPage from "@/components/public/ContainerPage";
import {Colors} from "@/constants/Colors";
import {useAuth} from "@/contexts/AuthProvider";
import {UserInfo} from "node:os";
import {initialUserInfoType} from "@/types/type_initialize";
import {UserInfoType} from "@/types/type_general";

const {width} = Dimensions.get("window");
export default () => {
    const state = useSelector((state: any) => state.core)
    const [userInfo, setUserInfo] = useState<any>(null);
    const [accessToken, setAccessToken] = useState(null)
    const [userCode, setUserCode] = useState<any>(null)
    const [isSyncing, setIsSyncing] = useState<boolean>(false)
    const [params, setParams] = useState({});


    const navigation = useNavigation();
    const router = useRouter();
    const dispatch = useDispatch()

    useEffect(() => {
        const extractParamsFromUrl = async () => {
            const url = await Linking.getInitialURL();
            if (url) {
                const queryParams = new URL(url).searchParams;
                const paramObj = {};
                queryParams.forEach((value, key) => {
                    // @ts-ignore
                    paramObj[key] = value;
                });
                setParams(paramObj);

            }
        };

        extractParamsFromUrl();
    }, []);

    useEffect(() => {
        if(!isSyncing){
            setIsSyncing(true)
            handleUrl()
        }
    },[userInfo])
    const handleUrl =async () => {
       // const user_info = urlParams.get('token')
        const authorizationCode =await AsyncStorage.getItem("@userToken"); //urlParams.get('token');
        if (authorizationCode) {
            fetchUserInfoFromGoogleAuth(authorizationCode).then(null);
        } else {
            console.log('Authentication failed or was canceled.');
        }
    }
    const fetchUserInfoFromGoogleAuth = async (token: any) => {
        if (!token) return;
        try {
            const resp = await fetch(
                "https://www.googleapis.com/userinfo/v2/me",
                {
                    headers: {Authorization: `Bearer ${token}`},
                }
            );
            const user = await resp.json();
            await AsyncStorage.setItem("@user", JSON.stringify(user));
            setUserInfo(user);
            setAccessToken(token)
            /**
             * let request our user info from local registration for userCode
             */
            const userStoreCode = await AsyncStorage.getItem("@userCode");
            if (userStoreCode) {
                setUserCode(userStoreCode)
            }

        } catch (error) {
            // Add your own error handler here
        }
    };

    const ShowUserInfo = () => {
        let u:UserInfoType=  initialUserInfoType
        if(state.logingType==="provider"){
            u = state.loginWithProvider
        }
        if (userInfo) {
            return (
                <View style={styles.userInfo}>
                    <Text style={styles.welcomeText}>Welcome </Text>
                    <Image source={{uri: u.picture}} style={styles.image}/>
                    <Text>{u.name}</Text>
                    <Text>{u.email}</Text>
                    <Text>User Code: {userCode}</Text>
                </View>
            )
        }
    }
    const onContinue=async ()=>{

        navigation.navigate("home/HomeWorkerScreen" as never)
    }

    return (
        <ContainerPage>
            <View>
                <View>
                    {userInfo && <ShowUserInfo/>}
                </View>
                {userInfo && <FrameDirectionH iStyles={{
                    flexDirection: "column",
                    justifyContent: "flex-start"
                }}>
                    <View>
                        <Text>Query Params:</Text>
                        {Object.keys(params).map((key) => (
                            <Text key={key}>
                                {key}: {params[key]}
                            </Text>
                        ))}
                    </View>
                    <ButtonStage
                        label={"Let Go!"}
                        onPress={onContinue}
                        bgColor={Colors.brand.red}
                        labelColor={Colors.brand.white}
                        width={(width/3) }
                        borderColor={Colors.brand.yellow}
                        minHeight={50}
                    />

                </FrameDirectionH>}
            </View>

        </ContainerPage>

    )
}


const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        borderRadius: 10
    },
    welcomeText: {
        fontSize: 35,
        fontWeight: "bold",
        marginBottom: 20,
    },
    userInfo: {
        justifyContent: "center",
        alignItems: "center",
    },
    socialsView: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 20
    },
    container: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.brand.white,
        flexDirection: "column",
        flexGrow: 1,
    }
})

