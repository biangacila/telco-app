import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // For the share icon
import { FontAwesome } from '@expo/vector-icons';
import {Colors} from "@/constants/Colors";
import {useNavigation} from "expo-router";
import {SaleCard1} from "@/components/sales/SaleCard1";
import {SaleResultIconWithTitle} from "@/components/sales/SaleResultIconWithTitle";
import {SaleShareGroupButton} from "@/components/sales/SaleShareGroupButton";
import {SaleCardButton} from "@/components/sales/SaleCardButton"; // For the add to favorite icon

const TransactionSuccessScreen = () => {
    const[Receiver, setReceiver] = React.useState<string>("+27 72 913 9504");
    const[Amount, setAmount] = React.useState<number>(35.50);
    const[Time, setTime] = React.useState<string>("09:28:23");
    const[Date, setDate] = React.useState<string>("Sep 24, 2024");
    const[TransactionCode,setTransactionCode] = React.useState<string>("TN-1298087654923");
    const[Category,setCategory] = React.useState<string>("Data AllNet");
    const[Product,setProduct] = React.useState<string>("1.5 GB, night 1 GB");
    const[AgentCode,setAgentCode] = React.useState<string>("UC10025");
    const navigation = useNavigation();

    const onShareReceipt=()=>{
        // TODO
    }
    const onAddFavorite=()=>{
        // TODO
    }
    const goHome=()=>{
        navigation.navigate("home/HomeWorkerScreen" as never);
    }
    return (
        <View style={styles.container}>
            {/* Success Icon */}
            <SaleResultIconWithTitle
                title={"Successfully sent"}
                resultType={"success"}
            />

            {/* Action Buttons */}
            <SaleShareGroupButton onShare={onShareReceipt} onAdd={onAddFavorite}/>

            {/* Transaction Details Card */}
            <SaleCard1 data={[
                {key:"Receiver",value:Receiver},
                {key:"Amount",value:Amount},
                {key:"VAT",value:"R0.35"},
                {key:"Time",value:Time},
                {key:"Date",value:Date},
                {key:"Category",value:Category},
                {key:"Product",value:Product},
                {key:"Agent",value:AgentCode},
                {key:"Network Ref",value:"iRTY2587"},
                {key:"Transaction Code",value:<>{TransactionCode}<MaterialIcons name="content-copy" size={16} color={Colors.brand.blue} /></>},

            ]} />

            {/* Go Home Button */}
            <SaleCardButton title={"Home Page"} onPress={goHome} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
});

export default TransactionSuccessScreen;

