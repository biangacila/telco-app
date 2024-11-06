import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
// @ts-ignore
import AntDesign from 'react-native-vector-icons/AntDesign';

import Colors from "../../constants/Colors";

const {width, height} = Dimensions.get("screen")

type InProps = {
    Data: { key?: string, label: string,value?:string}[],
    Label?: string,
    Placeholder: string,
    OnSelect: any,
    SelectedValue?: string,
    Color: string,
    BorderColor?: string,
    LabelSize?: number,
    Width?:number,

}


const ComboBox = (props: InProps) => {
    const [value, setValue] = useState<any>({ key: "", label: "",value:""});
    const [isFocus, setIsFocus] = useState(false);

    const onSelectValue=(item:any)=>{
        console.log(">>onSelectValue> ",item);
        setValue(item);
        setIsFocus(false);
        props.OnSelect(item.value);
    }
    let color = "black";
    if (typeof props.Color !== "undefined") {
        color = props.Color
    }
    let extraViewStyle: ViewStyle = {
    }
    if(props.Width){
        extraViewStyle.width = props.Width
    }
    return (
        <View style={[styles.container,extraViewStyle]}>
            <Text style={{color: color, fontSize: props.LabelSize ? props.LabelSize : 16}}>{props.Label}</Text>
            <Dropdown
                style={[styles.dropdown, {borderColor: props.BorderColor ? props.BorderColor : Colors.brand.lightGray},]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={props.Data}
                //borderWidth={props.WidthBox}
                search
                maxHeight={300}
                labelField="label"
                valueField="key"
                placeholder={!isFocus ? props.Placeholder : 'Please select...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item: any) => onSelectValue(item)}
            />

        </View>
    );
};

export default ComboBox;

const styles = StyleSheet.create({
    container: {
        padding: 0,
        paddingBottom: 5,
        marginBottom: 0,
        width:"100%"


    },
    dropdown: {
        height: 35,
        borderColor: 'lightgray',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        width: "100%"
    },
    icon: {
        marginRight: 5,
    },

    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 16,
        color: "#2f95dc"
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,

    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 35,
        fontSize: 16,
    },
});
