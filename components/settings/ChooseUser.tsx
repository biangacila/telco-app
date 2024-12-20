import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {useNavigation} from "expo-router";
import {User2} from "@/types/type-model";
import {initialUser2} from "@/types/type_initialize";
import {Alert, Dimensions, StyleSheet, Text, View} from "react-native";
import InputTextBox from "@/components/common/InputTextBox";
import {Colors} from "@/constants/Colors";
import GenericButton from "@/components/FormInputs/GenericButton";
import {FindUserInfo} from "@/services/functions";
import FilterSelections from "@/components/settings/FilterSelections";
import PanelWithLabel from "@/components/common/PanelWithLabel";


type Props={
    saveUser?:any,
    category:string,
    selectedItem:string
    onSelectedItem?:any,
    title?:string,
    titleColor?:string,
}
let {width, height} = Dimensions.get('window');
export default (props: Props) => {
    const state = useSelector((state: any) => state.core);
    const [sync, setSync] = useState(false);
    const navigation = useNavigation();
    const [DataUsers, setUser] = useState<User2[]>([]);
    const [isUserFind, setIsUserFind] = useState(false);
    const [InputEmail, setInputEmail] = useState("");
    const [FoundedUser, setFoundedUser] = useState<User2>(initialUser2);
    const selectedSite = state.selectedSettingManagementData; // Redux selected site

    const [parentWidth, setParentWidth] = useState<number>(0);


    const handleLayout = (event: any) => {
        const { width } = event.nativeEvent.layout;
        setParentWidth(width);
    };
    useEffect(() => {
        //todo
    }, [isUserFind]);
    const onFindUserInfo=async ()=>{
        console.log(":)START USER FIND: ")
        await FindUserInfo(InputEmail,(u:any,ok:boolean)=>{
            let user = u as User2
            console.log("%%%%FindUserInfo> ",ok,user)
            setIsUserFind(ok)
            setFoundedUser(user)
            props.onSelectedItem(user)
        })
    }
    const onSaveUser = async () => {
        if(!isUserFind) {
            alert("Sorry please find user!")
            return
        }
        Alert.alert(
            `Allocate user to ${props.category}`,
            `Are you sure to allocate user ${FoundedUser.name} as  ${props.category} to ${props.selectedItem }?`,
            [
                {text:"Cancel"},
                {text:"Save",onPress:()=>props.saveUser(FoundedUser)},
            ]
        )
    }
    return (
        <PanelWithLabel
            title={props.title||""}
            styleLabel={{color:Colors.brand.blue}}
            onLayout={handleLayout}
        >
            <View style={{...styles.inputBox,width:parentWidth-40}}>
                <InputTextBox
                    label={""}
                    width={parentWidth-40}
                    textareaHeight={40}
                    placeholder={"Email address..."}
                    onChangeText={setInputEmail}
                    boxStyle={{marginTop: 15, backgroundColor: Colors.brand2.bluePrimary,}}
                    containerStyle={{minWidth:"100%",width:parentWidth-20}}
                />
                <GenericButton
                    onPress={onFindUserInfo}
                    bgColor={Colors.brand.lightGray}
                    borderColor={Colors.brand.white}
                    width={"100%"}
                    label={"Search user"}
                    height={40}
                    borderRadius={5}
                    style={{
                        marginTop: -5,
                        marginLeft: 0,
                    }}
                    labelColor={Colors.brand.white}
                />
            </View>

            {isUserFind && <View style={{marginTop:20}}>

                <FilterSelections
                    action={"User details found:"}
                    data={[
                        {key:"Code",value: FoundedUser.code},
                        {key:"Name",value:FoundedUser.name },
                        {key:"Phone",value: FoundedUser.phone_number},
                        {key:"Email",value: FoundedUser.email},
                    ]}
                    includeTitle={true}
                />

                {props.saveUser&&<GenericButton
                    onPress={onSaveUser}
                    bgColor={Colors.brand.white}
                    borderColor={Colors.brand.green}
                    width={width - 60}
                    label={"Allocate user"}
                    height={35}
                    borderRadius={5}
                    style={{
                        marginVertical: 20,
                    }}
                    labelColor={Colors.brand.green}
                    borderWidth={1}
                />}
            </View>}

        </PanelWithLabel>
    )

}
const styles = StyleSheet.create({
    inputBox: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        borderBottomWidth: 0,
        borderBottomColor: Colors.brand.lightBlue,
        borderStyle: "solid",
        marginBottom:20,
        width:"100%",
        backgroundColor:Colors.brand.white,
        paddingHorizontal: 0,

        /*borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 2,*/
    },
    userKey: {
        fontSize: 12,
        color: Colors.brand.black,
        fontWeight: "normal"
    },
    userValue: {
        fontSize: 12,
        color: Colors.brand.black,
        fontWeight: "bold"
    },
    detailUser: {
        marginTop: 20,
        justifyContent: "flex-start",
        alignItems: "center",
        borderStyle: "solid",
        borderColor: Colors.brand.lightBlue,
        minHeight: 150,
        width: width - 40 - 20,
        borderRadius: 10,
        borderWidth: 1,
        paddingHorizontal: 10
    },
    userBox: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 20,
        borderStyle: "solid",
        borderColor: Colors.brand.lightGray,
        minHeight: 25,
        width: width - 40,
        borderRadius: 10,
        borderBottomWidth: 1,
        paddingHorizontal: 10,
    },
    btnBox: {
        backgroundColor: Colors.brand.blue,
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        height: 40,
        maxHeight: 40,
        width: width - 40,
        borderRadius: 5,
    },
    btnText: {
        color: Colors.brand.white,
        fontSize: 16,
        fontWeight: "bold",
    },
    proBox: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    proImage: {
        width: 50,
        height: 50,
        resizeMode: "contain"
    },
    container: {

       /* padding: 10,*/
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: Colors.brand.green,
        minHeight: 40,
        width:width - 40,

        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    title2: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: Colors.brand.blue,
    },
    assetItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    assetItemSelected: {
        backgroundColor: '#d3d3d3',
    },
    assetName: {
        fontSize: 16,
    },
    stepperContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
});
