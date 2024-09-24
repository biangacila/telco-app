import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {FontAwesome, MaterialIcons} from "@expo/vector-icons";
import React from "react";

type Props={
    onShare?: any,
    onAdd?: any,
}
export const SaleShareGroupButton = (props: Props) => (
    <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={props.onShare}>
            <MaterialIcons name="share" size={20} color="black" />
            <Text style={styles.actionText}>Share Receipt</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={props.onAdd}>
            <FontAwesome name="plus" size={20} color="black" />
            <Text style={styles.actionText}>Add to favorite</Text>
        </TouchableOpacity>
    </View>
)

const styles = StyleSheet.create({
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 10,
        width: '45%',
        justifyContent: 'center',
    },
    actionText: {
        marginLeft: 5,
        fontSize: 14,
    },
})