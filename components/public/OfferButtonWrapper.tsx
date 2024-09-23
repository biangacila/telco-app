import {View, StyleSheet} from "react-native";
import OfferButton from "@/components/public/OfferButton";
import {Colors} from "@/constants/Colors";

type Props = {
    onPress: () => void,
}

export default (props: Props) => {
    return (
        <View>
            <View style={styles.row}>
                <OfferButton
                    title={"Airtime"}
                    onPress={props.onPress}
                    color={Colors.brand.blue}
                />
                <OfferButton
                    title={" Data"}
                    onPress={props.onPress}
                    color={Colors.brand.red}
                />
            </View>
            <View style={styles.row}>
                <OfferButton
                    title={"Sim"}
                    onPress={props.onPress}
                    color={Colors.brand.lightRed}
                />
                <OfferButton
                    title={"Stock"}
                    onPress={props.onPress}
                    color={Colors.brand. lightBlue}
                />
            </View>
            <View style={styles.row}>
                <OfferButton
                    title={"Float"}
                    onPress={props.onPress}
                    color={Colors.brand.gray}
                />
                <OfferButton
                    title={"Monitoring"}
                    onPress={props.onPress}
                    color={Colors.brand. green}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    container: {
        flexDirection: "row",
    }
})