import {StyleSheet, Text, View} from "react-native";
import React from "react";

type Props={
    data:{key :string,value:any}[]
}
export const SaleCard1 = (props: Props) => {

    return(
        <View style={styles.card}>
            {props.data.map(item=>{
                return(
                    <View style={styles.row}>
                        <Text style={styles.label}>{item.key}:</Text>
                        <Text style={styles.value}>{item.value}</Text>
                    </View>
                )
            })}
        </View>
    )
}
const styles = StyleSheet.create({
    card: {
        padding: 15,
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 16,
        color: '#333',
    },
})