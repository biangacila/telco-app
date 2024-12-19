import {View, Text, StyleSheet, ScrollView, Dimensions, FlatList, TouchableOpacity} from "react-native";
import React, {useEffect, useState} from "react";
import {Allocation, DealerType, FloatBalance, RoleType, SellerType, User2, WalletType} from "@/types/type-model";
import {
    FetchDataFromDomainDrivenGet,
    FetchDataFromDomainDrivenPost,
    FetchDataFromDomainDrivenPostWithError
} from "@/services/service-domain-driven";
import {SERVER_TELCO_CORE, SERVER_TELCO_FINANCE} from "@/config/server-connection";
import {useSelector} from "react-redux";
import ChooseUser from "@/components/settings/ChooseUser";
import {Colors} from "@/constants/Colors";
import {initialSellerType, initialUser2, initialWalletType} from "@/types/type_initialize";
import PanelWithLabel from "@/components/common/PanelWithLabel";
import {NameEntry} from "@/types/type_general";
import {formatDate2} from "@/services/functions";
import InputTextBox from "@/components/common/InputTextBox";
import GenericButton from "@/components/FormInputs/GenericButton";


export default () => {
    const [sync, setSync] = useState(false);
    const [mode, setMode] = useState("list");
    const [DataFloatBalance, setDataFloatBalance] = useState<FloatBalance[]>([]);
    const [DataSeller, setDataSeller] = useState<SellerType[]>([])
    const [DataWallet,setDataWallet]=useState<WalletType[]>([])
    const [InputSelectedUser, setInputSelectedUser] = useState<User2>(initialUser2)
    const [InputAmount,setInputAmount]=useState("")
    const store = useSelector((state: any) => state.core);
    let user = store.loginWithProvider as User2
    let org = store.currentCompany.code;

    useEffect(() => {
        if(!sync){
            setSync(true);
            fetchConfigInfo().then(null)
            loadFloatBalance().then(null)
            loadWallets().then(null)
        }

    }, []);
    const fetchConfigInfo = async () => {
        type ResponseType = {
            dealers: DealerType[],
            subdealers: DealerType[],
            supervisors: DealerType[],
            allocations: Allocation[],
            roles: RoleType[],
            sellers: SellerType[]
        }
        let endpoint = `/configs/get/all/org/${org}`
        let req = await FetchDataFromDomainDrivenGet(SERVER_TELCO_CORE, endpoint)
        let data = req.results as ResponseType
        setDataSeller(data.sellers || [])
        //console.log("fetchConfigInfo response > ",data.sellers)

    }
    const loadFloatBalance = async () => {
        let endpoint = `/floatbalances/get/org/${org}`
        let req = await FetchDataFromDomainDrivenGet(SERVER_TELCO_FINANCE, endpoint)
        let data = req.results as FloatBalance[]
        setDataFloatBalance(data)
    }
    const loadWallets = async () => {
        let endpoint = `/wallets/get/org/${org}`
        let req = await FetchDataFromDomainDrivenGet(SERVER_TELCO_FINANCE, endpoint)
        let data = req.records as WalletType[]
        console.log("loadWallets >>>>> ",req)
        setDataWallet(data)
    }
    const getNameFromSellerCode=(code:string):string=>{
        for(let i in DataSeller){
            let row = DataSeller[i];
            if(row.code===code){
               return  row.name
            }
        }
        return code;
    }
    const getSellerRecord=(code:string):SellerType=>{
        for(let i in DataSeller){
            let row = DataSeller[i];
            if(row.code===code){
                return  row
            }
        }
        return initialSellerType;
    }
    const getWalletRecord=(code:string):WalletType=>{
        console.log("1 getWalletRecord > ",code," > ",DataWallet.length )
        for(let i in DataWallet){
            let row = DataWallet[i];
            console.log("getWalletRecord > ",code," > ",row.UserCode===code)
            if(row.UserCode===code){
                return  row
            }
        }
        return initialWalletType;
    }
    const onPressNewBalance=()=>{
        setMode("new")
    }
    const onSubmitFloat=async ()=>{
        let sellerRecord = getSellerRecord(InputSelectedUser.code)
        let payload={
            "user":       InputSelectedUser.code,
            "amount":     InputAmount==""?0:parseFloat(InputAmount),
            "org":        sellerRecord.org,
            "dealer":     sellerRecord.dealer,
            "subdealer":  sellerRecord.subdealer,
            "supervisor": sellerRecord.supervisor,
            "created_by": `<${InputSelectedUser.code}>${InputSelectedUser.name}<${InputSelectedUser.email}>`,
        }
        console.log("onSubmitFloat payload >>>> ",payload)
        let endpoint = `/floatbalances/post/new`
        let result = await FetchDataFromDomainDrivenPostWithError(payload, SERVER_TELCO_FINANCE, endpoint)
        let response = result.data
        console.log("submit float response > ",result)

        loadFloatBalance().then(null)
        alert(`Thank you, float record saved `)
        setMode("list");

    }
    const renderContributor = ({item}: { item: FloatBalance }) => (
        <View style={styles.contributorItem}>
            <View style={styles.contributorInfo}>
                <Text style={styles.name}>
                    {getNameFromSellerCode(item.user)} - <Text style={{fontSize:10,fontWeight:"normal"}}>{item.user}</Text>
                </Text>
                <View style={styles.boxUserCode}>
                    <Text style={{...styles.hostLabel}}>Balance - {formatDate2(item.created_at)}  </Text>
                    <Text style={styles.amount}>R{item.amount} </Text>
                </View>
                <View style={styles.boxUserCode}>
                    <Text style={{...styles.hostLabel}}>Cash - {formatDate2(item.cash_updated_at)} </Text>
                    <Text style={styles.cashAmount}>R{item.cash_amount} </Text>
                </View>
                <View style={styles.boxUserCode}>
                    <Text style={{...styles.hostLabel}}>Wallet  </Text>
                    <Text style={styles.cashAmount}>R{getWalletRecord(item.user).Balance} </Text>
                </View>
            </View>
        </View>
    )
    const RenderNewFloat = () => {
        return (
            <View style={{marginBottom: 10, justifyContent: "space-between"}}>
                <PanelWithLabel
                    title={`New Float Balance`}
                    styleLabel={{color: Colors.brand.blue}}
                >
                    <View>
                        <ChooseUser
                            selectedItem={InputSelectedUser.name}
                            onSelectedItem={setInputSelectedUser}
                            category={"float"}
                            title={"Find user"}
                            titleColor={Colors.brand.blue}
                        />
                    </View>
                    <View style={{paddingHorizontal:20}}>
                        <InputTextBox
                            label={"Amount:"}
                            width={"100%"}
                            onChangeText={setInputAmount}
                            value={InputAmount}
                            placeholder={""}
                            keyboardType={"numeric"}
                            boxStyle={{marginTop: 15, backgroundColor: Colors.brand.blue}}
                        />
                        <GenericButton
                            onPress={onSubmitFloat}
                            bgColor={Colors.brand.blue}
                            borderColor={Colors.brand.white}
                            width={"100%"}
                            label={"Submit"}
                            height={40}
                            borderRadius={5}
                            style={{
                                marginTop: -5,
                                marginLeft: 0,
                            }}
                            labelColor={Colors.brand.white}
                        />
                    </View>


                </PanelWithLabel>
            </View>

        )
    }
    const RenderList = () => {
        return (
            <View>
                <View style={styles.boxAdd}>
                    <TouchableOpacity style={styles.addButton} onPress={onPressNewBalance}>
                        <Text style={styles.addButtonText}>+ Add Float</Text>
                    </TouchableOpacity>
                </View>
                <PanelWithLabel
                    title={`List of float distributed: (${DataFloatBalance.length})`}
                    styleLabel={{color: Colors.brand.blue}}
                >

                    <FlatList
                        data={DataFloatBalance}
                        renderItem={renderContributor}
                        keyExtractor={(item) => item.code}
                        style={styles.list}
                    />

                </PanelWithLabel>
            </View>
        )
    }
    const SwitchMode = () => {
        switch (mode) {
            case "list":
                return RenderList()
            case "new":
                return RenderNewFloat()
            default:
                return RenderList()
        }
    }
    return (
        <View style={styles.container}>
            <ScrollView>
                {SwitchMode()}
            </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    boxAdd:{
      flexDirection:"row",
      alignItems:"flex-end",
      alignContent:"center",
        paddingHorizontal:20,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E3F2FD',
        padding: 8,
        borderRadius: 20,
        marginBottom: 16,
        width:"50%"
    },
    addButtonText: {
        color: '#1E88E5',
        fontWeight: 'bold',
        fontSize: 16,
    },
    list: {
        flexGrow: 0,
    },
    cashAmount:{
        fontSize: 16,
        fontWeight:"normal",
        color:Colors.brand.gray
    },
    hostLabel: {
        fontSize: 14,
        color: '#757575',
    },
    amount:{
      fontSize:18,
      color:Colors.brand.red,
        fontWeight:"bold"
    },
    boxUserCode:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 2,
    },
    contributorInfo: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color:Colors.brand.black,
    },
    contributorItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
})
