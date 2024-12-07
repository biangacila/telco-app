import React, {useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // For the share icon
import { FontAwesome } from '@expo/vector-icons';
import {Colors} from "@/constants/Colors";
import {useNavigation} from "expo-router";
import {SaleCard1} from "@/components/sales/SaleCard1";
import {SaleResultIconWithTitle} from "@/components/sales/SaleResultIconWithTitle";
import {SaleShareGroupButton} from "@/components/sales/SaleShareGroupButton";
import {SaleCardButton} from "@/components/sales/SaleCardButton";
import {useSelector} from "react-redux";
import {RechargeRequestType, RechargeResultType, TelkomBundleType, User2} from "@/types/type-model";
import {getTransactionDateTime} from "@/services/functions";
import moment from "moment"; // For the add to favorite icon

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


    const store = useSelector((state: any) => state.core);

    useEffect(() => {
        loadSelectedNetwork().then(null)
    }, []);
    const loadSelectedNetwork = async () => {
        let product  = store.rechargeProduct as TelkomBundleType
        let payload  = store.rechargeRequest as RechargeRequestType;
        let result  = store.rechargeResult as RechargeResultType;
        let dateInfo = getTransactionDateTime(result.TransNumber)

        setCategory(product.Category)
        setProduct(product.ServiceDesc)
        setAmount(product.Amount)
        setDate(moment(dateInfo.date).format("MMM DD, YYYY"))
        setTime(dateInfo.time)
        setTransactionCode(result.RechargeReference)
        setAgentCode(payload.user_code)
        setReceiver(payload.phone)
        if(payload.product_type!=="data"){
            setAmount(payload.sale_amount)
            setProduct("Airtime")
            setCategory("Airtime")
        }

    }

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
                {key:"Amount incl.Vat @15%",value: "R"+Amount},
                {key:"Time",value:Time},
                {key:"Date",value:Date},
                {key:"Category",value:Category},
                {key:"Product",value:Product},
                {key:"Agent",value:AgentCode},
                {key:"Network Ref",value:TransactionCode},
                /*{key:"Transaction Code",value:<>{TransactionCode}<MaterialIcons name="content-copy" size={16} color={Colors.brand.blue} /></>}*/

            ]} />

            <View style={{marginVertical:10}}>
                <Text>For any query please call Telkom customer service at <Text style={styles.refNet}>0802589632</Text> with your Network Ref number:
                    <Text style={styles.refNet}>{TransactionCode}</Text></Text>
            </View>

            {/* Go Home Button */}
            <SaleCardButton title={"Home Page"} onPress={goHome} />
        </View>
    );
};

const styles = StyleSheet.create({
    refNet:{
        fontSize:16,
        fontWeight:"bold",
        marginHorizontal:5,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
});

export default TransactionSuccessScreen;

