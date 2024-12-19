import {View, TextInput, Text, StyleSheet, TouchableHighlight, ViewStyle} from "react-native"
import Colors from "@/constants/Colors";


type Props={
    onPress:any,
    label:string,
    bgColor:string,
    width?:any,
    height:number,
    borderRadius:number,
    labelColor?:string,
    borderColor?:string,
    borderWidth?:number,
    style?:ViewStyle,
}
export default (props:Props)=>{
    const styles=StyleSheet.create({
        btn:{
            marginTop:20,
            width:props.width,
            height:props.height,
            backgroundColor:props.bgColor,
            borderRadius:props.borderRadius,
            borderStyle:"solid",
            borderColor: props.borderColor?props.borderColor:Colors.brand.lightBlue,
            justifyContent:"center",
            borderWidth: props.borderWidth?props.borderWidth:0,
            marginLeft:5,

        },
        btnText:{
            textAlign:"center",
            fontSize:18,
            fontWeight:"bold",
            color:props.labelColor?props.labelColor:"black"
        }
    })
    return(
        <TouchableHighlight
            style={[styles.btn,props.style]}
            onPress={()=>props.onPress()}
        >
            <Text style={styles.btnText}>{props.label}</Text>
        </TouchableHighlight>
    )

}
