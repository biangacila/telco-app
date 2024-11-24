import {Alert, Platform, SafeAreaView, StyleSheet, View} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import {CompanyType, DealerType} from "@/types/type-model";
import {FetchDataFromDomainDrivenGet, FetchDataFromDomainDrivenPost} from "@/services/service-domain-driven";
import {SERVER_TELCO_CORE} from "@/config/server-connection";
import PeopleList from "@/components/settings/PeopleList";
import NameList from "@/components/settings/NameList";
import {NameEntry} from "@/types/type_general";
import AddGeneralNameContainer from "@/components/settings/AddGeneralNameContainer";
import {buildDataNameEntry, SubmitAllocation} from "@/services/functions";
import {useSelector} from "react-redux";
import ListSelector from "@/components/settings/ListSelector";
import {initialCompany, initialDealerType} from "@/types/type_initialize";
import {useNavigation} from "expo-router";
import FilterSelections from "@/components/settings/FilterSelections";
import DetailEntityNameView from "@/components/settings/DetailEntityNameView";


export default () => {
    const state = useSelector((state: any) => state.core)
    const [sync, setSync] = useState(false);
    const [mode, setMode] = useState("dealer");
    const [InputName, setInputName] = useState("");
    const [DataSupervisors, setDataSupervisors] = useState<DealerType[]>([]);
    const [DataDealers, setDataDealers] = useState<DealerType[]>([]);
    const [DataSubdealers, setDataSubdealers] = useState<DealerType[]>([]);
    const [SelectedDealer, setSelectedDealer] = useState<DealerType>(initialDealerType)
    const [SelectedSubdealer, setSelectedSubdealer] = useState<DealerType>(initialDealerType)
    const [SelectedToAddUser,setSelectedToAddUser]=useState<DealerType>(initialDealerType)
    const navigation = useNavigation();
    const org = state.currentCompany.code;

    useEffect(() => {
        if (!sync) {
            setSync(true);
            loadSupervisors().then(null)
            loadDealers().then(null)
            loadSubdealers().then(null)
        }
    }, []);
    const onDetail=(data:any)=>{
        console.log("|||||||onRequestAdd > ",data)
        setSelectedToAddUser(data as DealerType)
        setMode("detail");
    }
    const onCancelAddUser=()=>{
        setSelectedToAddUser(initialDealerType)
        setMode("list");
    }
    const loadSupervisors = async () => {
        let endpoint = `/supervisors/get/all`
        let result = await FetchDataFromDomainDrivenGet(SERVER_TELCO_CORE, endpoint)
        let data = result.results as DealerType[]
        console.log("loadSupervisors <<<<<<< ",data)
        setDataSupervisors(data)
    }
    const loadDealers = async () => {
        let endpoint = `/dealers/get/all`
        let result = await FetchDataFromDomainDrivenGet(SERVER_TELCO_CORE, endpoint)
        let data = result.results as DealerType[]
        setDataDealers(data)
    }
    const loadSubdealers = async () => {
        let endpoint = `/subdealers/get/all`
        let result = await FetchDataFromDomainDrivenGet(SERVER_TELCO_CORE, endpoint)
        let data = result.results as DealerType[]
        setDataSubdealers(data)
    }
    const onSelectDealer = (item: DealerType) => {
        setSelectedDealer(item)
        setMode("subdealer")
        console.log("onSelectDealer>>>> ", mode)
    }
    const onSelectSubdealer = (item: DealerType) => {
        setSelectedSubdealer(item)
        setMode("list")
    }
    const onCancelSelectDealer = () => {
        setSelectedDealer(initialDealerType)
        setMode("dealer")
        navigation.goBack()
    }
    const onCancelSelectSubdealer = () => {
        setSelectedDealer(initialDealerType)
        setSelectedSubdealer(initialDealerType)
        setMode("dealer")
        navigation.goBack()
    }
    const onAddCompany = async () => {
        if (InputName == "") {
            alert("subdealer name is required!")
            return
        }
        Alert.alert(
            'Submit Subdealer',
            `Are you sure you want to add this subdealer: ${InputName} ?`,
            [
                {text: "Cancel"},
                {text: "Save", onPress: () => submitRecord()},
            ]
        )
    }
    const submitRecord = async () => {
        setMode("list")
        let payload = {
            name: InputName,
            org:org,
            detail:{
                org:org,
                dealer:SelectedDealer.code,
                subdealer:SelectedSubdealer.code,
            }
        }
        let endpoint = `/supervisors`
        let result = await FetchDataFromDomainDrivenPost(payload, SERVER_TELCO_CORE, endpoint)
        let response = result as { code: string, status: string }
        let resAllocate1 = await SubmitAllocation({
            source_id: response.code,
            category: "supervisor",
            destination_id: org,
            source_entity: "supervisors",
            destination_entity: "companies",
        })
        console.log("resAllocate1 > ", resAllocate1)
        let resAllocate2 = await SubmitAllocation({
            source_id: response.code,
            category: "supervisor",
            destination_id: SelectedDealer.code,
            source_entity: "supervisors",
            destination_entity: "dealers",
        })
        console.log("resAllocate2 > ", resAllocate2)
        let resAllocate3 = await SubmitAllocation({
            source_id: response.code,
            category: "supervisor",
            destination_id: SelectedSubdealer.code,
            source_entity: "supervisors",
            destination_entity: "subdealers",
        })
        console.log("resAllocate3 > ", resAllocate3)
        alert(`Thank you, dealer saved with code: ${response.code}!`)
        await loadSupervisors().then(null)
    }
    const onRequestAdd = () => {
        setMode("add");
    }
    const onAddUser=async (data:any)=>{
        console.log("onAddUser>>>>",data," > ",SelectedToAddUser)
        /**
         * todo please let save this to roles backend
         */
        let payload={
            full_name: data.name,
            user_code: data.code,
            ref_code: SelectedToAddUser.code,
            ref_name:SelectedToAddUser.name,
            category:"supervisor",
            created_by: state.loginWithProvider.code,
        }
        let endpoint = "/roles"
        console.log("onAddUser payload > ",payload)
        let result = await FetchDataFromDomainDrivenPost(payload, SERVER_TELCO_CORE, endpoint)
        setMode("list");
    }

    const SwitchComponent = () => {
        switch (mode) {
            case "detail":
                return(
                    <View style={{marginTop:0}}>
                        <FilterSelections
                            data={[
                                {key: "Company", value: state.currentCompany.name},
                                {key: "Dealer", value: SelectedDealer.name},
                            ]}
                        />
                        <DetailEntityNameView
                            title={"Selected supervisor"}
                            avoidKey={["detail"]}
                            dateField={["created_at"]}
                            onAddUser={onAddUser}
                            record={SelectedToAddUser}
                            selectedItemName={SelectedToAddUser.name}
                            onClose={onCancelAddUser}
                            role={"supervisor"}
                        />
                    </View>
                )
            case "list":
                return (
                    <>
                        <FilterSelections
                            action={"Filter selection"}
                            data={[
                                {key: "Company", value: state.currentCompany.name},
                                {key: "Dealer", value: SelectedDealer.name},
                                {key: "Subdealer", value: SelectedSubdealer.name},
                            ]}
                        />
                        <NameList
                            action={"Supervisor"}
                            title={"Supervisors"}
                            data={buildDataNameEntry(DataSupervisors, "name", "code", "status")}
                            onPressNewUser={onRequestAdd}
                            onDetail={onDetail}
                        />
                    </>
                )
            case "add":
                return (
                    <AddGeneralNameContainer
                        title={"New supervisor"}
                        placeholder={"type supervisor..."}
                        onChange={setInputName}
                        onSubmit={onAddCompany}
                        btnText={"Submit"}
                        onCancel={() => setMode("list")}
                    />
                )
            case "dealer":
                return (
                    <ListSelector
                        title={"Select your dealer"}
                        data={DataDealers}
                        keyDisplay={"name"}
                        keyValue={"code"}
                        onSelect={onSelectDealer}
                        onCancel={onCancelSelectDealer}
                    />
                )
            case "subdealer":
                return (
                    <ListSelector
                        title={"Select your subdealer"}
                        data={DataSubdealers}
                        keyDisplay={"name"}
                        keyValue={"code"}
                        onSelect={onSelectSubdealer}
                        onCancel={onCancelSelectSubdealer}
                    />
                )
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            {SwitchComponent()}
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        padding: 16,
        backgroundColor: '#F5F5F5',
        marginTop: Platform.OS == "android" ? 35 : 25,
    },
});
