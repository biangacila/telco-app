import {View, Text, Image, TouchableOpacity, Platform, Animated} from 'react-native';
import {Link, useNavigation} from 'expo-router';
import { StyleSheet } from 'react-native';
import {Colors} from "@/constants/Colors";
import LoginButon from "@/components/public/LoginButon";
import OfferingPanel from "@/components/public/OfferingPanel";
import OfferButtonWrapper from "@/components/public/OfferButtonWrapper";
import React from "react";
import ScrollView = Animated.ScrollView;

export default function HomeScreen() {
    let navigation =  useNavigation()
    const onPressLogin=()=>{
        console.log("onPressLogin");
        navigation.navigate("auth/loginScreen" as never)
    }
    const onPressOffer=()=>{
        console.log("onPressOffer");
    }
    return (
        <ScrollView style={styles.container}>
            {/* Header Section with Logo */}
            <View style={styles.header}>
                <Image
                    source={require('@/assets/images/bg/log1.jpeg')} // Replace with your logo URL
                    style={styles.logo}
                />
                <TouchableOpacity style={styles.menuIcon}>
                    {/* You can replace this with an actual icon */}
                    <LoginButon onPress={onPressLogin} />
                    {/*<View style={styles.menuBar} />
                    <View style={styles.menuBar} />
                    <View style={styles.menuBar} />*/}
                </TouchableOpacity>
            </View>

            {/* Image and Carousel Dots */}
            <Image
                source={require('@/assets/images/bg/bg3.png')} // Replace with the background image URL
                style={styles.heroImage}
            />
            {/*<View style={styles.dotsContainer}>
                <View style={styles.dot} />
                <View style={styles.dot} />
                <View style={[styles.dot, styles.activeDot]} />
            </View>*/}

            {/* Benefits Section */}
            <View style={styles.benefitsSection}>
                <Text style={styles.sectionTitle}>TELCO SIM VALUE </Text>
                <Text style={styles.title}>Sim sales and recharges management system</Text>
                <Text style={styles.description}>
                    The solution delivers value for dealer and Telco, tracks the SIM through the value chain and provides performance / activations data on prepaid sales agents...
                </Text>
                <OfferingPanel>
                    <Text style={styles.offerLabel}>Our Offers:</Text>
                    <OfferButtonWrapper onPress={onPressOffer}/>
                </OfferingPanel>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    offerLabel:{
        color:Colors.brand.gray,
        fontWeight:"bold",
        fontSize: 18,
    },
    container: {
        flex: 1,
        backgroundColor: '#000',
        marginTop: Platform.OS==="android"?35:0,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor:Colors.light.background,
    },
    logo: {
        width: 150,
        height: 40,
        resizeMode: 'contain',
    },
    menuIcon: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 24,
    },
    menuBar: {
        width: 25,
        height: 3,
        backgroundColor: '#4CAF50', // Green color for the menu bars
        marginVertical: 3,
    },
    heroImage: {
        width: '100%',
        height: 200,
        resizeMode: 'stretch',
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#FFF',
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: '#FF4500', // Active dot (orange)
    },
    benefitsSection: {
        padding: 20,
        backgroundColor: '#000',
    },
    sectionTitle: {
        color: '#4CAF50',
        fontWeight: 'bold',
        fontSize: 14,
    },
    title: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    description: {
        color: '#FFF',
        fontSize: 16,
        lineHeight: 24,
    },
});
