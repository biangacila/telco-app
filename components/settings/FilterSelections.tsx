import {FlatList, Text, View,StyleSheet} from "react-native";
import React from "react";
import {Colors} from "@/constants/Colors";

export type Record={
    key: string,
    value: any
}
type Props = {
    action?: string,
    data: Record[],
    includeTitle?:boolean
}
export default (props: Props) => {
    const getValidItems=():{total:number,data:Record[]}=>{
        let data:Record[]=[];
        for(let i in props.data){
            let row  = props.data[i];
            if(row.value!==null && row.value!==undefined && row.value!==""){
                data.push(row)
            }
        }
        return {
            total:data.length,
            data:data
        }
    }
    const renderRecord = ({ item }: { item: { key: string, value: any } }) => {
        return (
            <View style={styles.recordItem}>
                <Text>{item.key}:</Text>
                <Text style={styles.value}>{item.value}</Text>
            </View>
        )
    }
    if(getValidItems().total===0){
        return null
    }
    return (
        <View style={styles.container}>
            {props.includeTitle&&<Text style={styles.title}>{props.action}</Text>}
            <FlatList
                data={getValidItems().data}
                renderItem={renderRecord}
                keyExtractor={(item) => item.key}
                style={styles.list}
            />
        </View>
    )
}

const styles=StyleSheet.create({
    value:{
      color:Colors.brand.blue,
    },
    list:{
        flexGrow: 0,
    },
    recordItem:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:"space-between",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    container: {
        /*flex: 1,*/
        padding: 16,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 2,
        minHeight:50,
        /*maxHeight:150,*/
        marginTop:-30,
        marginBottom:10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
})
