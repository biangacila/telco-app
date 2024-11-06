import {StyleSheet, Text, TouchableHighlight, View} from "react-native";
import Colors from "../../constants/Colors";
import Icon from "@expo/vector-icons/FontAwesome";
import React from "react";

type Props = {
    Title?: string,
    Color?:string,
    onPress?:any,
    iconSignColor?:string,
    iconBgColor?:string,
    noIcon?:boolean,
}
export default (props: Props) => {
    const styles = StyleSheet.create({
        title: {
            textAlign: "center",
            color: props.Color?props.Color: Colors.brand.blue,
            fontSize: 22,
            fontWeight: "bold"
        },
        btn:{
            backgroundColor:!props.iconBgColor?Colors.brand.red:props.iconBgColor,
            borderStyle:"solid",
            borderWidth:0,
            borderRadius:25,
            height:35,
            width:35,
            justifyContent:"center",
            flexDirection:"row",
            paddingTop:5
        },
        btnText:{
            color:Colors.brand.lightRed,
            textAlign:"center"
        },
        container:{
            flexDirection:"row",
            justifyContent:props.noIcon?"flex-start":"space-between",
            alignItems:"center",
            padding:10
        }
    })
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {props.Title}
            </Text>
            {!props.noIcon&&
                <TouchableHighlight
                    style={styles.btn}
                    onPress={()=>props.onPress()}
                >
                    <Icon
                        name={"plus"}
                        color={!props.iconSignColor?Colors.brand.white:props.iconSignColor}
                        size={25}
                    />
                </TouchableHighlight>
            }
        </View>

    )
}