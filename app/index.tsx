import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView ,Dimensions} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import FeatureIcon from "@/components/public/FeatureIcon";
import {RootStackParamList} from "@/types/type_general";
import {Colors} from "@/constants/Colors";
import {useNavigation} from "expo-router";

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'LandingPage'>;
};

let {width,height}=Dimensions.get("screen")

const LandingPage: React.FC<Props> = ({  }) => {
    let navigation =  useNavigation()
    const onPressLogin=()=>{
        console.log("onPressLogin");
        navigation.navigate("auth/loginScreen" as never)
    }
    const onPressOffer=()=>{
        console.log("onPressOffer");
    }
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Logo */}
            <View style={styles.logoContainer}>
                <Image source={require('@/assets/logo2.webp')} style={styles.logo} />
            </View>

            {/* Tagline */}
            <Text style={styles.tagline}>Get Connected Anytime, Anywhere!</Text>
            <Text style={styles.subTagline}>Distribute and manage SIM cards, airtime, and mobile services seamlessly.</Text>

            {/* Features */}
            <View style={styles.featuresContainer}>
                <FeatureIcon title="SIM Card" iconName="sim" />
                <FeatureIcon title="Airtime & Data" iconName="credit-card"  color={Colors.brand.lightRed}/>
                <FeatureIcon title="Sell Track" iconName="chart-bar" color={Colors.brand.lightBlue}/>
                <FeatureIcon title="Dealer" iconName="store"  color={Colors.brand.green}/>
            </View>

            {/* CTA Buttons */}
            <TouchableOpacity style={[styles.button,,{backgroundColor: Colors.brand.lightRed}]} onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.altButton,{backgroundColor: Colors.brand.blue}]} onPress={() => onPressLogin()}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            {/* Download Buttons */}
            <View style={styles.downloadContainer}>
                <Image source={require('@/assets/images/google-play.png')} style={styles.downloadIcon} />
                <Image source={require('@/assets/images/app-store.png')} style={styles.downloadIcon} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F0F0F0',
    },
    logoContainer: {
        marginTop: 0,
        marginBottom: 20,
        width,
    },
    logo: {
        width: width,
        height: 200,
        resizeMode: 'contain',
        backgroundColor:"gray",
    },
    tagline: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    subTagline: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    featuresContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#FF9900',
        padding: 15,
        borderRadius: 25,
        width: '80%',
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    altButton: {
        backgroundColor: '#007BFF',
    },
    downloadContainer: {
        flexDirection: 'row',
        marginTop: 30,
    },
    downloadIcon: {
        width: 100,
        height: 40,
        marginHorizontal: 10,
    },
});

export default LandingPage;
