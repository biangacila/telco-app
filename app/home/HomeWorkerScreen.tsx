import React, {useCallback, useEffect, useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import {Colors} from "@/constants/Colors";
import NavButtonArrow from "@/components/home/NavButtonArrow";
import NavBottomWithIcon from "@/components/home/NavBottomWithIcon";
import {useFocusEffect, useNavigation} from "expo-router";
import {useDispatch, useSelector} from "react-redux";
import {UserInfoType} from "@/types/type_general";
import {FinanceDashboardType} from "@/types/type-finance-dashboard";
import {CompanyType} from "@/types/type-model";
import {formatNumberToTwoDecimalPlaces, getFirstPart} from "@/services/functions";
import {Icon} from "react-native-elements";
import {ReduxSetRechargeType} from "@/redux/actions";
const defaultImageUrl = "https://plus.unsplash.com/premium_photo-1700932723489-dcbfd3e5db1f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHNvdXRoJTIwYWZyaWNhbiUyMHlvdW5nJTIwbGFkeXxlbnwwfHwwfHx8MA%3D%3D"
let colors = Colors.brand;

const ProfileScreen = () => {
    const state = useSelector((state: any) => state.core)
    const [WalletBalance, setWalletBalance] = React.useState<number>(20.355);
    const [FullName, setFullName] = React.useState<string>('Guest User');
    const [Role, setRole] = React.useState<string>('Manager');
    const [Dealership,setDealership]=React.useState<string>('Mavutani');
    const [JoinedDealership,setJoinedDealership]=React.useState<string>('2024');
    const [TotalSales,setTotalSales]=React.useState<number>(250);
    const [TotalCommissions,setTotalCommissions]=React.useState<number>(12.50);
    const [TotalSims,setTotalSims]=React.useState<number>(0);
    const [SelectedBottomMenu,setSelectedBottomMenu]=React.useState("Home");
    const [ProfileImage,setProfileImage]=useState(defaultImageUrl)
    const [UserCode,setUserCode]=React.useState<string>("UC00000");
    const navigation = useNavigation();
    let loginType = useSelector((state: any) => state.core.loginType);
    let dashboardInfo = useSelector((state: any) => state.core.dashboardInfo);

    const dispatch=useDispatch()
    useFocusEffect(
        useCallback(() => {
            console.log('Screen is focused');
            // Perform any actions here
            initialFetchData().then(null);

            return () => {
                console.log('Screen is unfocused');
                // Perform cleanup actions here
            };
        }, [])
    );

    useEffect(() => {
        initialFetchData().then(null)
    }, [loginType,dashboardInfo]);

    const initialFetchData=async ()=>{
        let user = state.loginWithProvider as UserInfoType
        let dashboard = state.dashboardInfo as FinanceDashboardType;
        let company = state.currentCompany as CompanyType
        setFullName(user.name)
        setProfileImage(user.picture)
        setUserCode(user.code)
        setWalletBalance(dashboard.Data.Balance)
        setTotalSales(dashboard.Data.Sale)
        setTotalCommissions(dashboard.Data.Commission)
        setTotalSims(dashboard.Data.Sims)
        setDealership(getFirstPart(company.name))
    }

    const onProcessBottomNav=(link:string)=>{
        setSelectedBottomMenu(link);
        if(link==="Settings"){
            navigation.navigate("settings/SettingMenuScreen" as never)
        }
    }
    const onSelectAction=(category:string)=>{
        if(category==="Buy Data"){
            dispatch(ReduxSetRechargeType(category))
            navigation.navigate("sales/SaleRechargeNumberScreen" as never)
            return
        }
        if(category==="Buy Airtime"){
            dispatch(ReduxSetRechargeType(category))
            navigation.navigate("sales/SaleRechargeNumberScreen" as never)
            return
        }
        if(category==="Receipt"){
            navigation.navigate("sales/SaleReceiptScreen" as never)
            return
        }
        if(category==="Deposit"){
            navigation.navigate("wallets/WalletDepositHistoryScreen" as never)
            return
        }



        alert("coming soon!")

    }
    const onPressSale=()=>{
        navigation.navigate("sales/SaleNetworkScreen" as never)
    }
    const onPressSim=()=>{
        console.log("onPressSim")
    }
    return (
        <View style={styles.container}>
            {/* Scrollable Content */}
            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Profile Card */}
                <View style={styles.profileCard}>
                    <Image
                        source={{ uri: ProfileImage/*'https://via.placeholder.com/150'*/ }} // Replace with the actual profile image URL
                        style={styles.profileImage}
                    />
                    <Text style={styles.nameText}>{FullName}</Text>
                    <Text style={styles.infoText}>{Role} • {Dealership} • {UserCode}</Text>

                    {/* Points */}
                    <View style={styles.pointsContainer}>
                        <Text style={styles.pointsText}>⭐ R{formatNumberToTwoDecimalPlaces(WalletBalance)}</Text>
                        <TouchableOpacity>
                            <Text style={styles.exchangeText}>Wallet ➔</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Time Off / Attendance / Overtime */}
                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>R{TotalSales}</Text>
                        <Text style={styles.statLabel}>Sales</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>R{TotalCommissions}</Text>
                        <Text style={styles.statLabel}>Commission</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{TotalSims}</Text>
                        <Text style={styles.statLabel}>Sims sold</Text>
                    </View>
                </View>

                {/* Buttons */}
                <NavButtonArrow
                    title={"Sell" }
                    icon={"shopping-cart"}
                    iconColor={'white'}
                    iconContainerColor={"#F8D7DA"}
                    onPress={onPressSale}
                />
                {/* Grid for Options */}
                <View style={styles.containerAction}>


                <View style={styles.gridContainer}>
                    {[
                        /*{ name: 'Buy Data', icon: 'wifi' ,color:colors.lightRed },
                        { name: 'Buy Airtime', icon: 'phone' ,color:colors.lightBlue},*/
                        { name: 'Receipt', icon: 'lightbulb-outline',color:colors.yellow },
                        { name: 'Deposit', icon: 'bank' ,color:colors.lightBlue},
                        { name: 'Transfer', icon: 'swap-horizontal',color:colors.green },
                        { name: 'History', icon: 'history',color:colors.red },
                        { name: 'Profile', icon: 'account-circle',color:colors.yellow },
                        { name: 'Support Ticket', icon: 'help-outline' ,color:colors.dark},
                        { name: 'FAQ', icon: 'information-outline',color:colors.green },
                        { name: 'Monitor', icon: 'wifi' ,color:colors.lightRed },
                        { name: 'Sim Card', icon: 'phone' ,color:colors.lightBlue},
                    ].map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.gridItem}
                            onPress={()=>onSelectAction(item.name)}
                        >
                            <Icon name={item.icon} type="material-community" size={30} color={item.color}/>
                            <Text style={styles.gridText}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                </View>

                <NavButtonArrow
                    title={"Scan Sim" }
                    icon={"mobile-phone"}
                    iconColor={'white'}
                    iconContainerColor={Colors.brand.lightBlue}
                    iconContainerStyle={{paddingLeft:10}}
                    onPress={onPressSim}
                />
                <NavButtonArrow
                    title={"Deposit" }
                    icon={"dollar"}
                    iconColor={'white'}
                    iconContainerColor={Colors.brand.lightBlue}
                    onPress={onPressSale}
                />
                <NavButtonArrow
                    title={"Commission" }
                    icon={"user"}
                    iconColor={'white'}
                    iconContainerColor={Colors.brand.orange}
                    onPress={onPressSale}
                />
                <NavButtonArrow
                    title={"Monitoring" }
                    icon={"manager"}
                    iconColor={'white'}
                    iconContainerColor={Colors.brand.red}
                    onPress={onPressSale}
                />

            </ScrollView>

            {/* Fixed Bottom Navigation */}
            <NavBottomWithIcon
                onPress={onProcessBottomNav}
                activeColor={Colors.brand.lightBlue}
                activeIcon={SelectedBottomMenu}
            />
            {/*<View style={styles.bottomNav}>
                <Text>Home</Text>
                <Text>Notification</Text>
                <Text>Transaction</Text>
                <Text style={{ color: 'blue' }}>Settings</Text>
            </View>*/}
        </View>
    );
};

