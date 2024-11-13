// src/App.tsx
import React, {useEffect, useState} from 'react';
import {Platform, SafeAreaView, StyleSheet} from 'react-native';
import PeopleList from "@/components/settings/PeopleList";
import {Contributor} from "@/types/type_general";
import {useNavigation} from "expo-router";
import {FetchDataFromDomainDrivenGet} from "@/services/service-domain-driven";
import {SERVER_AUTH_SERVICE, SERVER_TELCO_CORE} from "@/config/server-connection";
import {CompanyType, User2} from "@/types/type-model";
import {useSelector} from "react-redux";

const contributors: Contributor[] = [
    { id: '1', name: 'Merveilleux Biang...', avatar: 'https://example.com/avatar1.jpg', isHost: true ,userCode:"UC1024",email:"mlb@bizminder.co.za"},
    { id: '2', name: 'blessed one', avatar: 'https://example.com/avatar2.jpg',userCode:"UC1023",email:"yanik@gmail.com" },
    { id: '3', name: 'Dieueville Mabounda', avatar: 'https://example.com/avatar3.jpg',userCode:"UC1018",email: "malumba@gmail.com"},
    { id: '4', name: 'Emmanuel Ngombe-Itoua', avatar: 'https://example.com/avatar4.jpg',userCode:"UC1029",email:"emmanual18@gmail.com" },
];

const App: React.FC = () => {
    const state = useSelector((state: any) => state.core)
    const [sync,setSync]=useState(false);
    const [DataContributor,setDataContributor]=useState<Contributor[]>(contributors)


    const navigation = useNavigation();
    useEffect(() => {
        if(!sync){
            setSync(true)
            console.log("useEffect>>> F1")
            loadContributors().then(null)
        }
    }, []);
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
    console.log(":::::::onAddNewUser manage seller setting > ",sync)
    return (
        <SafeAreaView style={styles.container}>
            <PeopleList
                contributors={contributors}
                onPressNewUser={onAddNewUser}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#F5F5F5',
        marginTop:Platform.OS=="android"?35:25,
    },
});

export default App;
