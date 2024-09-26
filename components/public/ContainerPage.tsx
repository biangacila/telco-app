import {StyleSheet, View, Dimensions, ScrollView, KeyboardAvoidingView, Platform} from "react-native";
import {StatusBar} from "expo-status-bar";
import {Colors} from "@/constants/Colors";


const {width, height} = Dimensions.get("screen")
export default ({children,bgColor}: any) => {

    const styles = StyleSheet.create({
        Container: {
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            minHeight: height,
            width,
            paddingBottom: 100,
            backgroundColor:bgColor?bgColor:Colors.brand.white,
        }
    })
    return (
        <ScrollView style={{
        }} >
            <StatusBar backgroundColor={"white"}/>
            <View style={styles.Container}>
                {children}
            </View>

        </ScrollView>
    )
}
