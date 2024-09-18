import React from "react";
import {View, StyleSheet, Dimensions} from "react-native";
import {Colors} from "@/constants/Colors";
import OfferButtonWrapper from "@/components/public/OfferButtonWrapper";

const {width, height} = Dimensions.get("window");

type Props = {
    children?: React.ReactNode
}
export default (props: Props) => {
    return (
        <View style={styles.container}>
            {props.children}

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        margin: 0,
        minHeight: height / 3,
        backgroundColor:Colors.brand.background,
        borderRadius:10,
        padding:10,
        marginVertical: 5,
    }
})