import {View, Text, StyleSheet, ScrollView,Dimensions} from "react-native";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Colors} from "@/constants/Colors";

let {height} = Dimensions.get("window");
export default () => {
    const state = useSelector((state: any) => state.core)
    const [DataError, setDataError] = useState<string[]>([])
    const logs = useSelector((state: any) => state.core.websocketError);
    useEffect(() => {
        let data = state.websocketError as string[]
        setDataError(data)
    }, [logs]);
    return (
        <View style={styles.container}>
            <View style={styles.innerBox1}>
                <Text style={styles.title}>Support info ({DataError.length})</Text>
            </View>
            <ScrollView style={styles.innerBox2}>
                {DataError.map(item => {
                    return (
                        <View style={styles.displayBox}>
                            <Text>{item}</Text>
                        </View>
                    )
                })}
            </ScrollView>

        </View>
    )
}
const styles = StyleSheet.create({
    displayBox:{
      borderBottomWidth:1,
      paddingBottom:10,
        paddingTop:10,
        borderBottomColor: Colors.brand.lightGray,
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        color: Colors.brand.blue
    },
    innerBox1: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.brand.lightBlue,
        paddingVertical: 10
    },
    innerBox2:{
      backgroundColor: Colors.brand.white,
        minHeight:height/1.3,
        padding:10,
        borderRadius:10,
        marginTop:0,
    },
    container: {
        padding: 20,
    }
})
