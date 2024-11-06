import {StyleSheet, Text, TextStyle, TouchableOpacity, View} from "react-native";
// @ts-ignore
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from '@expo/vector-icons/Ionicons';
import {useState} from "react";
import Colors from "../../constants/Colors";


type Props={
    Options:{label:string,value:any}[],
    onChange:any,
    colorIcon?:string,
    colorLabel?:string,
    labelFontSize?:number,
    allowSingleCheck?:boolean,
    value:{[index:string]:boolean}
    title?:string,
    styleTitle?:TextStyle
}
export default (props:Props)=>{
    const onChange=(key:string)=>{
        let current =false;
        if(typeof props.value[key]!=="undefined"){
            current = props.value[key]
            current =!current
        }else{
            current = true
        }
        let outOption:{[index:string]:boolean} ={ ...props.value,[key]:current};
        if(props.allowSingleCheck){
            outOption = {[key]:current}
        }

        props.onChange(outOption)
    }
    const isChecked=(key:string):boolean=>{
        if(typeof props.value[key]!=="undefined"){
            return props.value[key]
        }
        return false
    }
    const getLabelFontSize=():number=>{
        let num = 14
        if(props.labelFontSize){
            num = props.labelFontSize;
        }
        return num;
    }
    const getColorIcon=():string=>{
        let color = Colors.brand.lightBlue
        if(props.colorIcon){
            color =props.colorIcon
        }
        return color
    }
    const getColorLabel=():string=>{
        let color = Colors.brand.black
        if(props.colorLabel){
            color =props.colorLabel
        }
        return color
    }
    const isSelected=(key:string)=>{
        let InputYes = isChecked(key)
        if(InputYes){
            return(
                <Ionicons
                    name={"checkbox-sharp"}
                    size={24}
                    style={{
                        ...styles.icon,color:getColorIcon(),

                    }}
                />
            )
        }else{
            return (
                <MaterialCommunityIcons
                    name={"checkbox-blank-outline"}
                    size={24}
                    style={{
                        ...styles.icon,color:getColorIcon(),
                    }}
                />
            )
        }
    }

    return(
        <View>
            {props.title&&<View>
                <Text style={props.styleTitle}>{props.title}</Text>
            </View>}
            {props.Options.map(item=>{
                return(
                    <TouchableOpacity
                        onPress={()=>onChange(item.value)}
                        style={styles.box}
                    >
                        {isSelected(item.value)}
                        <Text  style={{
                            color:getColorLabel(),
                            fontSize:getLabelFontSize(),
                        }}>{item.label}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    box:{
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center"
    },
    icon:{
        color:Colors.brand.lightBlue,
        marginLeft:5
    }
})