import Card1, {Card1Props} from "@/components/settings/Card1";
import {ScrollView, Text, StyleSheet, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {Colors} from "@/constants/Colors";
import {useNavigation} from "expo-router";
import {User2} from "@/types/type-model";
import {useSelector} from "react-redux";
import {IsInSuperUserList} from "@/services/functions";


export default () => {
    const navigation = useNavigation();
    const store = useSelector((state: any) => state.core);
    let user = store.loginWithProvider as User2
    const colors = Colors.brand;
    let menus: Card1Props[] = [
        {
            iconType:"Ionicons",
            icon: "storefront",
            title: "Organisation",
            value: 1,
            textTopRight: "",
            textBottomLeft: 'Total',
            textBottomRight: 2,
            color:colors.blue,
            link:"settings/SettingManageCompanyScreen",
        },
        {
            iconType:"FontAwesome5Brands",
            icon: "ideal",
            title: "Dealers",
            value: 3,
            textTopRight: "",
            textBottomLeft: 'Total',
            textBottomRight: 1,
            color:colors.red,
            link:"settings/SettingManageDealerScreen",
        },
        {
            iconType:"MaterialIcons",
            icon: "supervised-user-circle",
            title: "Sub dealers",
            value: 3,
            textTopRight: "",
            textBottomLeft: 'Total',
            textBottomRight: 1,
            color:colors.yellow,
            link:"settings/SettingManageSubdealerScreen",
        },
        {
            iconType:"MaterialCommunityIcons",
            icon: "account-supervisor-outline",
            title: "Supervisor",
            value: 3,
            textTopRight: "",
            textBottomLeft: 'Total',
            textBottomRight: 5,
            color:colors.dark,
            link:"settings/SettingManageSupervisorScreen"
        },
       /* {
            iconType:"MaterialCommunityIcons",
            icon: "face-agent",
            title: "Agents",
            value: 6,
            textTopRight: "",
            textBottomLeft: 'Total',
            textBottomRight: 6,
            color:colors.lightBlue,
        },
        {
            iconType:"Feather",
            icon: "user",
            title: "Users",
            value: 8,
            textTopRight: "",
            textBottomLeft: 'Total',
            textBottomRight: 8,
            color:colors.green,
            link:"settings/SettingSellerScreen",
        },*/
        {
            iconType:"MaterialIcons",
            icon: "sell",
            title: "Seller Enable",
            value: 8,
            textTopRight: "",
            textBottomLeft: 'Total',
            textBottomRight: 5,
            color:colors.orange,
            link:"settings/SettingManageSellerEnableScreen",
        },
        {
            iconType:"MaterialCommunityIcons",
            icon: "bank",
            title: "Deposit Refs",
            value: 8,
            textTopRight: "",
            textBottomLeft: 'Total',
            textBottomRight: 5,
            color:colors.yellow,
        },
        {
            iconType:"MaterialCommunityIcons",
            icon: "bank",
            title: "Float",
            value: 8,
            textTopRight: "agent: 6",
            textBottomLeft: 'Total Money',
            textBottomRight: "R 5633",
            color:colors.yellow,
        },
        {
            iconType:"MaterialCommunityIcons",
            icon: "bank",
            title: "Administrator",
            value: 8,
            textTopRight: "",
            textBottomLeft: 'Total',
            textBottomRight: 5,
            color:colors.yellow,
        },
        {
            iconType:"MaterialCommunityIcons",
            icon: "bank",
            title: "Claim FLoat",
            value: 8,
            textTopRight: "",
            textBottomLeft: 'Total',
            textBottomRight: 5,
            color:colors.yellow,
        },
        {
            iconType:"MaterialCommunityIcons",
            icon: "bank",
            title: "Claim Wallet",
            value: 8,
            textTopRight: "",
            textBottomLeft: 'Total',
            textBottomRight: 5,
            color:colors.yellow,
        },
    ]
    const onPress=(item: Card1Props)=>{
        if(typeof item.link != "undefined"){
            navigation.navigate(item.link as never)
        }else{
            alert("Coming soon!")
        }
    }

    if(!IsInSuperUserList(user.email)){
        return(
            <ScrollView style={styles.container}>
                <StatusBar backgroundColor={"white"}/>
                <View style={styles.cardsContainer}>
                    <Text style={styles.errSuperTitle}>
                        Access denied
                    </Text>
                    <Text style={styles.errSuperMessage}>
                        Sorry you are not a super user to perform this talk,
                        Please contact your system admin to set you up.
                    </Text>
                    <Text style={styles.errSuperMessage}>
                        You can send email to  info@biacibenga.com | or call: +27 72 913 9504
                    </Text>
                </View>
            </ScrollView>
        )
    }
    return (
        <ScrollView style={styles.container}>
            <StatusBar backgroundColor={"white"}/>
            {/* Check In/Out Cards */}
            <View style={styles.cardsContainer}>
                {menus.map(item=>{
                    return(
                        <Card1
                            {...item}
                            onPress={()=>onPress(item)}
                        />
                    )
                })}
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    errSuperTitle:{
        fontSize:18,
        fontWeight:"bold",
        color:Colors.brand.red,
        marginVertical:20
    },
    errSuperMessage:{
        fontSize:16,
        fontWeight:"normal",
        color:Colors.brand.gray,
    },
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom:200
    },
})
