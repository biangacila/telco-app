import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {TelkomBundleType} from "@/types/type-model";
import {initialTelkomBundleType} from "@/types/type_initialize";
import {ReduxSetRechargeAmount} from "@/redux/actions";
import {useNavigation} from "expo-router";
import {SaleUserInfo} from "@/components/sales/SaleUserInfo";
import {Alert, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Colors} from "@/constants/Colors";

export default ()=>{
    const [SelectedNetwork,setSelectedNetwork] = useState('');
    const [TypeOfRecharge,setTypeOfRecharge] = useState('');
    const [rechargeNumber, setRechargeNumber] = useState('');
    const [rechargeAmount, setRechargeAmount] = useState('');
    const [SelectedProduct,setSelectedProduct] = useState<TelkomBundleType>(initialTelkomBundleType);

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const store = useSelector((state: any) => state.core);
    useEffect(() => {
        loadSelectedNetwork().then(null)
    }, []);
    const loadSelectedNetwork = async () => {
        setSelectedNetwork(store.rechargeNetwork)
        setTypeOfRecharge(store.rechargeType)
        setRechargeNumber(store.rechargeNumber);
        setRechargeAmount(store.rechargeAmount);
        setSelectedProduct(store.rechargeProduct)
    }

    const handleProceed = () => {
        // Handle the proceed button logic here
        Alert.alert(
            'Submit request',
            'Are you sure to submit this recharge?',
            [
                {text: "Cancel"},
                {text:"Submit",onPress:()=>submitRecharger()}
            ]
        )
        //navigation.navigate("sales/SaleRequestSummaryScreen" as never)
    };
    const submitRecharger = async()=>{
        //todo coming soon
        console.log("submitRecharger > coming soon!")
    }
    const getAmount = ():number=>{
        if(TypeOfRecharge=="Buy Data"){
            return SelectedProduct.Amount
        }
        return SelectedProduct.Amount
    }
    const getProduct=():any=>{
        if(TypeOfRecharge=="Buy Data"){
            return SelectedProduct.ServiceDesc
        }
        return undefined
    }
    const getCategory=():any=>{
        if(TypeOfRecharge=="Buy Data"){
            return SelectedProduct.Category
        }
        return undefined
    }
    return (
        <View style={styles.container}>
            {/* User and Operator Info */}
            <SaleUserInfo
                title={"Summary"}
                selectedNetwork={SelectedNetwork}
                typeOfRecharge={TypeOfRecharge}
                rechargeNumber={rechargeNumber}
                productPrice={getAmount()}
                productName={getProduct()}
                productCategory={getCategory()}
                netIcon={"network-provider"}
                productIcon={"wifi"}
            />

            {/* Proceed Button */}
            <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
                <Text style={styles.proceedButtonText}>Submit Recharge</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    userInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        elevation: 2,
    },
    userDetails: {
        flex: 1,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    phoneNumber: {
        fontSize: 16,
        marginVertical: 5,
    },
    prepaid: {
        fontSize: 14,
        color: '#888',
    },
    changeOperator: {
        fontSize: 14,
        color: '#007BFF',
    },
    operatorLogo: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    inputSection: {
        marginBottom: 20,
    },
    enterAmountText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    amountInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FFB703',
        padding: 10,
        borderRadius: 5,
    },
    currency: {
        fontSize: 24,
        marginRight: 10,
    },
    amountInput: {
        flex: 1,
        fontSize: 24,
        fontWeight: 'bold',
    },
    proceedButton: {
        backgroundColor: Colors.brand.green,
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    proceedButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
