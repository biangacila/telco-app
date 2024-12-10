import {StyleSheet, View} from "react-native";

// @ts-ignore
export default ({ children })=>{
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}


const styles =StyleSheet.create({
    container:{
        marginVertical: 20,
        justifyContent:"space-between",
        flexDirection: "row"
    }
})