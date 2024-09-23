import {Text, View, StyleSheet, TouchableOpacity, ViewStyle, TextStyle} from "react-native";
import React from "react";
import {Colors} from "@/constants/Colors";
import Icon from 'react-native-vector-icons/AntDesign';

type Props={
    onPress?: any;
    activeIcon?: any;
    activeColor?: string;
}
export default (props:Props)=>{
    let menus:{title:string,icon:string,color:string}[] = [
        {title:"Home",icon:"home",color:Colors.brand.gray},
        {title:"Notification",icon:"notification",color:Colors.brand.gray},
        {title:"Transaction",icon:"arrowsalt",color:Colors.brand.gray},
        {title:"Settings",icon:"setting",color:Colors.brand.gray},
    ];
    return(
        <View style={styles.bottomNav}>
            {menus.map(item=>{
                let actIconColor:TextStyle = {
                    color:Colors.brand.gray,
                    fontWeight:"normal"
                };
                if(item.title ==props.activeIcon){
                    actIconColor = {
                        color:props.activeColor,
                        fontWeight:"bold",
                    };
                }
                return(
                    <TouchableOpacity
                        onPress={()=>props.onPress(item.title)}>
                        <View style={styles.boxIcon}>
                            <Icon name={item.icon} size={15} color={Colors.brand.gray} style={actIconColor}/>
                            <Text style={{...styles.textIcon,...actIconColor}}>{item.title}</Text>
                        </View>
                    </TouchableOpacity>
                )
            })}
            {/*<Text>Home</Text>
            <Text>Notification</Text>
            <Text>Transaction</Text>
            <Text style={{ color: 'blue' }}>Settings</Text>*/}
        </View>
    )
}
const styles=StyleSheet.create({
    boxIcon:{
      justifyContent:"center",
      alignItems:"center",
    },
    textIcon:{
      fontSize:11,
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 15,
        borderTopWidth: 1,
        borderColor: '#ddd',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
    }
})