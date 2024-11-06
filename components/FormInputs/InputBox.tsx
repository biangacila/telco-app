import {StyleSheet, Text, TextInput, TextStyle, View, ViewStyle} from "react-native";
import Colors from "../../constants/Colors";

type Props={
    Label:string
    onChangeText:any,
    secureTextEntry?:boolean,
    keyboardType?:any,
    LabelColor?:string,
    includeLabel?:boolean,
    borderRadius?:number,
    height?:number,
    borderColor?:string,
    borderWidth?: number,
    LabelFontsize?:number,
    placeholder?:string,
    styleInputBox?:ViewStyle,
    styleInputLabel?:TextStyle,
    numberOfLines?:number,
    multiline?:boolean,
}
export default (props:Props)=>{
    const styles = StyleSheet.create({
        inputLabel:{
            color:props.LabelColor?props.LabelColor:Colors.brand.black,
            fontSize:props.LabelFontsize?props.LabelFontsize:16,
        },
        inputBox:{
            borderColor:props.borderColor?props.borderColor:Colors.brand.lightBlue,
            borderWidth:props.borderWidth?props.borderWidth:1,
            height:props.height?props.height:40,
            borderRadius:props.borderRadius?props.borderRadius:10,
            paddingLeft:10
        },
        container: {
            backgroundColor: "white",
        }
    })
    const hasLabel=():boolean=>{
        if(typeof props.includeLabel!=="undefined"){
            if(!props.includeLabel)
                return false
        }
        return true
    }
    if(props.multiline){
        console.log("::>>>>RenderInputTextarea> ", props)
    }
    return(
        <View style={styles.container}>
            {hasLabel()?<Text style={[styles.inputLabel,props.styleInputLabel]}>
                {props.Label}
            </Text>:null
            }
            <TextInput
                style={[styles.inputBox,props.styleInputBox]}
                onChangeText={(info:any)=>props.onChangeText(info)}
                secureTextEntry={props.secureTextEntry}
                keyboardType={props.keyboardType}
                autoCapitalize={"none"}
                placeholder={props.placeholder}
                numberOfLines={props.numberOfLines}
                multiline={props.multiline}
            />
        </View>
    )
}

