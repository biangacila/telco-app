// src/App.tsx
import React, {useEffect, useState} from 'react';
import {Platform, Role, SafeAreaView, StyleSheet, View} from 'react-native';
import PeopleList from "@/components/settings/PeopleList";
import {Contributor, NameEntry} from "@/types/type_general";
import {useNavigation} from "expo-router";
import {FetchDataFromDomainDrivenGet} from "@/services/service-domain-driven";
import {SERVER_AUTH_SERVICE, SERVER_TELCO_CORE} from "@/config/server-connection";
import {Allocation, CompanyType, DealerType, RoleType, User2} from "@/types/type-model";
import {useSelector} from "react-redux";
import FilterSelections from "@/components/settings/FilterSelections";
import NameList from "@/components/settings/NameList";
import {
    buildDataNameEntry,
    isInAllocation,
    isInAllocationAsDealer,
    isInAllocationAsOther,
    isInAllocationAsOther2
} from "@/services/functions";
import {initialDealerType, initialUser2} from "@/types/type_initialize";
import ChooseUser from "@/components/settings/ChooseUser";
import {Colors} from "@/constants/Colors";
import ComboboxSeletor, {dataSourceType} from "@/components/common/ComboboxSeletor";


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

    let org = state.currentCompany.code;
    const navigation = useNavigation();
    useEffect(() => {
        if(!sync){
            setSync(true)
            loadContributors().then(null)
            fetchConfigInfo().then(null)
            /*fetchAllData("/dealers/get/all",setDataDealer).then(null)
            fetchAllData("/subdealers/get/all",setDataSubdealer).then(null)
            fetchAllData("/supervisors/get/all",setDataSupervisor).then(null)
            loadRoles().then(null)
            loadAllocation().then(null)*/
        }
    }, []);
    const fetchConfigInfo=async ()=>{
        type ResponseType={
            dealers:DealerType[],
            subdealers:DealerType[],
            supervisors:DealerType[],
            allocations:Allocation[] ,
            roles:RoleType[]
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
    const onAddNewUser=()=>{
        navigation.navigate("settings/additional/AddUserScreen" as never)
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

        let ls:NameEntry[] = [];
        /*for(let i in DataDealer){
            let row = DataDealer[i];

            ls.push({
                code:row.code,
                name:row.name,
                avatar:"",
                status:row.status
            })
        }*/
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
        console.log("!!!!!SelectedDealer-->>> ",InputSelectedDealer," > ",DataSubdealer.length);
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

    const SwitchComponent=()=>{
        switch (mode){
            case "add":
                return(
                    <View>
                        <ChooseUser
                            selectedItem={InputSelectedUser.name}
                            onSelectedItem={setInputSelectedUser}
                            category={"seller"}
                            title={"New Seller"}
                            titleColor={Colors.brand.blue}
                        />
                        <View>
                            <ComboboxSeletor
                                dataSource={getDataSourceDealer()}
                                onChange={(value:string)=>setInputSelectedDealer(findRecord(value,DataDealer))}
                                title={"Dealer:"}
                            />
                        </View>

                        <View>
                            <ComboboxSeletor
                                dataSource={getDataSourceSubdealer()}
                                onChange={(value:string)=>setInputSelectedSubdealer(findRecord(value,DataSubdealer))}
                                title={"Subdealer:"}
                            />
                        </View>
                        <View>
                            <ComboboxSeletor
                                dataSource={getDataSourceSupervisor()}
                                onChange={(value:string)=>setInputSelectedSupervisor(findRecord(value,DataSupervisor))}
                                title={"Supervisor:"}
                            />
                        </View>




                    </View>
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
