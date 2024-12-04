import React, { useState } from 'react';
import {View, Text, StyleSheet, ViewStyle} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export type dataSourceType={
    display:any,value:any
}
type Props={
    onChange: (value: string) => void,
    dataSource: dataSourceType[],
    title?:string,
    stylePickupContainer?:ViewStyle,
    placeholder?:string,
}
export default  (props:Props) => {
    const [selectedValue, setSelectedValue] = useState("");

    const onSelect=(value:any)=>{
        setSelectedValue(value)
        props.onChange(selectedValue);
        console.log("(::: onSelect > ",value)
    }
    return (
        <View style={{...styles.container}}>
            {/* Ensure all text is inside a Text component */}
            <Text>{props.title?props.title:"Selected: "+selectedValue}</Text>
            <View style={{...styles.pickerContainer,...props.stylePickupContainer}}>
                {/* Picker */}
                <Picker
                    selectedValue={selectedValue||""}
                    style={styles.picker}
                    onValueChange={(itemValue) => onSelect(itemValue)}
                >
                    <Picker.Item label={props.placeholder||""} value="" />
                    {props.dataSource.map(item=>{
                        return(
                            <Picker.Item label={item.display} value={item.value}  style={styles.itemPicker}/>
                        )
                    })}
                </Picker>

                {/* Simple Unicode Arrow Icon */}
                <Text style={styles.icon}>⬇️</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    itemPicker:{
        fontSize:12
    },
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
        paddingLeft: 5, // Padding to prevent text overlapping with the border
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

