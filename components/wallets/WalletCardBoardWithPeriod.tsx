import {StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle, Dimensions, FlatList} from "react-native";
import React, {useEffect} from "react";
import {Colors} from "@/constants/Colors";


type Props={
    balance:string,
    title:string,
    currency:string
    selectedPeriod:string
    onSelect:any
}
export default (props:Props)=>{

    const RenderButtonPeriod = (name: string, includeBorderRight: boolean) => {
        let extraBoxStyle: ViewStyle = {}
        let extraStyleLabel: TextStyle = {}
        if (includeBorderRight) {
            extraBoxStyle.borderRightWidth = 1
            extraBoxStyle.borderColor = Colors.brand.lightGray
        }
        if (name === props.selectedPeriod) {
            extraStyleLabel.color = Colors.brand.lightBlue
            extraStyleLabel.fontWeight = "bold"
        }
        return (
            <TouchableOpacity
                style={[styles.button, extraBoxStyle]}
                onPress={() => props.onSelect(name)}>
                <Text style={[styles.buttonText, extraStyleLabel]}>{name}</Text>
            </TouchableOpacity>
        )
    }

    return(
        <View style={styles.header}>
            <View style={styles.boxRow}>
                <Text style={styles.wallet}>{props.title} </Text>
                <Text style={styles.balance}>{props.currency}{props.balance}</Text>
            </View>
            <View style={styles.buttonRow}>
                {RenderButtonPeriod("Day", true)}
                {RenderButtonPeriod("Week", true)}
                {RenderButtonPeriod("Month", true)}
                {RenderButtonPeriod("Period", false)}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonText: {
        color: Colors.brand.gray,
        fontWeight: 'bold',
    },
    button: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: Colors.brand.white,
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        width: '100%',
        minHeight: 50,
        backgroundColor: Colors.light.background,
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 25,

    },
    balance: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.brand.white,
    },
    boxRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    wallet: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.brand.white,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: Colors.brand.blue,
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 10,
    },
})
