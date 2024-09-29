import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import {Colors} from "@/constants/Colors";

type Props = {
    title: string;
    iconName: string;
    color?: string;
};

const FeatureIcon: React.FC<Props> = ({ title, iconName,color }) => {
    return (
        <View style={styles.feature}>
            <Icon name={iconName} type="material-community" color={color?color:Colors.brand.blue} size={40} />
            <Text style={styles.featureText}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    feature: {
        alignItems: 'center',
        marginHorizontal: 10,
    },
    featureText: {
        marginTop: 10,
        textAlign: 'center',
    },
});

export default FeatureIcon;
