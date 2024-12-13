import {Dimensions, Image, Linking, StyleSheet, Text, TouchableOpacity, View} from "react-native";
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
import {CompanyType, SellerType, SuperUserType, User2} from "@/types/type-model";
import {FetchDataFromDomainDrivenGet} from "@/services/service-domain-driven";
import {SERVER_TELCO_CORE} from "@/config/server-connection";
import PanelSelector from "@/components/settings/PanelSelector";
import {ReduxSaveCurrentCaseRecord, ReduxSetCurrentCompany} from "@/redux/actions";
import {FindSuperUsers, IsInSuperUserList, loadCompanies} from "@/services/functions";
import {isUserHasLogin} from "@/services/service_auth";

const {width} = Dimensions.get("window");
export default () => {
    const state = useSelector((state: any) => state.core)
    const [sync,setSync]=useState(false)
    const [userInfo, setUserInfo] = useState<any>(null);
    const [accessToken, setAccessToken] = useState(null)
    const [userCode, setUserCode] = useState<any>(null)
    const [userRole,setUserRole]=useState<any>("Super Administrator");
    const [isSyncing, setIsSyncing] = useState<boolean>(false)
    const [params, setParams] = useState({});
    const [DataCompanies,setDataCompanies]=useState<CompanyType[]>([])
    const [DataSuperUser,setDataSuperUser]=useState<SuperUserType[]>([])
    const [DataSeller,setDataSeller]=useState<SellerType[]>([])


    const navigation = useNavigation();
    const router = useRouter();
    const dispatch = useDispatch()

    const uInfo = useSelector((state: any) => state.core.loginWithProvider)
    let user = state.loginWithProvider as User2

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
        loadCompanies().then(null)
        loadSuperUser().then(null)
    }, []);

    useEffect(() => {
        if(!isSyncing){
            setIsSyncing(true)
            handleUrl()
        }
    },[userInfo])
    useEffect(() => {
        if(!sync){
            setSync(true)
            loadSuperUser().then(null)
            fetchConfigInfo().then(null)
        }

    }, []);
    const fetchConfigInfo=async ()=>{
        let endpoint = `/sellers/get/sellers?app_name=telcocore`
        let req = await FetchDataFromDomainDrivenGet(SERVER_TELCO_CORE, endpoint)
        let data = req as SellerType[]
        setDataSeller(data)
    }
    const loadSuperUser=async ()=>{
        let  res = await  FindSuperUsers(setDataSuperUser).then(null)
        console.log("ZZZZSuper user > ",res)
    }
    const loadCompanies = async () => {
        let endpoint = `/companies/get/all`
        let result = await FetchDataFromDomainDrivenGet(SERVER_TELCO_CORE,endpoint)
        let data = result.results as CompanyType[]
        setDataCompanies(data)
    }
    const handleUrl =async () => {
       // const user_info = urlParams.get('token')
        const authorizationCode =await AsyncStorage.getItem("@userToken"); //urlParams.get('token');
        if (authorizationCode) {
           // console.log('><<< LET GO TO AFTER AUTH SUCCESS :', authorizationCode);
            navigation.navigate("auth/AuthAfterLoginNormalScreen" as never)
            ///fetchUserInfoFromGoogleAuth(authorizationCode).then(null);
        } else {
            console.log('Authentication failed or was canceled.');
        }
    }

    const ShowUserInfo = () => {
        let u:UserInfoType=uInfo   as UserInfoType
        /*if(state.logingType==="provider"){
            u = state.loginWithProvider
        }*/
        if (userInfo) {
            return (
                <View style={styles.userInfo}>
                    {/*<Text style={styles.welcomeText}>Welcome </Text>*/}
                    <View style={{marginLeft:20}}>
                        <Image source={{uri: u.picture}} style={styles.image}/>
                    </View>
                    <View style={styles.textBox}>
                        <Text style={styles.txtName}>{u.name}</Text>
                        <Text style={styles.txtEmail}>{u.email}</Text>
                        <Text style={styles.txtCode}>User Code: {userCode}</Text>
                        <Text style={styles.txtCode}>Role: {userRole}</Text>
                    </View>

                </View>
            )
        }
    }
    const onSelectCompany = (company:any)=>{
        dispatch(ReduxSetCurrentCompany(company))
        navigation.navigate("home/HomeWorkerScreen" as never)
    }
    const isInSeller = (orgCode: any):boolean => {
        for(let i in DataSeller){
            let row = DataSeller[i];
            if(row.code==user.code && row.org===orgCode){
                return true;
            }
        }
        return false
    }
    const getSellerCompanies=():CompanyType[]=>{
        if(IsInSuperUserList(user.email,DataSuperUser)){
            return DataCompanies
        }
        let ls:CompanyType[]=[]
        for(let i in DataCompanies){
            let row = DataCompanies[i]
            if(!isInSeller(row.code)){
                continue
            }
            ls.push(row)
        }
        return ls
    }

    return (
        <ContainerPage>
            <View>

                {userInfo && <FrameDirectionH iStyles={{
                    flexDirection: "column",
                    justifyContent: "flex-start"
                }}>
                    <View>
                        {userInfo && <ShowUserInfo/>}
                    </View>
                    <View style={styles.refreshBox}>
                        <TouchableOpacity onPress={loadCompanies}>
                            <Text style={styles.refresh}>Refresh</Text>
                        </TouchableOpacity>
                    </View>
                    <PanelSelector
                        optionData={getSellerCompanies()}
                        title={"Select company:"}
                        onSelect={onSelectCompany}
                        displayKey={"name"}
                        returnKey={"code"}
                    />
                    {/*<ButtonStage
                        label={"Let Go!"}
                        onPress={onContinue}
                        bgColor={Colors.brand.red}
                        labelColor={Colors.brand.white}
                        width={(width/3) }
                        borderColor={Colors.brand.yellow}
                        minHeight={50}
                    />*/}

                </FrameDirectionH>}
            </View>

        </ContainerPage>

    )
}


const styles = StyleSheet.create({
    refresh:{
      color:Colors.brand.lightRed,
        fontSize:16,
    },
    refreshBox:{
      width:width-40,
      flexDirection:"row",
      justifyContent:"flex-end",
        alignItems:"center",
        padding:10,
        marginBottom:-50,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginHorizontal:20,
    },
    txtName:{
      fontSize: 16,
      fontWeight:"bold",
    },
    txtEmail:{
        fontSize: 16,
        fontWeight:"normal",
        color:Colors.brand.blue
    },
    txtCode:{
        fontSize: 16,
        fontWeight:"normal",
    },
    textBox:{
        width:width -  100 - 20 -10,
        marginHorizontal:10
    },
    welcomeText: {
        fontSize: 35,
        fontWeight: "bold",
        marginBottom: 20,
    },
    userInfo: {
        justifyContent: "center",
        alignItems: "flex-start",
        flexDirection:"row",
        width:width-40,
        padding: 20,
        borderRadius: 8,
        borderBottomWidth:1,
        borderBottomColor:Colors.brand.lightGray,
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

