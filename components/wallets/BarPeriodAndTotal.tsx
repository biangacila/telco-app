import {View, Text, StyleSheet, Dimensions, TextStyle} from "react-native";
import {Colors} from "@/constants/Colors";


type Props = {
    from: string,
    to: string,
    total: string,
    colorTitle?:string,
    colorValue?:string,
}
let {width} = Dimensions.get("window");
export const BarPeriodAndTotal = (props: Props) => {
    let extraStyleTitle:TextStyle = {}
    let extraStyleText:TextStyle = {}
    if(props.colorTitle){
        extraStyleTitle.color = props.colorTitle
    }
    if(props.colorValue){
        extraStyleText.color = props.colorValue
    }
    const RenderBox = (title: string, value: any) => {
        return (
            <View style={styles.box}>
                <View style={styles.boxInner}>
                    <Text style={[styles.labelTitle,extraStyleTitle]}>
                        {title}
                    </Text>
                </View>
                <View>
                    <Text style={[styles.labelValue,extraStyleText]}>
                        {value}
                    </Text>
                </View>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            {RenderBox("From", props.from)}
            {RenderBox("Total", "R "+props.total)}
            {RenderBox("To", props.to)}
        </View>
    )
}
const styles = StyleSheet.create({
    labelValue:{
        fontSize: 12,
        fontWeight: "bold",
    },
    labelTitle:{
        fontSize: 12,
        fontWeight: "normal",
    },
    boxInner: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.brand.lightGray,
    },
    box: {
        width: (width - 80) / 3,
        borderColor: Colors.brand.lightGray,
        borderWidth: 1,
        paddingHorizontal: 5,
        paddingVertical: 5,
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        width: width - 80 ,
        alignSelf:"center"
    }
})
