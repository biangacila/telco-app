import {TextStyle, View, Text, StyleSheet, ViewStyle} from "react-native";
import React from "react";
import {Colors} from "@/constants/Colors";


type Props = {
    title: string,
    styleTitle?: TextStyle,
    styleLine?: ViewStyle,
    styleBox?: ViewStyle,
}
export const LineWithTextMiddle: React.FC<Props> = ({styleBox, title, styleTitle, styleLine}) => {

    return (
        <View style={[styles.container, styleBox]}>
            <View style={[styles.part1, styleLine]}/>

            <Text style={[styles.title,styleTitle]}>{title}</Text>

            <View style={[styles.part1, styleLine]}/>
        </View>
    )
}
const styles = StyleSheet.create({
    title: {
        fontSize: 12,
        fontWeight: "bold",
        color: "black"
    },
    part1: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: Colors.brand.lightBlue,
    },
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent:"space-between",
        gap: 16,
        backgroundColor:Colors.brand.white,
        minHeight:25
    }
})
