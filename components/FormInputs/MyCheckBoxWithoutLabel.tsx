import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
// @ts-ignore
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from '@expo/vector-icons/Ionicons';
import {useState} from "react";
import Colors from "../../constants/Colors";


type Props={
    label:string,
    Options:string[],
    onChange:any,
    colorIcon?:string,
    colorLabel?:string,
    labelFontSize?:number,
    allowSingleCheck?:boolean,
    includeLabel?:boolean,

}
export default (props:Props)=>{
    const[data,setData]=useState<{[index:string]:boolean}>({})

    const onChange=(key:string)=>{
        let current =false;
        if(typeof data[key]!=="undefined"){
            current = data[key]
            current =!current
        }else{
            current = true
        }
        /**
         * //todo extend to check if only one selection allow
         */
        let outOption:{[index:string]:boolean} ={ ...data};
        if(props.allowSingleCheck){
            let tmp:{[index:string]:boolean} = {}
            for(let i in outOption){
                tmp[i] = false
            }
            outOption = tmp
        }
        //End of extention

        let info:{[index:string]:boolean} = {...outOption,[key]:current}
        setData(info)
        props.onChange(info)
    }
    const isChecked=(key:string):boolean=>{
        if(typeof data[key]!=="undefined"){
            return data[key]
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
    const buildOptions=():string[]=>{
        return props.Options
    }
    return(
        <View>

            <TouchableOpacity
                onPress={()=>onChange("yes")}
                style={styles.box}
            >
                {props.includeLabel?<Text  style={{
                    color:getColorLabel(),
                    fontSize:getLabelFontSize(),
                }}>{props.label}</Text>:null}
                {isSelected("yes")}
            </TouchableOpacity>
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