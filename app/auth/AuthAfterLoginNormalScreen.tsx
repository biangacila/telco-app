import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions} from 'react-native';
import {Colors} from "@/constants/Colors";
import {useNavigation} from "expo-router";
import RoundedIcon from "@/components/public/RoundedIcon";
import {links} from "@/constants/links";
import {LineWithTextMiddle} from "@/components/public/LineWithTextMiddle";
import LoginWithProvider from "@/components/auth/LoginWithProvider";
import {isUserHasLogin, logoutFromPreviewLogin} from "@/services/service_auth";
import {bool} from "prop-types";
import {Allocation, CompanyType, DealerType, RoleType, SellerType, SuperUserType, User2} from "@/types/type-model";
import {initialUser2} from "@/types/type_initialize";
import GenericButton from "@/components/FormInputs/GenericButton";
import {ReduxSetCurrentCompany} from "@/redux/actions";
import {useDispatch, useSelector} from "react-redux";
import PanelSelector from "@/components/settings/PanelSelector";
import {FindSuperUsers, IsInSuperUserList, loadCompanies} from "@/services/functions";
import {FetchDataFromDomainDrivenGet} from "@/services/service-domain-driven";
import {SERVER_TELCO_CORE} from "@/config/server-connection";


const {width, height} = Dimensions.get("screen")
export default function LoginScreen() {
    const store = useSelector((state: any) => state.core);
    let user = store.loginWithProvider as User2
    const [sync,setSync]=useState(false)
    const [hasLogin, setHasLogin] = useState(false);
    const [storeToken, setStoreToken] = useState("");
    const [storeUser, setStoreUser] = useState<User2>(initialUser2);
    const [continueWithLogin, setContinueWithLogin] = useState(false);
    const [DataCompanies,setDataCompanies]=useState<CompanyType[]>([])
    const [DataSeller,setDataSeller]=useState<SellerType[]>([])
    const [DataSuperUser,setDataSuperUser]=useState<SuperUserType[]>([])
    const navigation = useNavigation();
    const dispatch = useDispatch()

    useEffect(() => {
        if(!sync){
            setSync(true)

            fetchConfigInfo().then(null)
            isUserHasLogin((ok: boolean, user: User2, token: string) => {
                console.log("!>isUserHasLogin > ", ok, user, token);
                if (ok) {
                    setHasLogin(ok)
                    setStoreUser(user)
                    setStoreToken(token)
                }else{

                }
            }).then(() => {
                console.log("Am done isUserHasLogin");
            })
            loadCompanies(setDataCompanies).then(null)

        }

    }, []);
    useEffect(() => {
        console.log("UU CAN RUN RE_")
        if(DataSuperUser.length===0){
            loadSuperUser().then(null)
        }
    },[DataSuperUser])


    const loadSuperUser=async ()=>{
         let  res = await  FindSuperUsers(setDataSuperUser).then(null)
        setDataSuperUser(res as SuperUserType[])
    }
    const fetchConfigInfo=async ()=>{
        let endpoint = `/sellers/get/sellers?app_name=telcocore`
        let req = await FetchDataFromDomainDrivenGet(SERVER_TELCO_CORE, endpoint)
        let data = req as SellerType[]
        setDataSeller(data)
    }


    const onContinuePreview = () => {
        setContinueWithLogin(true)
        loadCompanies(setDataCompanies).then(null)
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
    if (hasLogin) {
        return (
            <View>
                <View style={styles.hasLoginBox1}>
                    <View style={styles.logo2}>
                        <Image
                            style={styles.logo2}
                            source={{uri: storeUser.picture}}
                        />
                    </View>
                    <View style={styles.hasLoginBox2}>
                        <Text style={styles.hasLoginName}>{storeUser.name}</Text>
                        <Text style={styles.hasLoginEmail}>{storeUser.email}</Text>
                        <Text>UserCode: {storeUser.code}</Text>
                        <View style={styles.innerLogoutBtn}>
                            {continueWithLogin&&<GenericButton
                                onPress={onLogoutPreview}
                                width={width / 2 - 80}
                                label={"Logout"}
                                bgColor={Colors.brand.white}
                                borderColor={Colors.brand.red}
                                height={30}
                                borderRadius={5}
                                labelColor={Colors.brand.red}
                                borderWidth={0}
                                style={{marginTop:-10}}
                            />}
                        </View>

                    </View>
                </View>
                {!continueWithLogin?<View style={styles.btnGroup}>
                        <GenericButton
                            onPress={onLogoutPreview}
                            width={width / 2 - 80}
                            label={"Logout"}
                            bgColor={Colors.brand.white}
                            borderColor={Colors.brand.red}
                            height={40}
                            borderRadius={10}
                            labelColor={Colors.brand.red}
                        />
                        <GenericButton
                            onPress={onContinuePreview}
                            width={width / 2 - 80}
                            label={"Continue"}
                            bgColor={Colors.brand.white}
                            borderColor={Colors.brand.blue}
                            height={40}
                            borderRadius={10}
                            labelColor={Colors.brand.blue}
                        />
                    </View>:

                    <View>
                        <PanelSelector
                            optionData={getSellerCompanies()}
                            title={`Select organization: ${DataCompanies.length}`}
                            onSelect={onSelectCompany}
                            displayKey={"name"}
                            returnKey={"code"}
                        />
                    </View>
                }
            </View>
        )
    }

    return(
        <View style={styles.container}>
            <Text style={styles.errorSync}>Error sync your login detail</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    errorSync:{
      fontSize:24,
      fontWeight:"bold"
    },
    innerLogoutBtn:{
        flexDirection: 'row',
        justifyContent: "flex-end",
        alignItems: "center",
        paddingHorizontal:10,
        backgroundColor:Colors.brand.white,
        height: 30,
        width: width-40-120,
    },
    btnGroup: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal:20
    },
    logo2: {
        width: 110,
        height: 110,
        resizeMode: "contain"
    },
    hasLoginName: {
        fontSize: 16,
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
