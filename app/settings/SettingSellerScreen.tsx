// src/App.tsx
import React from 'react';
import {Platform, SafeAreaView, StyleSheet} from 'react-native';
import PeopleList from "@/components/settings/PeopleList";
import {Contributor} from "@/types/type_general";
import {useNavigation} from "expo-router";

const App: React.FC = () => {
    const contributors: Contributor[] = [
        { id: '1', name: 'Merveilleux Biang...', avatar: 'https://example.com/avatar1.jpg', isHost: true ,userCode:"UC1024",email:"mlb@bizminder.co.za"},
        { id: '2', name: 'blessed one', avatar: 'https://example.com/avatar2.jpg',userCode:"UC1023",email:"yanik@gmail.com" },
        { id: '3', name: 'Dieueville Mabounda', avatar: 'https://example.com/avatar3.jpg',userCode:"UC1018",email: "malumba@gmail.com"},
        { id: '4', name: 'Emmanuel Ngombe-Itoua', avatar: 'https://example.com/avatar4.jpg',userCode:"UC1029",email:"emmanual18@gmail.com" },
    ];

    const navigation = useNavigation();
    const onAddNewUser=()=>{
        navigation.navigate("settings/additional/AddUserScreen" as never)
    }
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
