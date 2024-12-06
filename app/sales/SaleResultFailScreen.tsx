import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons'; // For the share icon
import {FontAwesome} from '@expo/vector-icons';
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

export default    () => {
    const [Receiver, setReceiver] = React.useState<string>("+27 72 913 9504");
    const [Amount, setAmount] = React.useState<number>(35.50);
    const [Category, setCategory] = React.useState<string>("Data AllNet");
    const [Product, setProduct] = React.useState<string>("1.5 GB, night 1 GB");
    const [AgentCode, setAgentCode] = React.useState<string>("UC10025");
    const navigation = useNavigation();


    const store = useSelector((state: any) => state.core);

    useEffect(() => {
        loadSelectedNetwork().then(null)
    }, []);
    const loadSelectedNetwork = async () => {
        let product = store.rechargeProduct as TelkomBundleType
        let payload = store.rechargeRequest as RechargeRequestType;
        let result = store.rechargeResult as RechargeResultType;
        let dateInfo = getTransactionDateTime(result.TransNumber)

        setCategory(product.Category)
        setProduct(product.ServiceDesc)
        setAmount(product.Amount)
        /*setDate(moment(dateInfo.date).format("MMM DD, YYYY"))
        setTime(dateInfo.time)
        setTransactionCode(result.RechargeReference)*/
        setAgentCode(payload.user_code)
        setReceiver(payload.phone)
        if (payload.product_type !== "data") {
            setAmount(payload.sale_amount)
            setProduct("Busy Airtime")
            setCategory("Airtime")
        }

    }

    const onShareReceipt = () => {
        // TODO
    }
    const onAddFavorite = () => {
        // TODO
    }
    const goHome = () => {
        navigation.navigate("home/HomeWorkerScreen" as never);
    }

    return (
        <View style={styles.container}>
            {/* Success Icon */}
            <SaleResultIconWithTitle
                title={"Fail recharge"}
                resultType={"fail"}
            />

            <SaleCard1 data={[
                {key:"Receiver",value:Receiver},
                {key:"Amount",value:Amount},
                {key:"Category",value:Category},
                {key:"Product",value:Product},
                {key:"Agent",value:AgentCode},
            ]} />

            <View style={{marginBottom:20}}>
                <Text style={styles.errMessage}>
                    {store.rechargeResultFail}
                </Text>
            </View>

            {/* Go Home Button */}
            <SaleCardButton title={"Home Page"} onPress={goHome} />

        </View>
    )
}


const styles = StyleSheet.create({
    errMessage:{
        fontSize:18,
        fontWeight:"bold",
        color:Colors.brand.red,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
});
