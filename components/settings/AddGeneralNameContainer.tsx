import React, {FC} from "react";
import {Dimensions, StyleSheet, Text, View} from "react-native";
import InputTextBox from "@/components/common/InputTextBox";
import {Colors} from "@/constants/Colors";
import GenericButton from "@/components/FormInputs/GenericButton";

type Props={
    title: string,
    placeholder:string,
    onChange:any,
    onSubmit:any,
    btnText:string,
    onCancel:any,
}
let {width, height} = Dimensions.get('window');
const AddGeneralNameContainer = (props:Props) => {
    const[InputValue, setInputValue] = React.useState("");

    const onChange=(value:any)=> {
        setInputValue(value);
        props.onChange(value)
    }
    return(
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            <View style={styles.inputBox}>
                <InputTextBox
                    label={""}
                    width={width - 40 }
                    placeholder={props.placeholder}
                    onChangeText={onChange}
                    boxStyle={{marginTop: 15, backgroundColor: Colors.brand2.bluePrimary}}
                />
                <GenericButton
                    onPress={props.onSubmit}
                    bgColor={Colors.brand.blue}
                    borderColor={Colors.brand.white}
                    width={width-50}
                    label={props.btnText}
                    height={40}
                    borderRadius={5}
                    style={{
                        marginTop: -5,
                    }}
                    labelColor={Colors.brand.white}
                />
                <GenericButton
                    onPress={()=>props.onCancel()}
                    bgColor={Colors.brand.white}
                    borderColor={Colors.brand.red}
                    width={width-50}
                    label={"Cancel"}
                    height={40}
                    borderRadius={5}
                    style={{
                        marginTop: 10,
                        marginBottom:10
                    }}
                    labelColor={Colors.brand.red}
                    borderWidth={1}
                />
            </View>

        </View>
    )
}
export default AddGeneralNameContainer


// Styles
const styles = StyleSheet.create({
    inputBox: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        borderBottomWidth: 0,
        borderBottomColor: Colors.brand.lightBlue,
        borderStyle: "solid",
        gap:5,
    },
    btnBox: {
        backgroundColor: Colors.brand.blue,
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        height: 40,
        maxHeight: 40,
        width: width - 40,
        borderRadius: 5,
    },
    btnText: {
        color: Colors.brand.white,
        fontSize: 16,
        fontWeight: "bold",
    },

    container: {
        flex: 1,
        padding: 20,
        flexDirection: "column",
        backgroundColor: Colors.brand.white,
        minHeight: height/2,
        width,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },

});
