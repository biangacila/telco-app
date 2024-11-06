import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal, Dimensions} from 'react-native';
import DateTimePicker from "./DateTimePicker";
import moment from "moment";
import {GetCurrentDate, getCurrentMonth, getCurrentYear} from "../../services/service-common";
import Colors from "../../constants/Colors";
import {useNavigation} from "@react-navigation/native";



const {width,height}=Dimensions.get("screen")

export default () => {

    const navigations = useNavigation()
    const [sync, setSync] = useState<boolean>(false);

    const [isModalVisible, setModalVisible] = useState(false);
    const [InputStartDate,setInputStartDate]=useState<moment.Moment>(GetCurrentDate());
    const [CurrentMonth,setCurrentMonth]=useState<string>(getCurrentMonth());
    const [CurrentYear,setCurrentYear]=useState<number>(getCurrentYear());

    useEffect(() => {
        if (!sync) {
            setSync(true)
            setCurrentMonth(getCurrentMonth())
            setCurrentYear(getCurrentYear())
        }
    })
    const goTo=(nav:any)=>{
        navigations.navigate(nav as never)
    }

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };


    return (
        <View>
            <TouchableOpacity onPress={toggleModal}>
                <View style={styles.openModalButton}>
                    <Text style={styles.linkText}>Current Month ({CurrentMonth} {CurrentYear})</Text>

                </View>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={toggleModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.dateLabel}>From:</Text>
                        <DateTimePicker
                            label={""}
                            onSelect={setInputStartDate}
                            Default={moment(InputStartDate,"YYYY-MM-DD")}
                            mode={"date"}
                            placeholder={"Select"}
                            Format={"YYYY-MM-DD"}
                        />
                        <Text style={styles.dateLabel}>To:</Text>
                        <DateTimePicker
                            label={""}
                            onSelect={setInputStartDate}
                            Default={moment(InputStartDate,"YYYY-MM-DD")}
                            mode={"date"}
                            placeholder={"Select"}
                            Format={"YYYY-MM-DD"}
                        />

                        <TouchableOpacity onPress={toggleModal}>
                            <Text style={styles.closeModalButton}> Close</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={toggleModal}>
                            <Text style={styles.closeModalButton}> Save</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>

        </View>


);
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateLabel:{
        fontSize:14
    },
    linkText: {
        color: Colors.brand.blue,
        fontSize:22,
        fontWeight:'bold',
        marginLeft:20
    },
    openModalButton: {
        marginTop: 10,
        color: 'black',
        borderStyle:"solid",
        borderBottomColor:Colors.brand.lightGray,
        borderBottomWidth:2,
        width:(width-40),
        marginLeft:10,
        paddingBottom:10,
        alignContent:"center",
        justifyContent:"center",

    },
    modalContainer: {
        flex:1,
        flexDirection:"row",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background

    },
    modalContent: {
        width: 300,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
        height:((height/2)-180),
        alignContent:"center",
        justifyContent:"center",


    },
    closeModalButton: {
        marginTop: 10,
        color:Colors.brand.blue,
        fontSize:18,
        justifyContent:"center",
        alignContent:"center",
    },
});
