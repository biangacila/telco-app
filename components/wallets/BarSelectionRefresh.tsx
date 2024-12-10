import {StyleSheet, Text, View} from "react-native";
import Icon1 from "react-native-vector-icons/FontAwesome";
import {Colors} from "@/constants/Colors";
import React from "react";

type Props={
    SelectedPeriod:string,
    iconName:string
    title:string,
    onPress:()=>void,
}
export default (props:Props)=>{
    let {SelectedPeriod,iconName,onPress,title} = props
    return(
        <View style={styles.boxRow2}>
            <View style={styles.networkBox}>
                <Text>{title} </Text>
                <Text style={styles.selectedPeriod}>{SelectedPeriod}</Text>
            </View>
            <Icon1 onPress={onPress} name={iconName} size={25} color={Colors.brand.lightRed} style={styles.icon}/>
        </View>
    )
}
const styles = StyleSheet.create({
    icon: {
        marginHorizontal: 5
    },
    selectedPeriod: {
        fontSize: 20,
        color: Colors.brand.blue,
    },
    networkBox: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 10,
    },
    boxRow2: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        paddingHorizontal:10
    },
})
