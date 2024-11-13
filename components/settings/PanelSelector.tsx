import {View, Text, Dimensions, StyleSheet, TouchableOpacity} from "react-native";
import {Colors} from "@/constants/Colors";

type Props = {
    title: string,
    onSelect: any,
    optionData: any[],
    returnKey: string,
    displayKey: any,
}
let {width, height} = Dimensions.get("screen");
export default (props: Props) => {

    return (
        <View style={styles.container}>
            <View style={{}}>
                <Text style={styles.title}>{props.title}</Text>
            </View>
            <View style={styles.box1}>
                {props.optionData.map(row => {
                    return (
                        <View style={styles.displayBox}>
                            <TouchableOpacity
                                onPress={() => props.onSelect(row)}
                            >
                                <Text style={styles.itemLabel}>{row[props.displayKey]}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    itemLabel: {
        fontSize: 18,
    },
    box1: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
    },
    displayBox: {
        backgroundColor: Colors.brand.white,
        width: "95%",
        minHeight: 50,
        marginVertical: 5,
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        elevation: 5,
    },
    title: {
        fontSize: 24,
        color: Colors.brand.blue,
        fontWeight: 'bold',
    },
    container: {
        backgroundColor: "transparent",
        minHeight : height/2,
        width,
        marginTop: 24,
        padding: 20,
    }
})
