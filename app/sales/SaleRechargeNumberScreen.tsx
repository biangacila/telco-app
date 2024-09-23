import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import {Icon} from "react-native-elements";
import {Colors} from "@/constants/Colors";
import {SaleUserInfo} from "@/components/sales/SaleUserInfo";
import {useNavigation} from "expo-router";

const BuyAirtimeScreen = () => {
    const [amount, setAmount] = useState('');
    const [SelectedNetwork,setSelectedNetwork] = useState('Kelcom');
    const [NetworkIcon,setNetworkIcon] = useState('telkom.jpeg');
    const [TypeOfRecharge,setTypeOfRecharge] = useState('data');

    const navigation = useNavigation();

    const handleProceed = () => {
        // Handle the proceed button logic here
        console.log(`Proceed with Amount: R${amount}`);
        navigation.navigate("sales/SaleProductScreen" as never)
    };

    let netIcon = require( '../../assets/images/network-provider/telkom.jpeg')

    return (
        <View style={styles.container}>
            {/* User and Operator Info */}
            <SaleUserInfo
                title={"Recharge Number"}
                selectedNetwork={SelectedNetwork}
                typeOfRecharge={TypeOfRecharge}
                netIcon={"network-provider"}
                productIcon={"wifi"}
            />
            {/* Input Amount */}
            <View style={styles.inputSection}>
                <Text style={styles.enterAmountText}>Enter phone number</Text>
                <View style={styles.amountInputWrapper}>
                    <Text style={styles.currency}>+27</Text>
                    <TextInput
                        style={styles.amountInput}
                        value={amount}
                        onChangeText={setAmount}
                        keyboardType="numeric"
                        placeholder="729139500"
                    />
                </View>
            </View>

            {/* Proceed Button */}
            <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
                <Text style={styles.proceedButtonText}>Proceed</Text>
            </TouchableOpacity>
        </View>
    );
};

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

export default BuyAirtimeScreen;
