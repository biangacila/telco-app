import {View, Text, StyleSheet, Dimensions} from "react-native"
import InputBox from "./InputBox";
import Colors from "../../constants/Colors";
import ComboBox from "./MyComboBox";
import GenericButton from "./GenericButton";
import MyCheckBoxList from "./MyCheckBoxList";
import MyRadioButton from "./MyRadioButton";
import DateTimePicker from "./DateTimePicker";
import moment from "moment";
import React, {memo, useState} from "react";
import {InputField} from "@/types/type-general";
import InputImagePicker from "@/components/FormInputs/InputImagePicker";
import MyCheckBoxWithoutLabel from "@/components/FormInputs/MyCheckBoxWithoutLabel";

export type InputOption = { value?: string, label: string, key?: string }
/*export type InputField = {
    label: string
    controllerType: string // input,option,check-multiple,check-single,boolean-radio, boolean-check,calendar
    options?: InputOption[],
    onChange: any,
    mandatory: boolean,
    keyboardType?: any,
    activeControllerColorBox?: string,
    activeControllerColorLabel?: string,
    value?: any,
    labelFontSize?: number,
    checked?: string[],
    default?: moment.Moment,
    format?: any,
    mode?: string,

}*/

export type ButtonType = {
    label: string,
    bgColor: string,
    labelFontWeight: string,
    labelFontSize: number,
    labelColor: string,
    width: number,
    height: number,
    borderRadius: number,
    borderColor: string,
    onPress: any,
    inputValidation: boolean,// check if all required field are provided
}

interface Props {
    title: string
    fields: InputField[]
    buttons?: ButtonType[]
}

