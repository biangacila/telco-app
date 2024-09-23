import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/AntDesign';
import {Colors} from "@/constants/Colors";
import {useNavigation} from "expo-router";

const HomeScreen = () => {
    const [WalletBalance, setWalletBalance] = React.useState<number>(20.355);
    const [FloatBalance, setFloatBalance] = React.useState<number>(350);
    let colors = Colors.brand;

    const navigation = useNavigation();
    const onSelectAction=(link:string)=>{

    }
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.username}>Available Balance</Text>
                <Text style={styles.balance}>R{WalletBalance}</Text>
                <Text style={styles.bookBalance}>Float Balance: R{FloatBalance}</Text>
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.button}>
                        <Icon1 name={"credit-card"} size={15} color={Colors.brand.dark}  style={styles.icon}/>
                        <Text style={styles.buttonText}>Convert Airtime</Text>
                    </TouchableOpacity>
                    <View style={styles.buttonSeparator}/>
                    <TouchableOpacity style={styles.button}>
                        <Icon2 name={"wallet"} size={25} color={Colors.brand.dark}  style={styles.icon}/>
                        <Text style={styles.buttonText}>Fund Wallet</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Grid for Options */}
            <View style={styles.gridContainer}>
                {[
                    { name: 'Buy Data', icon: 'wifi' ,color:colors.lightRed },
                    { name: 'Buy Airtime', icon: 'phone' ,color:colors.lightBlue},
                    { name: 'Bill Payments', icon: 'lightbulb-outline',color:colors.yellow },
                    { name: 'Withdrawal', icon: 'bank' ,color:colors.lightBlue},
                    { name: 'Transfer', icon: 'swap-horizontal',color:colors.green },
                    { name: 'History', icon: 'history',color:colors.red },
                    { name: 'Profile', icon: 'account-circle',color:colors.yellow },
                    { name: 'Support Ticket', icon: 'help-outline' ,color:colors.dark},
                    { name: 'FAQ', icon: 'information-outline',color:colors.green },
                ].map((item, index) => (
                    <TouchableOpacity key={index} style={styles.gridItem}>
                        <Icon name={item.icon} type="material-community" size={30} color={item.color}/>
                        <Text style={styles.gridText}>{item.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    icon:{
      marginHorizontal:5
    },
    buttonSeparator:{
      height: 30,
      width:1,
      backgroundColor:Colors.brand.lightGray
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: Colors.brand.background,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor:Colors.brand.blue,
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 10,
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
        color:Colors.brand.white,
    },
    balance: {
        fontSize: 24,
        fontWeight: 'bold',
        color:Colors.brand.white,
    },
    bookBalance: {
        fontSize: 16,
        marginBottom: 10,
        color:Colors.brand.white,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:"center",
        width: '100%',
        backgroundColor:Colors.light.background,
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 25,

    },
    button: {
        flex: 1,
        flexDirection:"row",
        backgroundColor: Colors.brand.white,
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: Colors.brand.gray,
        fontWeight: 'bold',
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    gridItem: {
        width: '30%',
        marginVertical: 10,
        alignItems: 'center',
        backgroundColor:Colors.light.background,
        paddingVertical:10
    },
    gridText: {
        marginTop: 10,
        textAlign: 'center',
    },
});

export default HomeScreen;
