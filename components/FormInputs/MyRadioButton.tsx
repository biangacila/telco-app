import {View, Text, StyleSheet} from "react-native";

import FontistoIcon from "@expo/vector-icons/Fontisto";
import {useState} from "react";

type Props = {
    data: string[],
    selectedValue: string,
    onChange: any,
    styleBox?: object,
    styleLabel?: object
    size: number,
    colorChecked?: string,
    colorUnchecked?: string,
}

export default (props: Props) => {
    const [value, setValue] = useState<string>(props.selectedValue)

    const onChange = (innerValue: string) => {
        setValue(innerValue)
        props.onChange(innerValue)
    }
    const RenderDataItem = () => {

        return (
            <View>
                {props.data.map(item => {
                    return (
                        <View style={styles.radioBox}>
                            {item === value ?
                                <FontistoIcon
                                    name={"radio-btn-active"}
                                    size={props.size}
                                    onPress={() => onChange(item)}
                                    color={props.colorChecked}
                                    style={props.styleBox ? props.styleBox : {}}
                                /> :
                                <FontistoIcon
                                    color={props.colorUnchecked}
                                    name={"radio-btn-passive"}
                                    size={props.size}
                                    onPress={() => onChange(item)}
                                    style={props.styleBox ? props.styleBox : {}}
                                />
                            }
                            <Text
                                style={props.styleLabel ? props.styleLabel : styles.checkLabel}>{item}</Text>
                        </View>
                    )
                })}
            </View>
        )
    }
    return (
        <View style={styles.container}>
            {RenderDataItem()}
        </View>
    )

}


const styles = StyleSheet.create({
    radioBox: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 10
    },
    checkLabel: {
        marginLeft: 10
    },
    container: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    }
})