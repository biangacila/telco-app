import {Image, StyleSheet, Text, View} from "react-native";
import {Icon} from "react-native-elements";
import {Colors} from "@/constants/Colors";
import React from "react";


type Props={
    title: string,
    selectedNetwork:string,
    typeOfRecharge:string,
    rechargeNumber?:string,
    netIcon:string
    productIcon:string,
    productName?:string,
    productPrice?:number,
    productCategory?:string,
}
export const SaleUserInfo = (props: Props) => {
    let {title,selectedNetwork,typeOfRecharge,productIcon} = props;
    let netIcon = require( '../../assets/images/network-provider/telkom.jpeg')
    return(
        <View style={styles.userInfo}>
            <View style={styles.userDetails}>
                <Text style={styles.userName}>{title}</Text>
                <Text style={styles.phoneNumber}>{selectedNetwork}</Text>
                <Text style={styles.prepaid}>{typeOfRecharge}</Text>
                {props.rechargeNumber&&<Text style={styles.prepaid}>{props.rechargeNumber}</Text>}

                {props.productName&&<Text style={styles.prepaid}>{props.productName}</Text>}
                {props.productCategory&&<Text style={styles.prepaid}>Category: {props.productCategory}</Text>}
                {props.productPrice&&<Text style={styles.amount}>R{props.productPrice}</Text>}

                {/*<Text style={styles.changeOperator}>Change Operator</Text>*/}
            </View>
            <View>
                <Image
                    source={netIcon} // Replace with the path to your operator logo
                    style={styles.operatorLogo}
                />
                <Icon name={productIcon} type="material-community" size={30} color={Colors.brand.lightRed}/>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    amount:{
      color:Colors.brand.lightRed,
      fontSize:18,
      fontWeight:"bold"
    },
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
})
