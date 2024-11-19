import {TouchableOpacity, View, StyleSheet, Text, FlatList,Dimensions} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import {Colors} from "@/constants/Colors";


type Props={
    title:string,
    onCancel?:any,
    onSelect?:any,
    keyDisplay:string,
    keyValue:string
    data:any[],
}
const {width,height}=Dimensions.get("window");
export default (props: Props)=>{

    return(
        <View style={styles.container}>
            <View style={styles.box1}>
                <TouchableOpacity
                    style={styles.iconBox}
                    onPress={props.onCancel}
                >
                    <AntDesign name={"back"} size={35} color={"white"}/>
                </TouchableOpacity>
                <View style={styles.innerBox1}>
                    <Text style={styles.step1}>Step: 1</Text>
                    <Text style={styles.title}>{props.title}</Text>
                </View>
            </View>

            <View>
                <FlatList
                    data={props.data}
                    keyExtractor={(item) => item[props.keyValue]}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            style={[
                                styles.item,
                            ]}
                            onPress={() => props.onSelect(item)}
                        >
                            <View style={styles.proBox}>
                                <Text style={styles.name}>{item[props.keyDisplay]}</Text>
                            </View>

                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    step1:{
      color:Colors.brand.blue,
      fontSize:18,
    },
    innerBox1:{
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginLeft:20
    },
    box1:{
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom:20
    },
    proBox: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    name: {
        fontSize: 16,
    },
    item: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width:width-40
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft:20
    },
    infoBox:{
        width:"78%",
    },
    iconBox:{
        backgroundColor:Colors.brand.black,
        marginHorizontal:5,
        borderRadius:5,
        maxWidth:35
    },
    container:{
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        backgroundColor:"white",
        paddingHorizontal:5,
        paddingVertical:5,
        borderRadius:5,
    }
})
