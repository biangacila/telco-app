import {StyleSheet, Text, TouchableOpacity} from "react-native";
import React from "react";
import {Colors} from "@/constants/Colors";


type Props={
    title: string,
    color?: string,
    bgColor?: string,
    onPress:any,
}

export const SaleCardButton = (props: Props) => (
    <TouchableOpacity
        onPress={props.onPress}
        style={{
        ...styles.button,backgroundColor:props.bgColor?props.bgColor:Colors.brand.blue,
        }}
    >
        <Text style={{
            ...styles.text,color:props.color?props.color:Colors.brand.white,
        }}>{props.title}</Text>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.brand.blue,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
})