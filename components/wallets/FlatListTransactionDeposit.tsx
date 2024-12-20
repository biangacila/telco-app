import {Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {Transaction} from "@/types/type-model";
import {Colors} from "@/constants/Colors";
import {formatDate1} from "@/services/functions";

type Props={
    data:Transaction[]
    onPress:any
}
const {height,width} = Dimensions.get("screen")
export default (props:Props)=>{
    let {data,onPress}=props
    console.log("DataDeposit > ",data)
    const renderItem = ({item}: any) => (
        <TouchableOpacity onPress={() => onPress(item)}>
            <View  style={styles.transactionItem}>
                <View style={styles.infoContainer}>
                    <Text style={styles.phone}>Ref: {item.ExtRef}</Text>
                    <Text style={styles.amount}>R{item.TransAmount}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.category}>Old B.: R{item.OldBalance}</Text>
                    <Text style={styles.category}>New B.: R{item.NewBalance}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.date}> {formatDate1(item.TransDate)}</Text>
                    <Text style={styles.date}> {item.TransTime}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.category}>Bank: {item.Network.toUpperCase()}</Text>
                    <Text style={styles.category}>{item.Refs.method}</Text>
                </View>
            </View>

        </TouchableOpacity>
    );
    return(
        <View style={styles.list}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.Id}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    name:{

    },
    category:{

    },
    amount:{
        fontSize: 18,
        color:Colors.brand.red,
        fontWeight:"bold"
    },
    date:{
        color: Colors.brand.blue,
    },
    phone:{
        fontSize:14,
        fontWeight:"bold"
    },
    infoContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        minWidth: width-60,
        paddingHorizontal:10,
    },
    transactionItem: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#f8f8f8',
        marginBottom: 10,
        borderRadius: 10,
        elevation: 1, // To give a slight shadow
        width:"100%",
        paddingHorizontal:10,
    },
    list: {
        marginTop: 20
    },

})
