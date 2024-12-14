import React, {useEffect, useState,} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    Allocation,
    DealerType,
    RechargeResultType,
    RoleType,
    SellerType,
    TelkomBundleType,
    User2
} from "@/types/type-model";
import {initialTelkomBundleType} from "@/types/type_initialize";
import {
    ReduxSetRechargeAmount,
    ReduxSetRechargeRequest,
    ReduxSetRechargeResult,
    ReduxSetRechargeResultFail
} from "@/redux/actions";
import {useNavigation} from "expo-router";
import {SaleUserInfo} from "@/components/sales/SaleUserInfo";
import {Alert, StyleSheet, Text, TouchableOpacity, View, Dimensions, LogBox} from "react-native";
import {Colors} from "@/constants/Colors";
import {findUserSellerConfig, RequestRechargeMapsNetwork} from "@/services/functions";
import {
    FetchDataFromDomainDrivenGet,
    FetchDataFromDomainDrivenPost,
    FetchDataFromDomainDrivenPostWithError
} from "@/services/service-domain-driven";
import {SERVER_TELCO_CORE, SERVER_TELCO_PRODUCT} from "@/config/server-connection";
import FilterSelections from "@/components/settings/FilterSelections";
import {FinanceDashboardType} from "@/types/type-finance-dashboard";
import {Icon} from "react-native-elements";

let {width,} = Dimensions.get("window")

// Suppress specific warnings
LogBox.ignoreLogs([
    'WARN  [Layout children]: No route named', // Suppress the specific warning
]);

