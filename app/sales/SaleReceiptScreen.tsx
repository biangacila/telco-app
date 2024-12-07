import {StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle, Dimensions, FlatList} from "react-native";
import React, {useEffect} from "react";
import {Colors} from "@/constants/Colors";
import {useSelector} from "react-redux";
import {FinanceDashboardType} from "@/types/type-finance-dashboard";
import {formatDate1, formatNumberToTwoDecimalPlaces, getDateRange} from "@/services/functions";
import Icon1 from "react-native-vector-icons/FontAwesome";
import {Transaction, User2} from "@/types/type-model";
import {FetchDataFromDomainDrivenGet} from "@/services/service-domain-driven";
import {SERVER_TELCO_CORE, SERVER_TELCO_FINANCE, SERVER_TELCO_PRODUCT} from "@/config/server-connection";
import {Icon} from "react-native-elements";
import SaleReceiptDetailScreen from "@/app/sales/SaleReceiptDetailScreen";
import {initialTransaction} from "@/types/type_initialize";

const {height,width} = Dimensions.get("screen")
export default () => {
    const store = useSelector((state: any) => state.core);
    let dashboard = store.dashboardInfo as FinanceDashboardType;
    let defaultPeriod = getDateRange("Week")
    const [WalletBalance, setWalletBalance] = React.useState(formatNumberToTwoDecimalPlaces(dashboard.Data.Balance));
    const [SelectedPeriod, setSelectedPeriod] = React.useState("Week");
    const [periodStart, setPeriodStart] = React.useState(defaultPeriod.From);
    const [periodEnd, setPeriodEnd] = React.useState(defaultPeriod.To);
    const [TransactionHistory, setTransactionHistory] = React.useState<Transaction[]>([]);
    const [SelectedTransactionHistory, setSelectedTransactionHistory] = React.useState<Transaction>(initialTransaction);
    const [showTransDetail,setShowTransDetail] = React.useState(false);

    let user = store.loginWithProvider as User2
    let org = store.currentCompany.code;

    useEffect(() => {
        loadHistoryData().then(null)
    }, [periodStart]);

    const loadHistoryData = async () => {
        console.log("loadHistoryData > ", periodStart, " > ", periodEnd);
        let endpoint = `/transactions/get/history/user/${user.code}/${periodStart}/${periodEnd}/sale`
        let req = await FetchDataFromDomainDrivenGet(SERVER_TELCO_FINANCE, endpoint)
        //console.log(" ZZZZ-loadHistoryData > ", req)
        let data = req.records as Transaction[]
        setTransactionHistory(data)
    }
    const onSelectActionPeriod = (category: string) => {
        setSelectedPeriod(category)
        // @ts-ignore
        let targetPeriod = getDateRange(category)
        setPeriodStart(targetPeriod.From)
        setPeriodEnd(targetPeriod.To)

    }
    const onPressTransaction = (item: Transaction) => {
        console.log("onPressTransaction > ", item)
        setSelectedTransactionHistory(item)
        setShowTransDetail(true)
    }
    const onCloseDetail=()=>{
        setShowTransDetail(false)
    }
    const getAllTotalAmount=():number=>{
        let tot:number = 0;
        for(let i in TransactionHistory){
            let row = TransactionHistory[i]
            tot+=row.TransAmount
        }
        return tot
    }
    const renderItem = ({item}: any) => (
        <TouchableOpacity onPress={() => onPressTransaction(item)}>
            {/* Icon */}
            <View  style={styles.transactionItem}>
                <View style={styles.infoContainer}>
                    {/*<Icon name="check" size={30} color="green"/>*/}
                    <Text style={styles.phone}>{item.ExtRef}</Text>
                    <Text style={styles.date}>| {formatDate1(item.TransDate)} | {item.TransTime}</Text>
                    <Text style={styles.amount}>R{item.TransAmount}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.category}>Old Balance: R{item.OldBalance}</Text>
                    <Text style={styles.category}>New Balance: R{item.NewBalance}</Text>
                </View>

                {/* Transaction Info */}
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>Reference: {item.ApiRef}</Text>
                    {/*<Text style={styles.status}>{item.Category}</Text>*/}
                </View>

            </View>

        </TouchableOpacity>
    );
    const RenderButtonPeriod = (name: string, includeBorderRight: boolean) => {
        let extraBoxStyle: ViewStyle = {}
        let extraStyleLabel: TextStyle = {}
        if (includeBorderRight) {
            extraBoxStyle.borderRightWidth = 1
            extraBoxStyle.borderColor = Colors.brand.lightGray
        }
        if (name === SelectedPeriod) {
            extraStyleLabel.color = Colors.brand.lightBlue
            extraStyleLabel.fontWeight = "bold"
        }
        return (
            <TouchableOpacity style={[styles.button, extraBoxStyle]} onPress={() => onSelectActionPeriod(name)}>
                <Text style={[styles.buttonText, extraStyleLabel]}>{name}</Text>
            </TouchableOpacity>
        )
    }
    if(showTransDetail){
        return(
            <SaleReceiptDetailScreen
                title={"Sale Detail"}
                onClose={onCloseDetail}
                resultType={"success"}
                transaction={SelectedTransactionHistory}
            />
        )
    }
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.boxRow}>
                    <Text style={styles.wallet}>Wallet: </Text>
                    <Text style={styles.balance}>R{WalletBalance}</Text>
                </View>
                <View style={styles.buttonRow}>
                    {RenderButtonPeriod("Day", true)}
                    {RenderButtonPeriod("Week", true)}
                    {RenderButtonPeriod("Month", true)}
                    {RenderButtonPeriod("Period", false)}
                </View>

            </View>

            <View style={styles.boxRow2}>
                <View style={styles.networkBox}>
                    <Text>Selected Type: </Text>
                    <Text style={styles.selectedPeriod}>{SelectedPeriod}</Text>
                </View>
                <Icon1 onPress={loadHistoryData} name={"refresh"} size={25} color={Colors.brand.lightRed} style={styles.icon}/>
            </View>
            <View style={styles.gridContainer}>
                <View style={styles.boxRow2}>
                    <Text style={styles.dateSelected}>From: {formatDate1(periodStart)}</Text>
                    <Text>Total: <Text style={styles.totalAmount}>R{formatNumberToTwoDecimalPlaces(getAllTotalAmount())}</Text></Text>
                    <Text style={styles.dateSelected}>To: {formatDate1(periodEnd)}</Text>
                </View>
                <View style={styles.list}>
                    <FlatList
                        data={TransactionHistory}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.Id}
                        showsVerticalScrollIndicator={false}
                    />
                </View>

            </View>

        </View>
    )
}


const styles = StyleSheet.create({
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
