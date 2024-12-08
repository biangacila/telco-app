import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {Colors} from "@/constants/Colors";
import styled from "styled-components/native";

type Props={
    periodStart:string,
    periodEnd:string,
    totalAmount:string,
    currency:string,
    colorDate?:string,
    colorAmount?:string,
}
export default (props:Props)=>{
    let {totalAmount,periodEnd,periodStart,currency,colorDate,colorAmount}=props
    return(
        <View style={styles.boxRow2}>

            <View style={styles.box}>
                <Text style={styles.dateSelected}>From:</Text>
                <DateLabel color={colorDate}>{periodStart}</DateLabel>
            </View>

            <View style={styles.box}>
                <Text>Total: <Text style={styles.totalAmount}></Text></Text>
                <DateLabel color={colorAmount}>{currency} {totalAmount}</DateLabel>
            </View>

            <View style={styles.box}>
                <Text style={styles.dateSelected}>To:</Text>
                <DateLabel color={colorDate}>{periodEnd}</DateLabel>
            </View>

        </View>
    )
}
const DateLabel = styled.Text<any>`
    font-size: 16px;
    font-weight: bold;
    color: ${(props:any)=>props.color?props.color:Colors.brand.blue};
`
const styles = StyleSheet.create({
    box:{
      flexDirection:"row",
      justifyContent:"flex-start",
      alignItems:"center",
        gap:5
    },
    totalAmount:{
        fontSize:18,
        fontWeight:"bold",
        fontStyle:"italic",
        color:Colors.brand.green
    },
    dateSelected: {
        fontSize: 11,
        fontWeight: "bold",
    },
    boxRow2: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
})
