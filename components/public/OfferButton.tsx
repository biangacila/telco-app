import {TouchableOpacity,View,Text,StyleSheet} from "react-native";


type Props={
    title: string,
    onPress: () => void,
    color:string
}
export default ({title,onPress,color}: Props) =>
    (
        <TouchableOpacity style={{...styles.container,borderColor:color}} onPress={onPress}>
            <Text style={{...styles.text,color}}>{title.toUpperCase()}</Text>
        </TouchableOpacity>
    )

const styles = StyleSheet.create({
    text:{
        color:"gray",
        fontSize:16,
        fontWeight:"bold",
        textAlign:"center"
    },
    container:{
        minHeight:55,
        backgroundColor:"white",
        borderStyle:"solid",
        borderColor:"transparent",
        borderRadius:5,
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        margin:5
    }
})