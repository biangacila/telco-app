import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {Ionicons,MaterialIcons,MaterialCommunityIcons,
    FontAwesome5,Feather} from "@expo/vector-icons";
import {Colors} from "@/constants/Colors";


export type Card1Props = {
    iconType:string,
    icon:any,
    title: string;
    value: any;
    textBottomLeft: any;
    textBottomRight: any;
    textTopRight: any;
    onPress?:any,
    color?:string,
}
export default (props: Card1Props) => {
    const Icon  =()=>{

        if(props.iconType==="MaterialIcons"){
            return (
                <MaterialIcons name={props.icon} size={24} color={Colors.brand.blue}/>
            )
        }
        if(props.iconType==="Feather"){
            return (
                <Feather name={props.icon} size={24} color={Colors.brand.blue}/>
            )
        }
        if(props.iconType==="FontAwesome5Brands"){
            return (
                <FontAwesome5 name={props.icon} size={24} color={Colors.brand.blue}/>
            )
        }
        if(props.iconType==="MaterialCommunityIcons"){
            return (
                <MaterialCommunityIcons name={props.icon} size={24} color={Colors.brand.blue}/>
            )
        }
        return (
            <Ionicons name={props.icon} size={24} color={Colors.brand.blue}/>
        )
    }
    return (
        <View style={{...styles.card,borderWidth:1,borderColor:props.color}}>
            <View style={styles.innerBox}>
                <Icon />
                <Text style={styles.cardTitle}>{props.textTopRight}</Text>
            </View>
            <Text style={styles.cardTime}>{props.title}</Text>
            <View style={styles.innerBox}>
                <Text style={styles.cardDuration}>{props.textBottomLeft}</Text>
                <Text style={{...styles.cardPoints,color:props.color}}>{props.textBottomRight}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    innerBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    card: {
        width: '48%',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    cardTime: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    cardStatus: {
        fontSize: 14,
        color: 'green',
    },
    cardPoints: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#666',
    },
    cardDescription: {
        fontSize: 12,
        color: '#666',
    },
    cardDuration: {
        fontSize: 14,
        color: '#666',
    },
})