import {Dimensions, StyleSheet, Text, TextInput, View, TextStyle, ViewStyle} from "react-native";
import {Colors} from "@/constants/Colors";
import {shadow} from "@/constants/Styles";

type Props={
    label?:string
    onChangeText:any,
    secureTextEntry?:boolean,
    borderColor?: string,
    keyboardType?:any,
    LabelColor?:string,
    width?:any,
    multiline?:boolean,
    labelStyle?:TextStyle,
    boxStyle?:ViewStyle,
    containerStyle?:ViewStyle,
    placeholder?:string,
    textareaHeight?:number,
    value?:any,
    numberOfLines?:number
}

const {width, height} = Dimensions.get("screen")
export default (props:Props)=>{
    let textareaHeight = props.textareaHeight?props.textareaHeight:150
    const styles = StyleSheet.create({
        shadow,
        inputLabel:{
            color:props.LabelColor?props.LabelColor:Colors.brand.black,
            fontWeight: 'bold'
        },

        inputView: {
            height: props.multiline?textareaHeight: 40,
            borderColor: props.borderColor,
            marginTop: 10,
            borderRadius:5,
            justifyContent: 'center',
            paddingLeft: 10,
            marginBottom: 20,
            width:props.width?props.width:width-60
        },

        inputBox:{
            borderRadius: 5,
            flex: 1,
            height: 40,
            textAlignVertical:"top",
            paddingVertical:10,
        },
    })

    return(
        <View style={props.containerStyle}>
            {props.label?<Text style={[styles.inputLabel,props.labelStyle]}>
                {props.label}
            </Text>:null}

            <View style={[styles.inputView, styles.shadow]}>
                <TextInput
                    style={styles.inputBox}
                    onChangeText={(info:any)=>props.onChangeText(info)}
                    secureTextEntry={props.secureTextEntry}
                    keyboardType={props.keyboardType}
                    autoCapitalize={"none"}
                    multiline={!!props.multiline}
                    numberOfLines={props.numberOfLines?props.numberOfLines:5}
                    placeholder={props.placeholder?props.placeholder:""}
                />
            </View>
        </View>
    )
}
