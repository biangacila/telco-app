import {Text, TouchableHighlight, StyleSheet, ViewStyle} from "react-native";
import Colors from "@/constants/Colors";

type GenericProps={
    Title:string,
    titleColor?:string,
    BackgroundColor?:string,
    onPress?:any,
    width?:number,
    includeBorder?:boolean,
    borderColor?:string,
    styleBox?:ViewStyle
}
export default (props:GenericProps)=>{
    let extraBorder:ViewStyle={

    }
    if(props.includeBorder){
        extraBorder={
            borderWidth:1,
            borderColor:props.borderColor,
            borderStyle:"solid"
        }
    }
    const styles=StyleSheet.create({
        TouchableHighlight:{
            backgroundColor:props.BackgroundColor?props.BackgroundColor:"transparent",
            height:35,
            width:props.width?props.width:"100%",
            borderRadius:0,
            alignItems:"center",
            justifyContent:"center",
            marginTop:10,
            ...extraBorder,
            ...props.styleBox
        },
        TitleText:{
            color:props.titleColor?props.titleColor:Colors.brand.black,
            fontSize:18,
            fontWeight:"bold",
            textAlign:"center",

        }
    })
    return(
        <TouchableHighlight
            style={styles.TouchableHighlight}
    onPress={()=>props.onPress()}
>
    <Text style={styles.TitleText}>{props.Title}</Text>
        </TouchableHighlight>
)
}