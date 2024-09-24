import {StyleSheet, Text, View} from "react-native";
import {MaterialIcons,AntDesign} from "@expo/vector-icons";
import React from "react";
import {Colors} from "@/constants/Colors";
//import AntDesign from "react-native-vector-icons/AntDesign"


type Props={
    title: string,
    color?:string,
    resultType:string |"success"|"fail"
}
export const SaleResultIconWithTitle = (props: Props) => {
    const getColor=():string=>{
        if(props.resultType==="fail"){
            return Colors.brand.red
        }
        return Colors.brand.blue;
    }
    return(
        <View style={styles.iconWrapper}>
            <View style={{...styles.successIcon, backgroundColor:getColor()}}>
                {props.resultType==="success"?
                    <MaterialIcons name="check-circle" size={64} color="#fff" />:
                    <AntDesign name={"closecircle"} size={64} color="#fff" />
                }
            </View>
            <Text style={styles.successText}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    iconWrapper: {
        alignItems: 'center',
        marginBottom: 20,
    },
    successIcon: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.brand.blue,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    successText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})