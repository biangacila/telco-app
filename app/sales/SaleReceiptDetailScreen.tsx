import {Dimensions, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {SaleRecord, Transaction} from "@/types/type-model";
import {initialSaleRecord} from "@/types/type_initialize";
import {SaleResultIconWithTitle} from "@/components/sales/SaleResultIconWithTitle";
import {SaleShareGroupButton} from "@/components/sales/SaleShareGroupButton";
import {SaleCard1} from "@/components/sales/SaleCard1";
import {SaleCardButton} from "@/components/sales/SaleCardButton";
import {Colors} from "@/constants/Colors";
import {FetchDataFromDomainDrivenGet, FetchDataFromDomainDrivenGetWithError} from "@/services/service-domain-driven";
import {SERVER_TELCO_CORE, SERVER_TELCO_PRODUCT} from "@/config/server-connection";
import {formatDate1, ShareReceipt} from "@/services/functions";

type Props={
    transaction:Transaction
    onClose:any,
    title:string,
    resultType:string,
}
const {height,width} = Dimensions.get("screen")
export default (props:Props)=>{
    const[ProductRecord,setProductRecord,]=useState<SaleRecord>(initialSaleRecord)

    useEffect(()=>{
        fetchDataFromDb().then(null)
    },[])

    const fetchDataFromDb=async ()=>{
        //todo
        let endpoint = `/telkom-recharges/find/TelkomRechargeRequest?TransNumber=${props.transaction.TransNumber}`
        let req = await FetchDataFromDomainDrivenGetWithError(SERVER_TELCO_PRODUCT, endpoint)
        let data = req.data as SaleRecord[]
        if(data.length > 0){
            setProductRecord(data[0])
        }
        console.log("<>>>>>fetchDataFromDb response > ",req)

    }

    const onAddFavorite=()=>{
        // TODO
    }
    const getRecord=():{key:string,value:any}[]=>{
        let data :{key:string,value:any}[]=[
            {key:"Receiver",value:ProductRecord.PhoneNumber},
            {key:"Amount incl.Vat @15%",value: "R"+ProductRecord.SaleAmount},
            {key:"Time",value:ProductRecord.TransTime},
            {key:"Date",value:ProductRecord.TransDate},
            {key:"Category",value:ProductRecord.ProductType},
           /* {key:"Product",value:ProductRecord.ServiceDesc},*/
            {key:"Agent",value:ProductRecord.UserCode},
            {key:"Network Ref",value:ProductRecord.RechargeReference},
        ]
        if(ProductRecord.ProductType!=="airtime"){
            data.push({key:"Product",value:ProductRecord.ServiceDesc},)
        }
        return data
    }
    const onShareReceipt=async ()=>{
        let info = ProductRecord
        await ShareReceipt({
            Amount:info.SaleAmount,
            Receiver:info.PhoneNumber,
            Agent:info.UserCode,
            NetworkRef:info.RechargeReference,
            Category:info.ProductType,
            Date:formatDate1(info.TransDate),
            Time:info.TransTime,
            Product:info.ServiceDesc,
            Network:info.Network,
        })
    }
    return (
        <View style={styles.container}>
            {/* Success Icon */}
            <SaleResultIconWithTitle
                title={props.title}
                resultType={props.resultType}
            />

            {/* Action Buttons */}
            <SaleShareGroupButton onShare={onShareReceipt} onAdd={onAddFavorite}/>

            {/* Transaction Details Card */}
            <SaleCard1 data={getRecord()} />

            <View style={{marginVertical:10}}>
                <Text>For any query please call Telkom customer service at <Text style={styles.refNet}>0802589632</Text> with your Network Ref number:
                    <Text style={styles.refNet}>{ProductRecord.RechargeReference}</Text></Text>
            </View>

            {/* Go Home Button */}
            <SaleCardButton title={"Close"} onPress={props.onClose} />
        </View>
    );
}

const styles = StyleSheet.create({
    refNet:{
        fontSize:16,
        fontWeight:"bold",
        marginHorizontal:5,
    },
    totalAmount:{
        fontSize:18,
        fontWeight:"bold",
        fontStyle:"italic",
        color:Colors.brand.green
    },
    list:{
        marginTop:20

    },
    name:{

    },
    category:{

    },
    amount:{
        fontSize: 18,
        color:Colors.brand.red
    },
    date:{
        color: Colors.brand.blue,
    },
    phone:{
        fontSize:16,
        fontWeight:"bold"
    },
    infoContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        minWidth: width-60,
        paddingHorizontal:10,
    },
    transactionItem: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#f8f8f8',
        marginBottom: 10,
        borderRadius: 10,
        elevation: 1, // To give a slight shadow
        width:"100%",
        paddingHorizontal:10,
    },
    dateSelected: {
        fontSize: 11,
        color: Colors.brand.blue,
        fontWeight: "bold",
    },
    icon: {
        marginHorizontal: 5
    },
    boxRow2: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        minHeight: height / 1.5,
        backgroundColor: Colors.brand.white,
        marginVertical: 10,
        borderRadius: 10,
        padding: 10,
    },
    selectedPeriod: {
        fontSize: 20,
        color: Colors.brand.blue,
    },
    networkBox: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 10,
    },
    button: {
        flex: 1,
        flexDirection: "row",
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
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        width: '100%',
        minHeight: 50,
        backgroundColor: Colors.light.background,
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 25,

    },
    boxRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    wallet: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.brand.white,
    },
    balance: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.brand.white,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: Colors.brand.background,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: Colors.brand.blue,
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 10,
    },
})
