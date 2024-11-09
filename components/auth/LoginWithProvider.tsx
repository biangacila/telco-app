import {View, Text, Image, StyleSheet,} from "react-native";
import RoundedIcon from "@/components/public/RoundedIcon";
import * as WebBrowser from "expo-web-browser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useState} from "react";
import * as Linking from "expo-linking"
import axios from "axios";
import {links} from "@/constants/links";
import {SERVER_HOST_AUTH} from "@/config/server-api";
import {UserInfoType} from "@/types/type_general";
import {useDispatch} from "react-redux";
import {ReduxSetLoginToken, ReduxSetLoginWithProvider} from "@/redux/actions";

WebBrowser.maybeCompleteAuthSession();

export default () => {
    const [userInfo, setUserInfo] = useState<any>(null);
    const [accessToken,setAccessToken]=useState(null)
    const [sourceUrl,setSourceUrl]=useState(null)

    const backendUrlAuth = SERVER_HOST_AUTH+ '/logins-google/login'
    //const backendUrlAuth =  'http://192.168.0.113:8080/backend-biatechdesk/api/auth/google/login'
    const dispatch = useDispatch()

    useEffect(() => {
        const handleUrl =async (event:any) => {
            const { url } = event;
            console.log('>>>URL:', event);
            const urlParams = new URLSearchParams(url.split('?')[1]);
            const authorizationCode = urlParams.get('token');

            const userInfo = urlParams.get('user_info')
            let userCode ="";

            if(userInfo){
                const u = JSON.parse(userInfo)  as UserInfoType
                userCode = u.code
                console.log("(((:--> ",u)
                dispatch(ReduxSetLoginWithProvider(u))
                await AsyncStorage.setItem("@userInfo", JSON.stringify(u));
                await AsyncStorage.setItem("@userType", "provider");
            }
            if (authorizationCode) {
                // Use the authorization code to get the access token
                // (e.g., by making a request to your backend or directly to the OAuth provider)
                console.log('>Authorization Code:', authorizationCode);
                dispatch(ReduxSetLoginToken(authorizationCode))
                await AsyncStorage.setItem("@userToken", authorizationCode);
                fetchUserInfoFromGoogleAuth(authorizationCode).then(null );
            } else {
                console.log('Authentication failed or was canceled.');
            }
            if(userCode){
                console.log('>User  Code:', authorizationCode);
                await AsyncStorage.setItem("@userCode", userCode);
            }

            // Extract auth code from the URL and handle authentication
        };

        const subscription = Linking.addEventListener('url', handleUrl);

        return () => {
            subscription.remove();
        };
    }, []);

    const openBrowser = async (urlToOpen:string) => {

        const redirectUri = Linking.createURL('auth/AuthAfterLoginWithGoogleScreen');
        console.log("redirect_url>>>>>> ",encodeURIComponent(redirectUri),"  >  ",urlToOpen)
        const authUrl = `${urlToOpen}?redirect_uri=${encodeURIComponent(redirectUri)}&session_id=BIA010203`;
        console.log("SEND URL -> ",authUrl)
        await Linking.openURL(authUrl);
    }

    const fetchUserInfoFromGoogleAuth = async (token:any) => {
        if (!token) return;
        try {
            const resp = await fetch(
                "https://www.googleapis.com/userinfo/v2/me",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            const user = await resp.json();
            await AsyncStorage.setItem("@user", JSON.stringify(user));
            console.log("(2#)> ",JSON.stringify(user));
            setUserInfo(user);
            setAccessToken(token)

        } catch (error) {
            // Add your own error handler here
        }
    };
    const ShowUserInfo=()=>{
        if(userInfo){
            return(
                <View style={styles.userInfo}>
                    <Text style={styles.welcomeText}>Welcome </Text>
                    <Image source={{uri:userInfo.picture}} style={styles.image} />
                    <Text>{userInfo.name}</Text>
                    <Text>{userInfo.email}</Text>
                </View>
            )
        }
    }
    const loginWithGoogle=async ()=>{
        // promptAsync()
        openBrowser(backendUrlAuth)
    }
    const haveValidToken=async(token:any)=>{
        const url  = SERVER_HOST_AUTH+'/logins-google/validation?token='+token
        return  axios.get(url)
    }
    return (
        <View style={styles.container}>
            <View>
                {/*<View>
                <Text>Login with?</Text>
            </View>*/}
                <View style={styles.socialsView}>
                    <RoundedIcon
                        imgPath={links.GOOGLE_IMG_PATH}
                        onPress={loginWithGoogle}
                    />

                    <RoundedIcon
                        imgPath={links.FACEBOOK_IMG_PATH}
                    />
                </View>
                <View>
                    {userInfo&&<ShowUserInfo/>}
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    image:{
        width:100,
        height:100,
        borderRadius:10
    },
    welcomeText:{
        fontSize:35,
        fontWeight:"bold",
        marginBottom:20,
    },
    userInfo:{
        justifyContent: "center",
        alignItems: "center",
    },
    socialsView:{
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 20
    },
    webViewContainer:{
        height:"70%",
        width:"90%",
        borderColor:"#1893F8",
        borderStyle:"solid",
        borderWidth:1,
        borderRadius:5,
    },
    webView:{
        flex:1,
    },
    container: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        flexDirection: "column",
        flexGrow: 1,
    }
})
