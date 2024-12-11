import {View,Text,StyleSheet,Dimensions} from "react-native";
import VersionController from "@/config/version_controller";
import {Colors} from "@/constants/Colors";

let {width}=Dimensions.get("window");
export default  ()=> {

    return(
        <View style={styles.container}>
            <Text style={styles.text}>{VersionController}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text:{
        fontSize:16,
        color:Colors.brand.red,
        fontWeight:"bold",
        textAlign:"center",
        alignSelf:"center"
    },
    container: {
        marginTop:20,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: "center",
        width: '100%',
    }
})
