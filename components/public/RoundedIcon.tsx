import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Image } from "react-native"


type Props = {
    imgPath: string,
    onPress?: any,
}

export default (props: Props) =>{
    return(
        <TouchableOpacity style={styles.iconView} onPress={props.onPress}>
            <Image
                style={styles.image}
                source={{ uri: props.imgPath }}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    iconView:{
        // flexDirection: "row",
        marginHorizontal: 15,
        justifyContent: "center",
        alignContent: "center",
        height: 50,
        width: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: "#C7C8CC"
    },

    image:{
        height: 30,
        width: 30,
        // borderRadius: 10,
        alignSelf: "center",
    }
})