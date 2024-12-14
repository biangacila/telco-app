import {Image, StyleSheet, Text, TextStyle, View} from "react-native";
import {Icon} from "react-native-elements";
import {Colors} from "@/constants/Colors";
import React from "react";


type Props={
    title: string,
    selectedNetwork:string,
    typeOfRecharge:string,
    rechargeNumber?:string,
    netIcon?:string
    productIcon?:string,
    productName?:string,
    productPrice?:number,
    productCategory?:string,
}
export const SaleUserInfo = (props: Props) => {
    let {
        title,
        selectedNetwork,
        typeOfRecharge,
        rechargeNumber,
        productIcon,
        productName,
        productPrice,
        productCategory,
    } = props;
    let netIcon = require( '../../assets/images/network-provider/telkom.jpeg')
    if(props.netIcon){
        netIcon = props.netIcon
    }
    if(!productName){
        productName = "";
    }
    if(!productPrice){
        productPrice = 0
    }
    if(!productCategory){
        productCategory = "";
    }
    if(!rechargeNumber){
        rechargeNumber = "";
    }
    console.log("SaleUserInfo %%%%%%%%%%%-----> ",{
        title,
        selectedNetwork,
        typeOfRecharge,
        rechargeNumber,
        productIcon,
        productName,
        productPrice,
        productCategory,
    });

    const RenderInfo=(value:any,display:string,innerStyle?:TextStyle)=>{
        if(!value){
            return null;
        }
        if(value==""){
            return null
        }
        return(
            <Text style={innerStyle}>{display}</Text>
        )
    }
    return(
        <View style={styles.userInfo}>
            <View style={styles.userDetails}>
                {RenderInfo(title,title,styles.userName)}
                {RenderInfo(selectedNetwork,selectedNetwork,styles.phoneNumber)}
                {RenderInfo(typeOfRecharge,typeOfRecharge,styles.prepaid)}
                {RenderInfo(rechargeNumber,rechargeNumber,styles.prepaid)}
                {RenderInfo(productName,productName,styles.prepaid)}
                {RenderInfo(productCategory,`Category: ${productCategory}`,styles.prepaid)}
                {RenderInfo(productPrice,`R${productPrice}`,styles.amount)}
            </View>
            <View>
                <Image
                    source={netIcon}
                    style={styles.operatorLogo}
                />
                <Icon
                    name={productIcon||"alert-circle"}
                    type="material-community"
                    size={30}
                    color={Colors.brand.lightRed}
                />
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
