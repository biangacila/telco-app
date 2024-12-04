import React, {useEffect, useState} from "react";
import {useNavigation} from "expo-router";
import {useDispatch, useSelector} from "react-redux";
import {ReduxSetRechargeAmount, ReduxSetRechargeNumber} from "@/redux/actions";
import {SaleUserInfo} from "@/components/sales/SaleUserInfo";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";

export default ()=>{
    const [SelectedNetwork,setSelectedNetwork] = useState('');
    const [TypeOfRecharge,setTypeOfRecharge] = useState('');
    const [rechargeNumber, setRechargeNumber] = useState('');
    const [InputRechargeAmount, setInputRechargeAmount] = useState('');
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
    }
    const handleProceed = () => {
        // Handle the proceed button logic here
        dispatch(ReduxSetRechargeAmount(InputRechargeAmount))
        console.log(`Proceed with recharge amount: R ${InputRechargeAmount}`);
        navigation.navigate("sales/SaleRequestSummaryScreen" as never)
    };


    return (
        <View style={styles.container}>
            {/* User and Operator Info */}
            <SaleUserInfo
                title={"Recharge Amount"}
                selectedNetwork={SelectedNetwork}
                typeOfRecharge={TypeOfRecharge}
                rechargeNumber={rechargeNumber}
                netIcon={"network-provider"}
                productIcon={"wifi"}
            />
            {/* Input Amount */}
            <View style={styles.inputSection}>
                <Text style={styles.enterAmountText}>Enter your amount</Text>
                <View style={styles.amountInputWrapper}>
                    <Text style={styles.currency}>R</Text>
                    <TextInput
                        style={styles.amountInput}
                        value={InputRechargeAmount}
                        onChangeText={setInputRechargeAmount}
                        keyboardType="numeric"
                        placeholder="10"
                    />
                </View>
            </View>
            {/* Proceed Button */}
            <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
                <Text style={styles.proceedButtonText}>Proceed</Text>
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
        backgroundColor: '#000',
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
