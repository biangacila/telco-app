// src/App.tsx
import React, {useEffect, useState} from 'react';
import {Platform, Role, SafeAreaView, StyleSheet, View, Dimensions, ScrollView, ViewStyle, Alert} from 'react-native';
import PeopleList from "@/components/settings/PeopleList";
import {Contributor, NameEntry} from "@/types/type_general";
import {useNavigation} from "expo-router";
import {FetchDataFromDomainDrivenGet, FetchDataFromDomainDrivenPost} from "@/services/service-domain-driven";
import {SERVER_AUTH_SERVICE, SERVER_TELCO_CORE} from "@/config/server-connection";
import {Allocation, CompanyType, DealerType, RoleType, SellerType, User2} from "@/types/type-model";
import {useSelector} from "react-redux";
import FilterSelections from "@/components/settings/FilterSelections";
import NameList from "@/components/settings/NameList";
import {
    isInAllocationAsOther2
} from "@/services/functions";
import {initialDealerType, initialUser2} from "@/types/type_initialize";
import ChooseUser from "@/components/settings/ChooseUser";
import {Colors} from "@/constants/Colors";
import ComboboxSeletor, {dataSourceType} from "@/components/common/ComboboxSeletor";
import InputTextBox from "@/components/common/InputTextBox";
import PanelWithLabel from "@/components/common/PanelWithLabel";
import GenericButton from "@/components/FormInputs/GenericButton";

const {width}=Dimensions.get("screen")

