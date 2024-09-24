import React, {useState} from 'react';
import {View, Text, FlatList, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements';
import {SaleUserInfo} from "@/components/sales/SaleUserInfo";
import SaleComboboxCategory from "@/components/sales/SaleComboboxCategory";
import {useNavigation} from "expo-router";

const transactions = [
    { id: '1', name: 'James Joe', status: 'success', amount: '+$230', time: '2.00pm' },
    { id: '2', name: 'James Joe', status: 'success', amount: '+$230', time: '2.00pm' },
    { id: '3', name: 'James Joe', status: 'success', amount: '+$230', time: '2.00pm' },
    { id: '4', name: 'James Joe', status: 'success', amount: '+$230', time: '2.00pm' },
    { id: '5', name: 'James Joe', status: 'success', amount: '+$230', time: '2.00pm' },
];

const TransactionScreen = () => {
    const [SelectedNetwork,setSelectedNetwork] = useState('Kelcom');
    const [NetworkIcon,setNetworkIcon] = useState('telkom.jpeg');
    const [TypeOfRecharge,setTypeOfRecharge] = useState('data');
    const [RechargeNumber,setRechargeNumber]=useState("+27 72 913 9504")

    const navigation = useNavigation();

    const onPressProduct=(product :string)=>{
        navigation.navigate("sales/SaleResultSuccessScreen" as never);
    }
    const renderItem = ({ item }:any) => (
        <TouchableOpacity style={styles.transactionItem} onPress={()=>onPressProduct(item.name)}>
            {/* Icon */}
            <View style={styles.iconContainer}>
                <Icon name="arrow-downward" size={30} color="green" />
            </View>

            {/* Transaction Info */}
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.status}>{item.status}</Text>
            </View>

            {/* Amount and Time */}
            <View style={styles.amountContainer}>
                <Text style={styles.amount}>{item.amount}</Text>
                <Text style={styles.time}>{item.time}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <SaleUserInfo
                title={RechargeNumber}
                selectedNetwork={SelectedNetwork}
                typeOfRecharge={TypeOfRecharge}
                netIcon={"network-provider"}
                productIcon={"wifi"}
            />
            <View>
                <SaleComboboxCategory />
            </View>
            <FlatList
                data={transactions}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    transactionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#f8f8f8',
        marginBottom: 10,
        borderRadius: 10,
        elevation: 1, // To give a slight shadow
    },
    iconContainer: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e5f8e5',
        borderRadius: 25,
    },
    infoContainer: {
        flex: 1,
        marginLeft: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    status: {
        fontSize: 14,
        color: '#666',
    },
    amountContainer: {
        alignItems: 'flex-end',
    },
    amount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    time: {
        fontSize: 14,
        color: '#888',
    },
});

export default TransactionScreen;
