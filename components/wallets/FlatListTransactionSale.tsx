import {Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {Transaction} from "@/types/type-model";
import {Colors} from "@/constants/Colors";
import {formatDate1, formatDate2} from "@/services/functions";

type Props={
    data:Transaction[]
    onPress:any
}
const {height,width} = Dimensions.get("screen")
export default (props:Props)=>{
    let {data,onPress}=props
    const renderItem = ({item}: any) => (
        <TouchableOpacity onPress={() => onPress(item)}>
            <View  style={styles.transactionItem}>
                <View style={styles.infoContainer}>
                    <Text style={styles.phone}>{item.ExtRef}</Text>

                    <Text style={styles.amount}>R{item.TransAmount}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.category}>Old: R{item.OldBalance}</Text>
                    <Text style={styles.category}>New: R{item.NewBalance}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>R: {item.ApiRef}</Text>
                    <Text style={styles.date}>{formatDate2(item.TransDate+" "+item.TransTime)}</Text>
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
        color:Colors.brand.red
    },
    date:{
        color: Colors.brand.blue,
    },
    phone:{
        fontSize:16,
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
