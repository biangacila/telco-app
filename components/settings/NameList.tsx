
import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { NameEntry} from "@/types/type_general";
import {AntDesign,MaterialCommunityIcons} from "@expo/vector-icons";
import {Colors} from "@/constants/Colors";

interface PeopleListProps {
    action:string,
    title:string,
    data: NameEntry[];
    onPressNewUser:any,
}

const PeopleList: React.FC<PeopleListProps> = ({ data,onPressNewUser,title,action }) => {
    const ActiveContributor = ()=>{
        return(
            <AntDesign name={"checkcircleo"} color={Colors.brand.green} size={14} style={{marginLeft:20}}/>
        )
    }
    const OffContributor = ()=>{
        return(
            <AntDesign name={"poweroff"} color={Colors.brand.lightRed} size={14} style={{marginLeft:20}}/>
        )
    }


    const renderContributor = ({ item }: { item: NameEntry }) => (
        <View style={styles.contributorItem}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.contributorInfo}>
                <Text style={styles.name}>
                    {item.name} {item.status==="active" ? <ActiveContributor />:<OffContributor />}
                </Text>
                <View style={styles.boxUserCode}>
                    <Text style={{...styles.hostLabel,color:Colors.brand.blue}}>{item.code} | </Text>
                    <Text style={styles.hostLabel}>{item.status} </Text>
                </View>
                {/*{item.isHost && <Text style={styles.hostLabel}>Meeting host</Text>}*/}
            </View>
            <TouchableOpacity style={styles.optionsButton}>
                <MaterialCommunityIcons name={"dots-vertical"} style={styles.optionsButtonText} size={20}/>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{action}</Text>
            <TouchableOpacity style={styles.addButton} onPress={onPressNewUser}>
                <Text style={styles.addButtonText}>+ Add {action.toLowerCase()}</Text>
            </TouchableOpacity>
            <TextInput placeholder={`Search for ${action.toLowerCase()}`} style={styles.searchInput} />
            {/*<Text style={styles.sectionTitle}>In Meeting</Text>*/}
            <View style={styles.boxTitle}>
                <Text style={styles.subSectionTitle}>{title}:</Text>
                <Text>{data.length}</Text>
            </View>

            <FlatList
                data={data}
                renderItem={renderContributor}
                keyExtractor={(item) => item.code}
                style={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    boxTitle:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
    },
    boxUserCode:{
        flexDirection:"row",
        justifyContent:"flex-start",
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
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
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
    searchInput: {
        height: 40,
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 12,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 16,
        color: '#757575',
        marginTop: 16,
        marginBottom: 8,
    },
    subSectionTitle: {
        fontSize: 14,
        color: '#757575',
        marginBottom: 8,
    },
    list: {
        flexGrow: 0,
    },
    contributorItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    contributorInfo: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    hostLabel: {
        fontSize: 12,
        color: '#757575',
    },
    optionsButton: {
        padding: 8,
        flexDirection: 'column', // Stack dots vertically
        alignItems: 'center', // Center-align the dots
    },
    optionsDot: {
        fontSize: 18,
        color: '#757575',
        lineHeight: 20, // Adjust spacing between dots
    },
    optionsButtonText: {
        fontSize: 18,
        color: '#757575',
    },
});

export default PeopleList;
