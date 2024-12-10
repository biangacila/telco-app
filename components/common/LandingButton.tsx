import {TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle} from "react-native";
import {Colors} from "@/constants/Colors";

type Props = {
    label: string,
    onPress: any,
    borderColor?: string,
    bgColor?: any,
    styleBox?:ViewStyle,
    styleText?:TextStyle
}
export default (props: Props) => {

    return (
        <TouchableOpacity
            style={{
                ...styles.container,
                backgroundColor: props.bgColor ? props.bgColor : Colors.brand.blue,
                borderColor: props.borderColor ? props.borderColor : Colors.brand.gray,
                ...props.styleBox,
            }}
            onPress={props.onPress}
        >
            <Text style={{...styles.label,...props.styleText}}>
                {props.label}
            </Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    label: {
        color: Colors.brand.white,
        fontSize: 16,
        fontWeight: "bold",
    },
    container: {
        width: "100%",
        height: 50,
        borderColor: Colors.brand.black,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        borderWidth: 2,
    }
})
