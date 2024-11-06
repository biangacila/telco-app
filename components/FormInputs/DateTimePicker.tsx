// import React in our code
// @ts-ignore
import React, {useState} from 'react';

// import all the components we are going to use
import {SafeAreaView, StyleSheet, Text, TouchableHighlight, View} from 'react-native';

import AntDesign from '@expo/vector-icons/AntDesign';
import DatePicker from '@react-native-community/datetimepicker';
// @ts-ignore
import moment from "moment";


type InPros = {
    Format: string,
    Default: moment.Moment,
    onSelect: any,
    placeholder: string,
    mode: any,

    label?: string,
    labelSize?:number,
    marginTop?:number,
}


const DateSelector = (props: InPros) => {
    const [date, setDate] = useState<moment.Moment>(props.Default);
    const [show, setShow] = useState(false)
    const harareTimeZoneOffset = 120; // Harare (CAT) is UTC+2


    const onDateSelect = (value: Date) => {
        let newDate = moment(value)
        setDate(newDate)
        props.onSelect(newDate,moment(value).format("YYYY-MM-DD"))

        console.log(props.label," Inner onDateSelect: ",newDate,value )

        setShow(false)

    }
    return (
        <SafeAreaView style={styles.container}>
            {props.label&&<Text style={{fontSize:props.labelSize?props.labelSize:16}}>{props.label}</Text>}
            {show ?
                <DatePicker

                    style={{
                        width: "100%",
                        opacity: 1,
                        height: 30,
                        marginTop: props.marginTop?props.marginTop:10,
                    }}

                    value={date.toDate()}
                    onChange={(event: any, date: any) => {
                        onDateSelect(date);
                    }}

                    timeZoneName={"Africa/Harare"}
                    mode={props.mode}
                /> :
                <View style={{
                    //backgroundColor: Colors.brand.blue,
                    width: "100%",

                }}>
                    <TouchableHighlight
                        onPress={() => setShow(true)}
                        style={{
                            backgroundColor: "white",
                            height: 50,
                            width: "100%",
                            borderRadius: 5,
                            padding: 5,
                            borderStyle: "solid",
                            borderColor: "lightgray",
                            borderWidth: 1,

                        }}
                    >


                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                alignItems:"center",
                                height:"100%"
                            }}
                        >
                            <Text style={{
                                color: "gray",
                                fontWeight: "bold",
                                fontSize: 16
                            }}>
                                {props.mode==="date"?moment(date, "YYYY-MM-DD").format("DD MMM YYYY"):
                                    moment(date, "HH:mm").format("HH:mm")}
                            </Text>
                            <AntDesign name="calendar" size={24} color="black"/>

                        </View>

                    </TouchableHighlight>
                </View>

            }


        </SafeAreaView>
    );
};

export default DateSelector;

const styles = StyleSheet.create({
    dateTimeText: {
        fontSize: 16,
        fontWeight: 'normal',
    },
    resetButton: {
        width: 150,
    },
    container: {

        padding: 0,
        justifyContent: 'flex-start',

        width: "100%"
    },
    title: {

        fontSize: 20,
        fontWeight: 'bold',
        padding: 20,
    },
    datePickerStyle: {
        marginTop: 0,
        width: "100%"
    },
});