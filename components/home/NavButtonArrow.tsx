import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type Props={
    title: string,
    icon: string,
    iconColor:string,
    iconContainerColor:string,
    iconContainerStyle?:ViewStyle
    onPress:any,
}
const ReimbursementButton = (props:Props) => {
    return (
        <TouchableOpacity style={styles.button} onPress={props.onPress}>
            {/* Left Icon */}
            <View style={[{...styles.iconContainer, backgroundColor:props.iconContainerColor},props.iconContainerStyle]}>
                <Icon name={props.icon} size={30} color={props.iconColor} style={styles.icon} />
            </View>

            {/* Text */}
            <Text style={styles.buttonText}>{props.title}</Text>

            {/* Right Arrow */}
            <View style={styles.arrowContainer}>
                <Text style={styles.arrow}>➔</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        elevation: 1, // For shadow on Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    iconContainer: {
        backgroundColor: '#F8D7DA', // Background color for the icon circle
        borderRadius: 40,
        /*padding: 10,*/
        justifyContent:"center",
        alignItems: "center",
        height: 40,
        width: 40,

    },
    icon: {
        width: 24,
        height: 24,
        tintColor: '#C04F56', // Tint color for the icon
        justifyContent:"center",
        alignItems: "center",
        flexDirection: 'row',
    },
    buttonText: {
        flex: 1,
        marginLeft: 15,
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    arrowContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrow: {
        fontSize: 18,
        color: '#C4C4C4', // Color for the arrow
    },
});

export default ReimbursementButton;
