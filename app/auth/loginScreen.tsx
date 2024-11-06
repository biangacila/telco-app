import React from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions} from 'react-native';
import {Colors} from "@/constants/Colors";
import {useNavigation} from "expo-router";
import RoundedIcon from "@/components/public/RoundedIcon";
import {links} from "@/constants/links";
import {LineWithTextMiddle} from "@/components/public/LineWithTextMiddle";
import LoginWithProvider from "@/components/auth/LoginWithProvider";


const {width, height} = Dimensions.get("screen")
export default function LoginScreen() {
    const navigation = useNavigation();

    const onLogin = () => {
        navigation.navigate("home/HomeWorkerScreen" as never)
    }
    return (
        <View style={styles.container}>
            {/* Logo Section */}
            <View style={styles.logoContainer}>
                <Image
                    source={require('@/assets/images/bg/login2.jpg')} // Replace with your logo URL
                    style={styles.logo}
                />
            </View>

            {/* Login Form */}
            <View style={styles.formContainer}>
                {/*<Text style={styles.title}>Login</Text>*/}

                <TextInput
                    placeholder="Email"
                    placeholderTextColor="#A9A9A9"
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#A9A9A9"
                    secureTextEntry
                    style={styles.input}
                />

                <TouchableOpacity style={styles.loginButton} onPress={onLogin}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>

                <View style={styles.groupForgetPassword}>
                    {/* Forgot Password */}
                    <TouchableOpacity>
                        <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text style={styles.forgotPasswordText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* OR text */}
            <View style={styles.withSocialMediaContainer}>
                <LineWithTextMiddle
                    title={"Or"}
                    styleTitle={{
                        fontSize: 18,
                        color: Colors.brand.lightGray,
                        textAlign: 'center',
                    }}
                    styleLine={{backgroundColor: Colors.brand.lightGray}}
                    styleBox={{width: width}}
                />

                {/* Login with social media */}
                <LoginWithProvider/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    socialsView: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 20
    },
    groupForgetPassword: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        marginTop: 20
    },
    formContainer: {
        backgroundColor: Colors.brand.white,
        marginVertical: 10,
        marginHorizontal: -20,
        padding: 20,
        width: -20,
        borderRadius: 10,
    },
    withSocialMediaContainer: {
        backgroundColor: Colors.brand.white,
        marginVertical: 10,
        marginHorizontal: -20,
        padding: 20,
        width: -20,
        borderRadius: 0,
        marginTop:-10,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.brand.background, // Dark background
        justifyContent: 'center',
        padding: 20,
        paddingTop: 80
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 40,
        backgroundColor: Colors.brand.blue,
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    logo: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        borderRadius: 40,
        backgroundColor: Colors.brand.orange,
    },
    title: {
        fontSize: 32,
        color: Colors.brand.gray,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: Colors.brand.white,
        borderRadius: 5,
        height: 50,
        marginBottom: 20,
        paddingHorizontal: 15,
        fontSize: 16,
        color: Colors.brand.gray,
        borderColor: Colors.brand.background,
        borderStyle: "solid",
        borderWidth: 1,
    },
    loginButton: {
        backgroundColor: Colors.brand.white, // Green button color
        borderRadius: 25,
        paddingVertical: 15,
        alignItems: 'center',
        marginBottom: 15,
        borderColor: Colors.brand.lightRed,
        borderStyle: "solid",
        borderWidth: 1,
    },
    loginButtonText: {
        color: Colors.brand.lightRed,
        fontSize: 18,
        fontWeight: 'bold',
    },
    forgotPasswordText: {
        color: Colors.brand.blue,
        fontSize: 16,
        textAlign: 'center',
    },
});