export default () => {
    const [busy, setBusy] = useState(false);
    const [WalletBalance, setWalletBalance] = React.useState<number>(0);
    const [SelectedNetwork, setSelectedNetwork] = useState('');
    const [TypeOfRecharge, setTypeOfRecharge] = useState('');
    const [rechargeNumber, setRechargeNumber] = useState('');
    const [rechargeAmount, setRechargeAmount] = useState(0);
    const [SelectedProduct, setSelectedProduct] = useState<TelkomBundleType>(initialTelkomBundleType);
    const [DataSeller, setDataSeller] = useState<SellerType[]>([])

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const store = useSelector((state: any) => state.core);
    let user = store.loginWithProvider as User2
    let org = store.currentCompany.code;
    useEffect(() => {
        loadSelectedNetwork().then(null)
        fetchConfigInfo().then(null)
    }, []);
    const loadSelectedNetwork = async () => {
        setSelectedNetwork(store.rechargeNetwork)
        setTypeOfRecharge(store.rechargeType)
        setRechargeNumber(store.rechargeNumber);
        setRechargeAmount(parseFloat(store.rechargeAmount));
        setSelectedProduct(store.rechargeProduct)
        let dashboard = store.dashboardInfo as FinanceDashboardType;
        setWalletBalance(dashboard.Data.Balance)
    }
    const fetchConfigInfo = async () => {
        type ResponseType = {
            dealers: DealerType[],
            subdealers: DealerType[],
            supervisors: DealerType[],
            allocations: Allocation[],
            roles: RoleType[],
            sellers: SellerType[]
        }
        let endpoint = `/configs/get/all/org/${org}`
        let req = await FetchDataFromDomainDrivenGet(SERVER_TELCO_CORE, endpoint)
        let data = req.results as ResponseType
        setDataSeller(data.sellers || [])

    }
    const handleCancel = () => {
        navigation.navigate("home/HomeWorkerScreen" as never);
    }
    const handleProceed = () => {
        // Handle the proceed button logic here
        Alert.alert(
            'Submit request',
            'Are you sure to submit this recharge?',
            [
                {text: "Cancel"},
                {text: "Submit", onPress: () => submitRecharger()}
            ]
        )
        //navigation.navigate("sales/SaleRequestSummaryScreen" as never)
    };
    const submitRecharger = async () => {
        //todo coming soon
        console.log("FF ", 1)
        setBusy(true)
        let sellerConfig = findUserSellerConfig(user.code, DataSeller)
        let payload = {
            org: org,
            user_code: user.code,
            seller_id: user.code,
            phone: rechargeNumber,
            product_type: TypeOfRecharge === "Buy Airtime" ? "airtime" : "data",
            service_code: SelectedProduct.ServiceCode === "" ? "SA1236" : SelectedProduct.ServiceCode,
            sale_amount: getAmount(),
            network: RequestRechargeMapsNetwork(SelectedNetwork),
            dealer_code: sellerConfig.dealer,
            supervisor_code: sellerConfig.supervisor,
            service_desc: SelectedProduct.ServiceDesc,
        }
        console.log("%:) submitRecharger Payload > ", payload)
        dispatch(ReduxSetRechargeRequest(payload))
        let endpoint = "/telkom-recharges"
        let res = await FetchDataFromDomainDrivenPostWithError(payload, SERVER_TELCO_PRODUCT, endpoint)
        if (res.status === "success") {
            let result = res.data
            if (typeof result.record !== "undefined") {
                let info = result.record as RechargeResultType
                dispatch(ReduxSetRechargeResult(info))
                console.log("submitRecharger result > ", info)
                if (info.ResponseMessage === "SUCCESS") {
                    navigation.navigate("sales/SaleResultSuccessScreen" as never)
                }
            }

        } else {
            //todo handle error here
            let message = `Response error\n\n${res.error.message}`
            console.log("SUBMIT ERROR RECEIVE> ", message)
            //alert(message)
            dispatch(ReduxSetRechargeResultFail(res.error.message))
            navigation.navigate("sales/SaleResultFailScreen" as never)

        }

        setBusy(false)

    }
    const getAmount = (): number => {
        if (TypeOfRecharge == "Buy Data") {
            return SelectedProduct.Amount
        }
        return rechargeAmount
    }
    const getProduct = (): string => {
        if (TypeOfRecharge == "Buy Data") {
            return SelectedProduct.ServiceDesc
        }
        return ""
    }
    const getCategory = (): string => {
        if (TypeOfRecharge == "Buy Data") {
            return SelectedProduct.Category
        }
        return ""
    }
    const allowToSel = (): boolean => {
        return getAmount() >= WalletBalance;
    }
    const RenderWaiting = () => {
        if (!busy) {
            return null
        }
        return (
            <View>
                <Text style={styles.busyMessage}>
                    Please wait while your recharge request is being processed...
                </Text>
            </View>
        )
    }
    const RenderAllowToSell = () => {
        if (allowToSel()) {
            return (
                <View>
                    <View style={styles.alertBox2}>
                        <View style={styles.icon}>
                            <Icon name={"alert"} type="material-community" size={45} color={Colors.brand.yellow}/>
                        </View>
                        <View style={{width: width - 40 - 50}}>
                            <Text style={styles.errorWallet}>
                                Insufficient wallet balance to complete the purchase. Please top up your wallet
                                before
                                proceeding with this transaction.
                            </Text>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity style={{
                            ...styles.proceedButton,
                            backgroundColor: Colors.brand.black
                        }} onPress={handleCancel}>
                            <Text style={styles.proceedButtonText}>Exit</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            )
        }
        return (
            <View>
                <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
                    <Text style={styles.proceedButtonText}>Submit Recharge</Text>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <View>
                <FilterSelections
                    data={[
                        {key: "Current Wallet", value: "R" + WalletBalance},
                    ]}
                    styleBox={{
                        minHeight: 40,
                        marginTop: 10,
                    }}
                />
            </View>
            <SaleUserInfo
                title={"Summary"}
                selectedNetwork={SelectedNetwork}
                typeOfRecharge={TypeOfRecharge}
                rechargeNumber={rechargeNumber}
                productPrice={getAmount()}
                productName={getProduct()}
                productCategory={getCategory()}
                netIcon={"network-provider"}
                productIcon={"wifi"}
            />
            {RenderWaiting()}

            {RenderAllowToSell()}

        </View>
    )
}
const styles = StyleSheet.create({
    busyMessage: {
        fontSize: 35,
        fontWeight: "bold",
        color: Colors.brand.yellow,
    },
    icon: {
        width: 50,
    },
    alertBox2: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: "center",
        width: width - 60,
        gap: 10,
        marginBottom: 20,
    },
    errorWallet: {
        color: Colors.brand.red,
        fontSize: 16,
        fontWeight: "normal",
        fontStyle: "italic",
        textAlign: "left"
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
        backgroundColor: Colors.brand.green,
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
