import {Alert, Platform, SafeAreaView, StyleSheet, View} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import {CompanyType, DealerType} from "@/types/type-model";
import {FetchDataFromDomainDrivenGet, FetchDataFromDomainDrivenPost} from "@/services/service-domain-driven";
import {SERVER_TELCO_CORE} from "@/config/server-connection";
import PeopleList from "@/components/settings/PeopleList";
import NameList from "@/components/settings/NameList";
import {NameEntry} from "@/types/type_general";
import AddGeneralNameContainer from "@/components/settings/AddGeneralNameContainer";
import {buildDataNameEntry} from "@/services/functions";
import {useSelector} from "react-redux";
import FilterSelections from "@/components/settings/FilterSelections";


export default () => {
    const state = useSelector((state: any) => state.core)
    const [sync, setSync] = useState(false);
    const [mode, setMode] = useState("list");
    const [InputName, setInputName] = useState("");
    const [DataDealers, setDataDealers] = useState<DealerType[]>([]);

    useEffect(() => {
        if (!sync) {
            setSync(true);
            loadDealers().then(null)
        }
    }, []);
    const loadDealers = async () => {
        let endpoint = `/dealers/get/all`
        let result = await FetchDataFromDomainDrivenGet(SERVER_TELCO_CORE, endpoint)
        let data = result.results as DealerType[]
        setDataDealers(data)
    }
    const onAddCompany = async () => {
        if (InputName == "") {
            alert("dealer name is required!")
            return
        }
        Alert.alert(
            'Submit Dealer',
            `Are you sure you want to add this dealer: ${InputName} ?`,
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
        let endpoint = `/dealers`
        let result = await FetchDataFromDomainDrivenPost(payload, SERVER_TELCO_CORE, endpoint)
        console.log("2::::::::submitRecord response > ", result)
        let response = result as { code: string, status: string }
        console.log("3::::::::submitRecord response > ", response.code, response)
        await submitAllocation(response.code)
        alert(`Thank you, dealer saved with code: ${response.code}!`)
        await loadDealers().then(null)
        console.log("FFF2")

    }
    const onRequestAdd = () => {
        setMode("add");
    }
    const submitAllocation = async (code: string) => {
        let org = state.currentCompany.code;
        const uInfo = state.loginWithProvider;
        let payload = {
            org: org,
            category: "dealer",
            source_id: code,
            destination_id: org,
            source_entity: "dealers",
            destination_entity: "companies",
            status: "active",
            created_by: `${uInfo.code}<${uInfo.name}>`
        }
        console.log("1::::::::submitAllocation payload > ", payload)
        let endpoint = `/allocations`
        let result = await FetchDataFromDomainDrivenPost(payload, SERVER_TELCO_CORE, endpoint)
        console.log("2::::::::submitAllocation response > ", result)
    }

    return (
        <SafeAreaView style={styles.container}>
            {mode == "list" ?
                <>
                    <FilterSelections
                        action={"Filter selection"}
                        data={[
                            {key: "Company", value: state.currentCompany.name},
                        ]}
                    />
                    <NameList
                        action={"Dealer"}
                        title={"Dealers"}
                        data={buildDataNameEntry(DataDealers, "name", "code", "status")}
                        onPressNewUser={onRequestAdd}
                    />
                </> :
                <AddGeneralNameContainer
                    title={"New dealer"}
                    placeholder={"type dealer..."}
                    onChange={setInputName}
                    onSubmit={onAddCompany}
                    btnText={"Submit"}
                    onCancel={() => setMode("list")}
                />
            }
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