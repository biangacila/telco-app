import {View, Text, StyleSheet, Dimensions, Image} from "react-native";
import React, {useEffect, useState} from "react";
import {Allocation, DealerType, RoleType, SellerType, User2} from "@/types/type-model";
import {useSelector} from "react-redux";
import {useNavigation} from "expo-router";
import {FetchDataFromDomainDrivenGet} from "@/services/service-domain-driven";
import {SERVER_TELCO_CORE} from "@/config/server-connection";
import {findUserSellerConfig} from "@/services/functions";
import GenericButton from "@/components/FormInputs/GenericButton";
import {Colors} from "@/constants/Colors";
import {SaleCardButton} from "@/components/sales/SaleCardButton";

type DisplaySellerConfig={
    Dealer: string
    Subdealer: string
    Supervisor: string
    Commission:number
    BankRef1:string,
    BankRef2:string,
}
const {width, height} = Dimensions.get("screen")
export default ()=>{
    const state = useSelector((state: any) => state.core)
    const [sync,setSync]=useState(false);
    const [DataDealer,setDataDealer]=useState<DealerType[]>([])
    const [DataSubdealer,setDataSubdealer]=useState<DealerType[]>([])
    const [DataSupervisor,setDataSupervisor]=useState<DealerType[]>([])
    const [DataSeller,setDataSeller]=useState<SellerType[]>([])

    const org = state.currentCompany.code;
    const user = state.loginWithProvider as User2
    const navigation = useNavigation();

    useEffect(() => {
        if(!sync){
            setSync(true)
            fetchConfigInfo().then(null)
                 }
    }, []);
    const fetchConfigInfo=async ()=>{
        type ResponseType={
            dealers:DealerType[],
            subdealers:DealerType[],
            supervisors:DealerType[],
            allocations:Allocation[] ,
            roles:RoleType[],
            sellers:SellerType[]
        }
        let endpoint = `/configs/get/all/org/${org}`
        console.log(":::>endpoint>>  ",endpoint)
        let req = await FetchDataFromDomainDrivenGet(SERVER_TELCO_CORE, endpoint)
        let data = req.results as ResponseType
        setDataDealer(data.dealers||[])
        setDataSubdealer(data.subdealers||[])
        setDataSupervisor(data.supervisors||[])
        setDataSeller(data.sellers||[])
        console.log(":)))(---> ",data)
    }
    const goHome=()=>{
        navigation.navigate("home/HomeWorkerScreen" as never);
    }
    const findConfName=(data:DealerType[],code:string):string=>{
        let name =code
        for(let i in data){
            let row = data[i]
            if(row.code !=code){
                continue
            }
            name =row.name
        }
        return name
    }
    const getUserConfig=():DisplaySellerConfig => {
        let conf:DisplaySellerConfig = {
            Dealer:"",
            Subdealer:"",
            Supervisor:"",
            Commission:0,
            BankRef1:"",
            BankRef2:""
        }
        let sellerConfig = findUserSellerConfig(user.code, DataSeller)

        conf.Dealer = findConfName(DataDealer,sellerConfig.dealer,)
        conf.Subdealer = findConfName(DataSubdealer,sellerConfig.subdealer,)
        conf.Supervisor = findConfName(DataSupervisor,sellerConfig.supervisor,)
        conf.Commission =sellerConfig.commission_agent
        conf.BankRef1 = sellerConfig.bank_ref1
        conf.BankRef2 = sellerConfig.bank_ref2||""

        return conf
    }
    const RenderConfigInfo=(key:string,value:any)=>{
        return(
            <View style={styles.sectionRow}>
                <Text style={styles.sectionRowKey}>{key} : </Text>
                <Text style={styles.sectionRowValue}>{value}</Text>
            </View>
        )
    }
    return(
        <View>

            <View style={styles.hasLoginBox1}>
                <View style={styles.logo2}>
                    <Image
                        style={styles.logo2}
                        source={{uri: user.picture}}
                    />
                </View>
                <View style={styles.hasLoginBox2}>
                    <Text style={styles.hasLoginName}>{user.name}</Text>
                    <Text style={styles.hasLoginEmail}>{user.email}</Text>
                    <Text>Phone: {user.phone_number}</Text>
                    <Text>UserCode: {user.code}</Text>
                </View>
            </View>

            <View style={styles.section}>
                <View style={styles.sectionLine}>
                    <Text style={styles.sectionTitle}>Seller Config</Text>
                </View>
                {RenderConfigInfo("Dealer",getUserConfig().Dealer)}
                {RenderConfigInfo("Subdealer",getUserConfig().Subdealer)}
                {RenderConfigInfo("Supervisor",getUserConfig().Supervisor)}

                {RenderConfigInfo("Commission",`R ${getUserConfig().Commission}`)}
                {RenderConfigInfo("Bank Ref 1",getUserConfig().BankRef1)}
                {RenderConfigInfo("Bank Ref 2",getUserConfig().BankRef2)}
            </View>

            {/* Go Home Button */}
            <View style={styles.grpBtn}>
                <SaleCardButton title={"Home Page"} onPress={goHome} />
            </View>


        </View>
    )
}
const styles = StyleSheet.create({
    grpBtn:{
      margin:20
    },
    sectionRowValue:{
        fontWeight:"normal",
        fontSize:16
    },
    sectionRowKey:{
        fontWeight:"bold",
        fontSize:16
    },
    sectionRow:{
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center",
      borderWidth:StyleSheet.hairlineWidth,
      borderColor:Colors.brand.lightGray,
        paddingVertical:10,
    },
    sectionTitle:{
        fontWeight:"bold",
        fontSize:18,
        color:Colors.brand.blue
    },
    sectionLine:{
      borderBottomWidth:1,
      borderColor:Colors.brand.lightBlue,
        paddingBottom:10,
    },
    section:{
        margin:20,
        backgroundColor:Colors.brand.white,
        padding:10,
        borderRadius:10,
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
    logo2: {
        width: 110,
        height: 110,
        resizeMode: "contain"
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
})
