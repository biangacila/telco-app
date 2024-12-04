import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import {useNavigation} from "expo-router";
import {useDispatch} from "react-redux";
import {ReduxSetRechargeNetwork, ReduxSetRechargeNumber} from "@/redux/actions";

const networkData = [
    {
        name: 'Telkom SA',
        image: require('../../assets/images/network-provider/telkom.jpeg'), // replace with the path to your image
    },
    {
        name: 'Vodacom',
        image: require('../../assets/images/network-provider/vodacom.jpeg'), // replace with the path to your image
    },
    {
        name: 'Cell-C',
        image: require('../../assets/images/network-provider/cellc.png'), // replace with the path to your image
    },
    {
        name: 'MTN Airtime',
        image: require('../../assets/images/network-provider/mtn.jpg'), // replace with the path to your image
    },

    {
        name: 'DSTV',
        image: require('../../assets/images/network-provider/dstv.png'), // replace with the path to your image
    },
    {
        name: 'Eskom',
        image: require('../../assets/images/network-provider/eskom.png'), // replace with the path to your image
    },
];

const SelectNetworkScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const onPressSale=(networkName:string)=>{
        dispatch(ReduxSetRechargeNetwork(networkName))
        navigation.navigate("sales/SaleProcess1Type" as never)
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Organization | Network </Text>
            <Text style={styles.subtitle}>Refresh List</Text>

            {/* Grid of Networks */}
            <View style={styles.gridContainer}>
                {networkData.map((network, index) => (
                    <TouchableOpacity key={index} style={styles.gridItem} onPress={() => onPressSale(network.name)}>
                        <Image source={network.image} style={styles.networkImage} />
                        <Text style={styles.networkText}>{network.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 14,
        color: '#007BFF',
        textAlign: 'right',
        marginBottom: 20,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    gridItem: {
        width: '45%',
        alignItems: 'center',
        marginVertical: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#f8f8f8',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 2,
    },
    networkImage: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    networkText: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default SelectNetworkScreen;
