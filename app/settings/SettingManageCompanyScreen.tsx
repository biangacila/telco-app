import {Alert, Platform, SafeAreaView, StyleSheet, View} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import {CompanyType} from "@/types/type-model";
import {FetchDataFromDomainDrivenGet, FetchDataFromDomainDrivenPost} from "@/services/service-domain-driven";
import {SERVER_TELCO_CORE} from "@/config/server-connection";
import PeopleList from "@/components/settings/PeopleList";
import NameList from "@/components/settings/NameList";
import {NameEntry} from "@/types/type_general";
import AddGeneralNameContainer from "@/components/settings/AddGeneralNameContainer";
import {buildDataNameEntry} from "@/services/functions";


export default ()=>{
    const[sync, setSync] = useState(false);
    const[mode, setMode]=useState("list");
    const[InputName, setInputName]=useState("");
    const[DataCompanies,setDataCompanies]=useState<CompanyType[]>([]);

    useEffect(() => {
        if(!sync){
            setSync(true);
            loadCompanies().then(null)
        }
    }, []);
    const loadCompanies = async ()=>{
        let endpoint = `/companies/get/all`
        let result = await FetchDataFromDomainDrivenGet(SERVER_TELCO_CORE,endpoint)
        let data = result.results as CompanyType[]
        setDataCompanies(data)
    }
    const onAddCompany=async ()=>{
        if(InputName==""){
            alert("company name is required!")
            return
        }
        Alert.alert(
            'Submit Company',
            `Are you sure you want to add this company: ${InputName} ?`,
            [
                {text:"Cancel"},
                {text:"Save",onPress:()=>submitRecord()},
            ]
        )
    }
    const submitRecord=async()=>{
        setMode("list")
        let payload={
            name:InputName,
        }
        let endpoint = `/companies`
        let result = await FetchDataFromDomainDrivenPost(payload,SERVER_TELCO_CORE,endpoint)
        console.log("::::::::onAddCompany > ",result)
        let response  = result as {code:string,status:string}
        alert(`Thank you, company saved with code: ${response.code}!`)
        loadCompanies().then(null)
    }
    const onRequestAdd=()=>{
        setMode("add");
    }

    return(
        <SafeAreaView style={styles.container}>
            {mode=="list"?
                <NameList
                action={"Company"}
                title={"Companies"}
                data={buildDataNameEntry(DataCompanies,"name","code","status")}
                onPressNewUser={onRequestAdd}
            />:
            <AddGeneralNameContainer
                title={"New company"}
                placeholder={"type company..."}
                onChange={setInputName}
                onSubmit={onAddCompany}
                btnText={"Submit"}
                onCancel={()=>setMode("list")}
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
        marginTop:Platform.OS=="android"?35:25,
    },
});
