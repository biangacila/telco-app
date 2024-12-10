import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import RowBtnLine from "@/components/common/RowBtnWrapper";
import {Colors} from "@/constants/Colors";

type Props={
    onPressLabel1:any,
    onPressLabel2:any,
    label1?:string,
    label2?:string
}
export default (props:Props)=>{
    return (
        <RowBtnLine>
            <TouchableOpacity onPress={props.onPressLabel1}>
                <Text style={styles.rowBtn}>{props.label1?props.label1:"Register"}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.onPressLabel2}>
                <Text style={styles.rowBtn}>{props.label2?props.label2:"Forgot Password"}</Text>
            </TouchableOpacity>
        </RowBtnLine>
    )
}

const styles =StyleSheet.create({
    rowBtn:{
        color: Colors.brand.blue,
        fontSize: 16,
        fontWeight:"bold",
    },
})
