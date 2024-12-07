import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements';
import {SaleUserInfo} from "@/components/sales/SaleUserInfo";
import SaleComboboxCategory from "@/components/sales/SaleComboboxCategory";
import {useNavigation} from "expo-router";
import {useDispatch} from "react-redux";
import {FetchDataFromDomainDrivenGet} from "@/services/service-domain-driven";
import {SERVER_TELCO_CORE, SERVER_TELCO_PRODUCT} from "@/config/server-connection";
import {DealerType, TelkomBundleType} from "@/types/type-model";
import {initialTelkomBundleType} from "@/types/type_initialize";
import {Colors} from "@/constants/Colors";
import {ReduxSetRechargeProduct} from "@/redux/actions";

const transactions = [
    { id: '1', name: 'James Joe', status: 'success', amount: '+$230', time: '2.00pm' },
    { id: '2', name: 'James Joe', status: 'success', amount: '+$230', time: '2.00pm' },
    { id: '3', name: 'James Joe', status: 'success', amount: '+$230', time: '2.00pm' },
    { id: '4', name: 'James Joe', status: 'success', amount: '+$230', time: '2.00pm' },
    { id: '5', name: 'James Joe', status: 'success', amount: '+$230', time: '2.00pm' },
];

const TransactionScreen = () => {
    const [SelectedNetwork,setSelectedNetwork] = useState('Telkom');
    const [NetworkIcon,setNetworkIcon] = useState('telkom.jpeg');
    const [TypeOfRecharge,setTypeOfRecharge] = useState('data');
    const [RechargeNumber,setRechargeNumber]=useState("+27 72 913 9504")
    const [DataProduct,setDataProduct]=useState<TelkomBundleType[]>([]);
    const [SelectedProduct,setSelectedProduct]=useState<TelkomBundleType>(initialTelkomBundleType);
    const [SelectedCategory,setSelectedCategory]=useState("")
    const navigation = useNavigation();

    const dispatch = useDispatch();
    useEffect(() => {
        loadBundleList().then(null)
    }, []);

    const loadBundleList=async ()=>{
        let endpoint = `/telkom-bundles/get/telkombundle`
        let result = await FetchDataFromDomainDrivenGet(SERVER_TELCO_PRODUCT, endpoint)
        let data = result as TelkomBundleType[]
        setDataProduct(data)
    }

    const getProductList = ():TelkomBundleType[]=>{
        let ls:TelkomBundleType[]=[]
        for(let i in DataProduct){
            let row = DataProduct[i];
            if(SelectedCategory!==""){
                if(row.Category!==SelectedCategory){
                    continue
                }
            }
            ls.push(row)
        }
        return ls
    }
    const buildCategoryList=():string[]=>{
        let maps:{[index:string]:any}= {}
        let ls:string[]=[]
        for(let i in DataProduct){
            let row = DataProduct[i]
            maps[row.Category] = row.Category
        }
        for(let i in maps){
            ls.push(i)
        }
        return ls
    }

    const onPressProduct=(product :TelkomBundleType)=>{
        setSelectedProduct(product)
        dispatch(ReduxSetRechargeProduct(product))
        console.log("onPressProduct > ",product)
        let link = "sales/SaleRequestSummaryScreen" //"sales/SaleResultSuccessScreen"
        navigation.navigate(link as never);
    }
    const renderItem = ({ item }:any) => (
        <TouchableOpacity style={styles.transactionItem} onPress={()=>onPressProduct(item)}>
            {/* Icon */}
            <View style={styles.iconContainer}>
                <Icon name="arrow-downward" size={30} color="green" />
            </View>

            {/* Transaction Info */}
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{item.ServiceDesc}</Text>
                {/*<Text style={styles.status}>{item.Category}</Text>*/}
            </View>

            {/* Amount and Time */}
            <View style={styles.amountContainer}>
                <Text style={styles.amount}>R{item.Amount}</Text>
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
                <SaleComboboxCategory onSelected={setSelectedCategory} data={buildCategoryList()}/>
            </View>
            <FlatList
                data={getProductList()}
                renderItem={renderItem}
                keyExtractor={(item) => item.Id}
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
        /*fontWeight: 'bold',*/
    },
    status: {
        fontSize: 14,
        color: '#666',
    },
    amountList: {
        fontSize: 16,
        color: Colors.brand.red,
    },
    amountContainer: {
        alignItems: 'flex-end',
    },
    amount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.brand.red,
    },
    time: {
        fontSize: 14,
        color: '#888',
    },
});

export default TransactionScreen;
