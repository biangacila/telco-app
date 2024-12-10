
import {View, Image, StyleSheet, Dimensions} from "react-native"
// @ts-ignore
import logo from "../../assets/logo1.webp"
interface Props{
    title?:string,
    includeGoBtn?:boolean
}
const {width, height} = Dimensions.get("screen")
export default (props:Props)=>{

    return(
        <Image
            source={logo}
            style={styles.container}
        />
    )
}
const styles = StyleSheet.create({
    container:{
        width,
        height:height/3.5,
        resizeMode:"cover",
        marginTop:0,
    }
})
