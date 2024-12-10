import {StyleSheet, View, Dimensions, ScrollView} from "react-native";
import React, {useEffect} from "react";
import {Colors} from "@/constants/Colors";
import {useSelector} from "react-redux";
import {FinanceDashboardType} from "@/types/type-finance-dashboard";
import {
    formatDate1,
    formatNumberToTwoDecimalPlaces, getAllTransactionTotalAmount,
    getDateRange,
    loadTransactionHistoryData, sortTransactionsByDateTime
} from "@/services/functions";
import {Transaction, User2} from "@/types/type-model";
import SaleReceiptDetailScreen from "@/app/sales/SaleReceiptDetailScreen";
import {initialTransaction} from "@/types/type_initialize";
import WalletCardBoardWithPeriod from "@/components/wallets/WalletCardBoardWithPeriod";
import PeriodInfoBar1 from "@/components/wallets/PeriodInfoBar1";
import FlatListTransactionSale from "@/components/wallets/FlatListTransactionSale";
import BarSelectionRefresh from "@/components/wallets/BarSelectionRefresh";
import {BarPeriodAndTotal} from "@/components/wallets/BarPeriodAndTotal";

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
        loadTransactionHistoryData(user.code,periodStart,periodEnd,"sale",setTransactionHistory).then(null)
    }
    const onSelectActionPeriod = (category: string) => {
        setSelectedPeriod(category)
        // @ts-ignore
        let targetPeriod = getDateRange(category)
        setPeriodStart(targetPeriod.From)
        setPeriodEnd(targetPeriod.To)

    }
    const onPressTransaction = (item: Transaction) => {
        setSelectedTransactionHistory(item)
        setShowTransDetail(true)
    }
    const onCloseDetail=()=>{
        setShowTransDetail(false)
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
            <ScrollView contentContainerStyle={styles.scrollContent}>
            <WalletCardBoardWithPeriod
                title={"Wallet:"}
                balance={WalletBalance}
                selectedPeriod={SelectedPeriod}
                onSelect={onSelectActionPeriod}
                currency={"R "}
            />

            <BarSelectionRefresh
                iconName={"refresh"}
                SelectedPeriod={SelectedPeriod}
                title={"Selected Period"}
                onPress={loadHistoryData}
            />
            <View style={styles.gridContainer}>
                <BarPeriodAndTotal
                    from={formatDate1(periodStart)}
                    to={formatDate1(periodEnd)}
                    total={getAllTransactionTotalAmount(TransactionHistory)}
                    colorValue={Colors.brand.blue}
                />
                <FlatListTransactionSale
                    data={sortTransactionsByDateTime(TransactionHistory)}
                    onPress={onPressTransaction}
                />

            </View>
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    scrollContent: {
        paddingBottom: 10, // To prevent content from being hidden behind the bottom nav
    },
    gridContainer: {
        flexDirection: 'column',
        /*flexWrap: 'wrap',*/
        justifyContent: 'flex-start',
        alignItems:"flex-start",
        minHeight: height / 1.5,
        backgroundColor: Colors.brand.white,
        marginVertical: 10,
        borderRadius: 10,
        padding: 10,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: Colors.brand.background,
        paddingBottom: 40,
    },
})