const App: React.FC = () => {
    const state = useSelector((state: any) => state.core)
    const [mode,setMode]=useState("list")
    const [sync,setSync]=useState(false);
    const [DataContributor,setDataContributor]=useState<NameEntry[]>([])
    const [SelectedToAddUser,setSelectedToAddUser] = useState<DealerType>(initialDealerType)
    const [InputSelectedUser,setInputSelectedUser]=useState<User2>(initialUser2)
    const [InputSelectedDealer,setInputSelectedDealer]=useState<DealerType>(initialDealerType)
    const [InputSelectedSubdealer,setInputSelectedSubdealer]=useState<DealerType>(initialDealerType)
    const [InputSelectedSupervisor,setInputSelectedSupervisor]=useState<DealerType>(initialDealerType)
    const [DataDealer,setDataDealer]=useState<DealerType[]>([])
    const [DataSubdealer,setDataSubdealer]=useState<DealerType[]>([])
    const [DataSupervisor,setDataSupervisor]=useState<DealerType[]>([])
    const [DataRole,setDataRole]=useState<RoleType[]>([])
    const [DataAllocation,setDataAllocation]=useState<Allocation[]>([])
    const [DataSeller,setDataSeller]=useState<SellerType[]>([])
    const [InputBankRef1,setInputBankRef1]=useState("");
    const [InputBankRef2,setInputBankRef2]=useState("");
    const [InputCommissionDealer,setInputCommissionDealer]=useState("");
    const [InputCommissionSubdealer,setInputCommissionSubdealer]=useState("");
    const [InputCommissionAgent,setInputCommissionAgent]=useState("");

    let org = state.currentCompany.code;
    const navigation = useNavigation();
    useEffect(() => {
        if(!sync){
            setSync(true)
            loadContributors().then(null)
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
        setDataAllocation(data.allocations||[])
        setDataRole(data.roles||[])
        setDataSeller(data.sellers||[])
        console.log(":)))(---> ",data)
    }
    const loadContributors=async ()=>{
        let company  = state.selectedOrg as CompanyType
        let org  =company.code
        if(org===""){
            org  = "BT0000"
        }
        let endpoint = `/users/get/all/${org}`
        let result = await FetchDataFromDomainDrivenGet(SERVER_TELCO_CORE,endpoint)
        let data = result.data as CompanyType
        console.log("::::::::loadContributors > ",data)
    }
    const loadSellers=async ()=>{
        let company  = state.selectedOrg as CompanyType
        let org  =company.code
        if(org===""){
            org  = "BT0000"
        }
        let endpoint = `/seller/get?${org}`
        let result = await FetchDataFromDomainDrivenGet(SERVER_TELCO_CORE,endpoint)
        let data = result.data as CompanyType
        console.log("::::::::loadContributors > ",data)
    }
    const onRequestAdd = () => {
        setMode("add");
    }
    const onDetail=(data:any)=>{
        console.log("|||||||onRequestAdd > ",data)
        setSelectedToAddUser(data as DealerType)
        setMode("detail");
    }
    const getDataList=():NameEntry[]=>{
        console.log("DataSeller !>>>>> ",DataSeller)
        let ls:NameEntry[] = [];
        for(let i in DataSeller){
            let row = DataSeller[i];

            ls.push({
                code:row.code,
                name:row.name,
                avatar:"",
                status:row.status
            })
        }
        return ls
    }
    const getDataSourceDealer=():dataSourceType[]=>{
        let data:dataSourceType[]=[];
        for(let i in DataDealer){
            let row = DataDealer[i];
            data.push({
                value:row.code,
                display:row.name,
            })
        }
        return data
    }
    const getDataSourceSubdealer=():dataSourceType[]=>{
        let data:dataSourceType[]=[];
        if(InputSelectedDealer.code===""){
            return data
        }
        for(let i in DataSubdealer){
            let row = DataSubdealer[i];
            if(!isInAllocationAsOther2(row ,"dealer",InputSelectedDealer.code)){
                continue
            }
            data.push({
                value:row.code,
                display:row.name,
            })
        }

        return data
    }
    const getDataSourceSupervisor=():dataSourceType[]=>{
        let data:dataSourceType[]=[];
        if(InputSelectedSubdealer.code===""){
            return data
        }
        for(let i in DataSupervisor){
            let row = DataSupervisor[i];
            if(!isInAllocationAsOther2(row ,"subdealer",InputSelectedSubdealer.code )){
                continue
            }
            data.push({
                value:row.code,
                display:row.name,
            })
        }

        return data
    }
    const findRecord=(value:string,data:DealerType[]):DealerType=>{
        let record:DealerType=initialDealerType
        for(let i in data){
            let row = data[i]
            if(row.code===value){
                record = row
                break
            }
        }
        return record
    }
    const onSubmitRecord=async ()=>{
        let ok = true
        let failList:string[] = []
        if(InputSelectedUser.code==""){
            ok  = false
            failList.push("No user selected")
        }
        if(InputSelectedDealer.code==""){
            ok  = false
            failList.push("No dealer selected")
        }
        if(InputSelectedSubdealer .code==""){
            ok  = false
            failList.push("No subdealer selected")
        }
        if(InputSelectedSubdealer.code==""){
            ok  = false
            failList.push("No subdealer selected")
        }
        if(InputSelectedSupervisor.code==""){
            ok  = false
            failList.push("No supervisor selected")
        }
        if(InputBankRef1==""){
            ok  = false
            failList.push("Bank ref 1 is empty")
        }

        if(!ok){
            let msg="Input Validation Fail: \n"
            for(let i in failList){
                msg+=`- [${failList[i]}] \n`
            }
            alert(msg)
            return
        }

        Alert.alert(
            'Submit seller config record request',
            `Are you sure to submit this config for user: ${InputSelectedUser.name}?`,
            [
                {text: "Cancel"},
                {text: "Submit", onPress: () => submitRecord()},
            ]
        )
    }
    const submitRecord=async()=>{
        let user = state.loginWithProvider as User2
        let payload={
            org:org,
            code:InputSelectedUser.code,
            name:InputSelectedUser.name,
            email:InputSelectedUser.email,
            phone:InputSelectedUser.phone_number,
            dealer:InputSelectedDealer.code,
            subdealer:InputSelectedSubdealer.code,
            supervisor:InputSelectedSupervisor.code,
            bank_ref1:InputBankRef1,
            bank_ref2:InputBankRef2,
            commission_dealer:parseFloat(InputCommissionDealer),
            commission_subdealer:parseFloat(InputCommissionSubdealer),
            commission_agent:parseFloat(InputCommissionAgent),
            created_by:user.code
        }
        console.log("submit payload >> ",payload)
        let endpoint = `/sellers`
        let result = await FetchDataFromDomainDrivenPost(payload, SERVER_TELCO_CORE, endpoint)
        let response = result as { code: string, status: string }
        console.log("submit seller response > ",response)
        alert(`Thank you, seller record saved `)
        setMode("list")
        fetchConfigInfo().then(null)
    }
    const SwitchComponent=()=>{
        const pickupContainerStyle:ViewStyle={
            borderRadius:5
        }
        switch (mode){
            case "add":
                return(
                    <ScrollView>
                        <View  style={{marginBottom:10,justifyContent:"space-between"}}>
                            <ChooseUser
                                selectedItem={InputSelectedUser.name}
                                onSelectedItem={setInputSelectedUser}
                                category={"seller"}
                                title={"Seller user"}
                                titleColor={Colors.brand.blue}
                            />
                        </View>

                        <View>
                            <PanelWithLabel
                                title={"Organicram structure"}
                                styleLabel={{color:Colors.brand.blue}}
                            >
                            <ComboboxSeletor
                                dataSource={getDataSourceDealer()}
                                onChange={(value:string)=>setInputSelectedDealer(findRecord(value,DataDealer))}
                                title={"Dealer:"}
                                stylePickupContainer={pickupContainerStyle}
                            />

                            <ComboboxSeletor
                                dataSource={getDataSourceSubdealer()}
                                onChange={(value:string)=>setInputSelectedSubdealer(findRecord(value,DataSubdealer))}
                                title={"Subdealer:"}
                                stylePickupContainer={pickupContainerStyle}
                            />

                            <ComboboxSeletor
                                dataSource={getDataSourceSupervisor()}
                                onChange={(value:string)=>setInputSelectedSupervisor(findRecord(value,DataSupervisor))}
                                title={"Supervisor:"}
                                stylePickupContainer={pickupContainerStyle}
                            />
                            </PanelWithLabel>
                        </View>

                        <View>
                            <PanelWithLabel
                                title={"Bank Reference"}
                                styleLabel={{color:Colors.brand.blue}}
                            >
                                <InputTextBox
                                    label={"Ref 1:"}
                                    width={width-100}
                                    onChangeText={setInputBankRef1}
                                    value={InputBankRef1}
                                    placeholder={""}
                                    boxStyle={{marginTop: 15, backgroundColor: Colors.brand.blue}}
                                />

                                <InputTextBox
                                    label={"Ref 2:"}
                                    width={width-100}

                                    onChangeText={setInputBankRef2}
                                    value={InputBankRef1}
                                    placeholder={""}
                                    boxStyle={{marginTop: 15, backgroundColor: Colors.brand.blue}}
                                />

                            </PanelWithLabel>
                        </View>

                        <View>
                            <PanelWithLabel
                                title={"Commission Strategy"}
                                styleLabel={{color:Colors.brand.blue}}
                            >
                                <InputTextBox
                                    label={"Agent:"}
                                    width={width-100}
                                    onChangeText={setInputCommissionAgent}
                                    value={InputCommissionAgent}
                                    placeholder={""}
                                    keyboardType={"numeric"}
                                    boxStyle={{marginTop: 15, backgroundColor: Colors.brand.blue}}
                                />
                                <InputTextBox
                                    label={"Dealer:"}
                                    width={width-100}
                                    onChangeText={setInputCommissionDealer}
                                    value={InputCommissionDealer}
                                    placeholder={""}
                                    keyboardType={"numeric"}
                                    boxStyle={{marginTop: 15, backgroundColor: Colors.brand.blue}}
                                />
                                <InputTextBox
                                    label={"Sub dealer:"}
                                    width={width-100}
                                    onChangeText={setInputCommissionSubdealer}
                                    value={InputCommissionSubdealer}
                                    placeholder={""}
                                    keyboardType={"numeric"}
                                    boxStyle={{marginTop: 15, backgroundColor: Colors.brand.blue}}
                                />

                            </PanelWithLabel>
                        </View>
                        <View style={{flexDirection: "row",justifyContent: "center"}}>
                            <GenericButton
                                onPress={onSubmitRecord}
                                bgColor={Colors.brand.green}
                                borderColor={Colors.brand.white}
                                width={width-60}
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

                    </ScrollView>
                )
            case "list":
                return(
                    <>
                        <FilterSelections
                            action={"Filter selection"}
                            data={[
                                {key: "Company", value: state.currentCompany.name},
                            ]}
                        />
                        <NameList
                            action={"Seller"}
                            title={"Contributors"}
                            data={getDataList()}
                            onPressNewUser={onRequestAdd}
                            onDetail={onDetail}
                        />
                    </>
                )
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            {SwitchComponent()}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    boxBankRef:{
        backgroundColor: Colors.brand.white,
    },
    container: {
        flex: 1,
        flexDirection:"column",
        justifyContent: 'flex-start',
        padding: 16,
        backgroundColor: '#F5F5F5',
        marginTop:Platform.OS=="android"?35:25,
    },
});

export default App;
