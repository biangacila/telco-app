import React from 'react';
import {TextInput, View, StyleSheet, Dimensions} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Colors from "@/constants/Colors";

interface Props {
    value: any
    onChangeText: any
}
const {width} = Dimensions.get("screen")
const SearchField = (props: Props) => {

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search site"
                value={props.value}
                onChangeText={props.onChangeText}
            />
            <Ionicons name="search" size={24} color="black" style={styles.icon}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        paddingHorizontal: 10,
        margin: 10,
        borderStyle:"solid",
        borderColor:Colors.brand.lightGray,
        borderWidth:1,
        width:width-40,
        marginTop:20,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 10,
        fontSize: 16,
        color: '#333',
    },
});

export default SearchField;