const {width} = Dimensions.get("screen")
const AddRecord =  (props: Props) => {

    const[controllerInputPicture,setControllerInputPicture] = useState<boolean>(false)

    const RenderInputText = (item: InputField) => {
        return (
            <View style={styles.inputBox}>
                <InputBox
                    Label={item.label}
                    keyboardType={item.keyboardType}
                    borderColor={Colors.brand.lightBlue}
                    borderRadius={5}
                    onChangeText={item.onChange}
                />
            </View>

        )
    }
    const RenderInputTextarea = (item: InputField) => {
        console.log("::>>>>RenderInputTextarea> ", item)
        return (
            <View style={styles.inputBox}>
                <InputBox
                    Label={item.label}
                    keyboardType={item.keyboardType}
                    borderColor={Colors.brand.lightBlue}
                    borderRadius={5}
                    onChangeText={item.onChange}
                    multiline={true}
                    numberOfLines={5}
                    styleInputBox={{height: 100,}}
                />
            </View>

        )
    }
    const RenderSelectBox = (item: InputField) => {
        const onChangeWithKey = (selectedKey: any) => {
            item.onChange(selectedKey)
            return
            let code: any;
            let options = item.options ? item.options : [];
            for (let i in options) {
                let rec = options[i];
                if (selectedKey === rec.label) {
                    code = rec.value
                }
            }
            item.onChange(code)
        }
        return (
            <View style={styles.inputBox}>
                <ComboBox

                    Label={item.label}
                    Data={item.options || []}
                    Placeholder={"Select Option"}
                    OnSelect={onChangeWithKey}
                    Color={Colors.brand.black}
                    SelectedValue={item.value}
                    BorderColor={item.activeControllerColorBox}

                />
            </View>

        )

    }
    const buildOptionArrayString = (info: InputOption[]): string[] => {
        let options: string[] = [];
        for (let i in info) {
            let rec = info[i];
            let lb = rec.label;
            options.push(lb)
        }
        return options
    }
    const RenderCheckBoxSingle = (item: InputField, allowSingleSelection: boolean) => {
        let options: string[] = buildOptionArrayString("" || [])
        const onCheck = (outItem: any) => {
            console.log("onCheck> ", outItem)

        }
        return (
            <View style={styles.checkBoxSingle}>
                <MyCheckBoxWithoutLabel
                    label={item.fieldName||""}
                    onChange={onCheck}
                    colorIcon={item.activeControllerColorBox}
                    colorLabel={item.activeControllerColorLabel}
                    labelFontSize={item.labelFontSize}
                    Options={options}
                    allowSingleCheck={allowSingleSelection}
                />
                <Text>{item.label}</Text>
            </View>
        )
    }
    const RenderCheckBoxList = (item: InputField, allowSingleSelection: boolean) => {
        let options: string[] = buildOptionArrayString(item.options || [])
        console.log("Check list options> ", options)
        const onCheck = (outItem: any) => {
            console.log("onCheck> ", outItem)

        }
        return (
            <View style={styles.checkBoxList}>
                <Text>{item.label}</Text>
                <MyCheckBoxList
                    onChange={onCheck}
                    colorIcon={item.activeControllerColorBox}
                    colorLabel={item.activeControllerColorLabel}
                    labelFontSize={item.labelFontSize}
                    Options={options}
                    allowSingleCheck={allowSingleSelection}
                />
            </View>
        )
    }
    const RenderRadioButton = (item: InputField) => {

        let options: string[] = buildOptionArrayString(item.options || [])
        console.log("Radio options> ", options)
        const onSelect = (outItem: any) => {
            console.log("onSelect> ", outItem)

        }
        return (
            <View style={styles.radioBtn}>
                <Text>{item.label}</Text>
                <MyRadioButton
                    onChange={onSelect}
                    data={options}
                    selectedValue={item.value}
                    colorChecked={item.activeControllerColorBox}
                    colorUnchecked={item.activeControllerColorBox}
                    size={20}
                />
            </View>
        )

    }
    const RenderCalendar = (item: InputField) => {
        return (
            <View style={styles.boxDate}>

                <DateTimePicker

                    Format={item.dateformat}
                    Default={moment(item.defaultDate)}
                    onSelect={item.onChange}
                    placeholder={item.label}
                    mode={item.mode}
                    label={item.label}/>
            </View>
        )
    }
    const RenderInputImage=(item:InputField)=>{
        return(
            <InputImagePicker
                onChange={item.onChange}
                value={item.value}
                label={item.label}
                onClose={()=>alert("close me")}
                prevSize={75}
                saveIt={true}
            />
        )
    }
    const RenderButton = (item: ButtonType) => {
        return (
            <GenericButton
                label={item.label}
                borderRadius={item.borderRadius}
                height={item.height}
                bgColor={item.bgColor}
                onPress={item.onPress}
                labelColor={item.labelColor}
                width={item.width}
            />
        )
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={{
                    fontSize: 16,
                    fontWeight:"bold",
                    color:Colors.brand.lightRed,
                    textAlign:"center",
                    marginVertical:20
                }}>{props.title}</Text>
            </View>
            <View style={styles.container2}>
                {props.fields.map(item => {
                    if (item.controller === "input") {
                        return RenderInputText(item)
                    } else if ( item.controller == "combobox" ) {
                        return RenderSelectBox(item)
                    } else if (item.controller === "check-multiple") {
                        return RenderCheckBoxList(item, false)
                    } else if (item.controller === "check-single" ) {
                        return RenderCheckBoxSingle(item, true)
                    }else if ( item.controller==="checkbox-single") {
                        return RenderCheckBoxSingle(item, true)
                    } else if (item.controller === "radio") {
                        return RenderRadioButton(item)
                    } else if (item.controller === "calender" || item.controller === "calendar" ) {
                        return RenderCalendar(item)
                    }else if (item.controller==="take picture"){
                        return RenderInputImage(item)
                    }else if (item.controller==="textarea"){
                        return RenderInputTextarea(item)
                    }
                    return RenderInputText(item)
                })}
            </View>
            {props.buttons?<View style={styles.btnGroup}>
                {props.buttons.map(item => {
                    return RenderButton(item)
                })}
            </View>:null}
        </View>
    )
}

export default memo(AddRecord)
const styles = StyleSheet.create({
    boxDate: {

        marginBottom: 0,
        padding:10,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    dateLabel1: {
        fontSize: 18
    },

    radioBtn: {
        paddingLeft: 0,
        width: "95%",
        marginTop: 10,
        marginLeft: 10,
    },
    checkBoxSingle: {
        paddingLeft: 0,
        width: "95%",
        marginTop: 25,
        marginLeft: 10,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems:"center"
    },
    checkBoxList: {
        paddingLeft: 0,
        width: "95%",
        marginTop: 25,
        marginLeft: 10,
    },
    btnGroup: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
    },
    inputBox: {
        minHeight: 35,
        width: "95%",
        margin:10,
    },
    container: {
        width: "100%",
        flexDirection: "column",
        justifyContent: "flex-start",
        /*borderColor:"red",*/
        borderWidth: 0
    },
    container2: {
        width: "100%",
        flexDirection: "column",
        justifyContent: "space-around",
        /*borderColor:"red",*/
        borderWidth: 0
    }
})