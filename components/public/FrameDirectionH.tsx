import {View, TouchableOpacity, Text, StyleSheet, Dimensions} from "react-native";
const {width,height}=Dimensions.get("screen")

// @ts-ignore
export default ({ children,iStyles })=>{
    let extraStyle:Object = {...styles.container}
    if(iStyles){
        extraStyle ={...extraStyle,...iStyles}
    }
    return (
        <View style={extraStyle}>
            {children}
            </View>
    )
}
const styles =StyleSheet.create({
    container:{
        marginTop:10,
        flexDirection:"column",
        justifyContent:"flex-start",
        alignItems:"center",
        width,
        padding:20,
        backgroundColor:"transparent"
    }
})
