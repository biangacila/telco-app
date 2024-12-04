

import React from 'react';
import {View, Text, StyleSheet, TextStyle} from 'react-native';
type Props={
    title:string,
    styleLabel?:TextStyle,
    children:React.ReactNode,
}

const PanelWithLabel = (props:Props) => {
    return (
        <View style={styles.panel}>
            <Text style={{...styles.label,...props.styleLabel}}>{props.title}</Text>
            <View style={styles.content}>
                {props.children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    panel: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 16,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3, // For Android shadow
        margin: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    content: {
        padding: 8,
        backgroundColor: '#f9f9f9',
        borderRadius: 4,
    },
});

export default PanelWithLabel;