const styles = StyleSheet.create({
    containerAction:{
        flex: 1,
        padding: 20,
        backgroundColor: Colors.brand.background,
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
    container: {
        flex: 1,
        backgroundColor: Colors.brand.white,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 100, // To prevent content from being hidden behind the bottom nav
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    logoutButton: {
        backgroundColor: 'transparent',
    },
    logoutText: {
        color: 'red',
        fontWeight: '600',
    },
    profileCard: {
        backgroundColor: Colors.brand.blue,
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        marginVertical: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop:-60,
        borderWidth: 4,
        borderColor: 'white',

    },
    nameText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10,
        color:Colors.brand.white,
    },
    infoText: {
        /*color: '#888',*/
        marginTop: 5,
        textAlign: 'center',
        color:Colors.brand.background,
    },
    pointsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        backgroundColor: Colors.brand.gray,//'#EBF0F7',
        padding: 15,
        borderRadius: 10,
        width: '100%',
    },
    pointsText: {
        fontWeight: 'bold',
        fontSize: 18,
        color:Colors.brand.white
    },
    exchangeText: {
        color: 'gray',

    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
        backgroundColor:'#EBF0F7',
        borderRadius: 5,
        minHeight:75,
        justifyContent: 'center',
        marginHorizontal:5
    },
    statValue: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    statLabel: {
        color: '#888',
        fontWeight: 'bold',
    },
    optionButton: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    optionButtonText: {
        fontSize: 16,
        fontWeight: '500',
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 15,
        borderTopWidth: 1,
        borderColor: '#ddd',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
    },
});

export default ProfileScreen;
