import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import {Colors} from "@/constants/Colors";
import NavButtonArrow from "@/components/home/NavButtonArrow";
import NavBottomWithIcon from "@/components/home/NavBottomWithIcon";
import {useNavigation} from "expo-router";

const ProfileScreen = () => {
    const [WalletBalance, setWalletBalance] = React.useState<number>(20.355);
    const [FullName, setFullName] = React.useState<string>('Merveilleux Biangacila');
    const [Role, setRole] = React.useState<string>('Manager');
    const [Dealership,setDealership]=React.useState<string>('Mavutani');
    const [JoinedDealership,setJoinedDealership]=React.useState<string>('2024');
    const [TotalSales,setTotalSales]=React.useState<number>(250);
    const [TotalCommissions,setTotalCommissions]=React.useState<number>(12.50);
    const [TotalSims,setTotalSims]=React.useState<number>(12);
    const [SelectedBottomMenu,setSelectedBottomMenu]=React.useState("Home");

    const navigation = useNavigation();

    const defaultImageUrl = "https://plus.unsplash.com/premium_photo-1700932723489-dcbfd3e5db1f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHNvdXRoJTIwYWZyaWNhbiUyMHlvdW5nJTIwbGFkeXxlbnwwfHwwfHx8MA%3D%3D"
    const onProcessBottomNav=(link:string)=>{
        setSelectedBottomMenu(link);
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
                        source={{ uri: defaultImageUrl/*'https://via.placeholder.com/150'*/ }} // Replace with the actual profile image URL
                        style={styles.profileImage}
                    />
                    <Text style={styles.nameText}>{FullName}</Text>
                    <Text style={styles.infoText}>{Role} • {Dealership} • Joined {JoinedDealership}</Text>

                    {/* Points */}
                    <View style={styles.pointsContainer}>
                        <Text style={styles.pointsText}>⭐ R{WalletBalance}</Text>
                        <TouchableOpacity>
                            <Text style={styles.exchangeText}>Exchange ➔</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Time Off / Attendance / Overtime */}
                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{TotalSales}</Text>
                        <Text style={styles.statLabel}>Sales</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{TotalCommissions}</Text>
                        <Text style={styles.statLabel}>Commission</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{TotalSims}</Text>
                        <Text style={styles.statLabel}>Sims sold</Text>
                    </View>
                </View>

                {/* Buttons */}
                <NavButtonArrow
                    title={"Sales" }
                    icon={"shopping-cart"}
                    iconColor={'white'}
                    iconContainerColor={"#F8D7DA"}
                    onPress={onPressSale}
                />
                <NavButtonArrow
                    title={"Sims" }
                    icon={"mobile-phone"}
                    iconColor={'white'}
                    iconContainerColor={Colors.brand.lightBlue}
                    iconContainerStyle={{paddingLeft:10}}
                    onPress={onPressSim}
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
