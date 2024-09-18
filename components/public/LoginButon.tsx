import {View,Text,TouchableOpacity,StyleSheet} from "react-native";


type Props = {
    onPress: () => void;
}
export default ({ onPress }: Props) => {
    return(
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
    )
}
const styles=StyleSheet.create({
    text:{
        color: 'green',
        fontSize: 18,
        fontWeight:"bold"
    },
    container:{
        flex: 1,
        alignItems:"center",
        backgroundColor:"white",
        height:50,
        borderStyle:"solid",
        borderColor:"green",
        borderWidth:0.2,
        width:70,
        borderRadius:2
    }
})