import {Alert, Platform, SafeAreaView, StyleSheet, View} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import {CompanyType, DealerType, User2} from "@/types/type-model";
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
    const [DataSubdealers, setDataSubdealers] = useState<DealerType[]>([]);
    const [DataDealers, setDataDealers] = useState<DealerType[]>([]);
    const [SelectedDealer, setSelectedDealer] = useState<DealerType>(initialDealerType)
    const [SelectedToAddUser,setSelectedToAddUser] = useState<DealerType>(initialDealerType)
    const navigation = useNavigation();

    useEffect(() => {
        if (!sync) {
            setSync(true);
            loadSubDealers().then(null)
            loadDealers().then(null)
        }
    }, []);
    const loadSubDealers = async () => {
        let endpoint = `/subdealers/get/all`
        let result = await FetchDataFromDomainDrivenGet(SERVER_TELCO_CORE, endpoint)
        let data = result.results as DealerType[]
        setDataSubdealers(data)
    }
    const loadDealers = async () => {
        let endpoint = `/dealers/get/all`
        let result = await FetchDataFromDomainDrivenGet(SERVER_TELCO_CORE, endpoint)
        let data = result.results as DealerType[]
        setDataDealers(data)
    }
    const onSelectDealer = (item: DealerType) => {
        setSelectedDealer(item)
        setMode("list")
    }
    const onCancelSelectDealer = () => {
        setSelectedDealer(initialDealerType)
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
        }
        let endpoint = `/subdealers`
        let result = await FetchDataFromDomainDrivenPost(payload, SERVER_TELCO_CORE, endpoint)
        let response = result as { code: string, status: string }
        let org = state.currentCompany.code;
        let resAllocate1 = await SubmitAllocation({
            source_id: response.code,
            category: "subdealer",
            destination_id: org,
            source_entity: "subdealers",
            destination_entity: "companies",
        })
        console.log("resAllocate1 > ", resAllocate1)
        let resAllocate2 = await SubmitAllocation({
            source_id: response.code,
            category: "subdealer",
            destination_id: SelectedDealer.code,
            source_entity: "subdealers",
            destination_entity: "dealers",
        })
        console.log("resAllocate2 > ", resAllocate2)
        alert(`Thank you, dealer saved with code: ${response.code}!`)
        await loadSubDealers().then(null)
    }
    const onDetail=(data:any)=>{
        console.log("|||||||onRequestAdd > ",data)
        setMode("detail");
    }
    const onRequestAdd = () => {
        setMode("add");
    }
    const onAddUser = async (u:any) => {
        let user  = u as User2

        alert("Thank you , user added to subdealer")
        setMode("list");
    }
    const onCancelAddUser=()=>{
        setSelectedToAddUser(initialDealerType)
        setMode("list");
    }

    const SwitchComponent = () => {
        switch (mode) {
            case "detail":
                return(
                    <>
                        <FilterSelections
                            data={[
                                {key: "Company", value: state.currentCompany.name},
                                {key: "Dealer", value: SelectedDealer.name},
                            ]}
                        />
                        <DetailEntityNameView
                            title={"Add user to subdealer"}
                            avoidKey={["detail"]}
                            dateField={["created_at"]}
                            onAddUser={onAddUser}
                            record={SelectedToAddUser}
                            selectedItemName={SelectedToAddUser.name}
                            onClose={onCancelAddUser}
                            role={"subdealer"}
                        />
                    </>
                )
            case "list":
                return (
                    <>
                        <FilterSelections
                            action={"Filter selection"}
                            data={[
                                {key: "Company", value: state.currentCompany.name},
                                {key: "Dealer", value: SelectedDealer.name},
                            ]}
                        />
                        <NameList
                            action={"Subdealer"}
                            title={"Subdealers"}
                            data={buildDataNameEntry(DataSubdealers, "name", "code", "status")}
                            onPressNewUser={onRequestAdd}
                            onDetail={onDetail}
                        />
                    </>
                )
            case "add":
                return (
                    <AddGeneralNameContainer
                        title={"New subdealer"}
                        placeholder={"type subdealer..."}
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
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#F5F5F5',
        marginTop: Platform.OS == "android" ? 35 : 25,
    },
});
