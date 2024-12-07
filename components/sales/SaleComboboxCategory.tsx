import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
type Props={
    data:string[],
    onSelected:any,
}
const DropdownWithPicker = (props:Props) => {
    const [selectedValue, setSelectedValue] = useState("");

    const onSelect=(value:any)=>{
        setSelectedValue(value)
        props.onSelected(value)
    }
    return (
        <View style={styles.container}>
            {/* Ensure all text is inside a Text component */}
            <Text>Selected Category: {selectedValue}</Text>
            <View style={styles.pickerContainer}>
                {/* Picker */}
                <Picker
                    selectedValue={selectedValue}
                    style={styles.picker}
                    onValueChange={(itemValue) => onSelect(itemValue)}
                >
                    <Picker.Item label="Select option" value="" />
                    {props.data.map(item=>{
                        return(
                            <Picker.Item label={item} value={item} />
                        )
                    })}
                    {/*<Picker.Item label="LTE" value="lte" />
                    <Picker.Item label="Free Me" value="free_me" />
                    <Picker.Item label="AllNet" value="allnet" />*/}
                </Picker>

                {/* Simple Unicode Arrow Icon */}
                <Text style={styles.icon}>⬇️</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        paddingHorizontal: 10,
        marginVertical:10
    },
    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 25,
        backgroundColor: '#fff',
        paddingLeft: 10, // Padding to prevent text overlapping with the border
        position: 'relative',
    },
    picker: {
        flex: 1, // Ensure the picker takes up full width
        height: 50,
    },
    icon: {
        position: 'absolute',
        right: 15, // Align the icon to the right
        top: 12,   // Vertically center the icon
        fontSize: 24,
    },
});

export default DropdownWithPicker;
