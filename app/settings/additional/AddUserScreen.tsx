import {Alert, Dimensions, Platform, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {User2} from "@/types/type-model";
import {useNavigation} from "expo-router";
import {FetchDataFromDomainDrivenGet, FetchDataFromDomainDrivenPost} from "@/services/service-domain-driven";
import {Colors} from "@/constants/Colors";
import InputTextBox from "@/components/common/InputTextBox";
import {initialUser2} from "@/types/type_initialize";
import GenericButton from "@/components/FormInputs/GenericButton";
import {useSelector} from "react-redux";
import {SERVER_AUTH_SERVICE} from "@/config/server-connection";


let {width, height} = Dimensions.get('window');
export default () => {
    const state = useSelector((state: any) => state.core);
    const [sync, setSync] = useState(false);
    const navigation = useNavigation();
    const [DataUsers, setUser] = useState<User2[]>([]);
    const [isUserFind, setIsUserFind] = useState(false);
    const [InputEmail, setInputEmail] = useState("");
    const [FoundedUser, setFoundedUser] = useState<User2>(initialUser2);
    const selectedSite = state.selectedSettingManagementData; // Redux selected site

    useEffect(() => {
        if (!sync) {
            setSync(true)
            loadAllUsers().then(null)
        }
    }, []);
    const loadAllUsers = async () => {
        let endpoint = "/users"
        let result = await FetchDataFromDomainDrivenGet(SERVER_AUTH_SERVICE,endpoint)
        let data = result.data as User2[]
        setUser(data)
        for (let i in data) {
            //console.log("USer>> ",data[i])
        }
    }
    const onFindUserInfo =async () => {
        setIsUserFind(false)
        let targetEmail = InputEmail.trim().toLowerCase();
        let endpoint = "/users/exist" ;
        let payload={
            username: targetEmail,
        }
        let result = await FetchDataFromDomainDrivenPost(payload,SERVER_AUTH_SERVICE,endpoint)
        if( result.user === undefined){
            console.log("am response undefined> ",result)
            return
        }
        let user  = result.user as User2
        console.log(":::>onFindUserInfo>Response > ",result)
        if(user.name!==""){
            setFoundedUser(user)
            setIsUserFind(true)
        }
    }
    const onSaveUser = async () => {
        if(!isUserFind) {
            alert("Sorry please find user!")
            return
        }

        Alert.alert(
            'Allocate user to site',
            `Are you sure to allocate user ${FoundedUser.name} to your side ${selectedSite.name}?`,
            [
                {text:"Cancel"},
                {text:"Save",onPress:SaveUser},
            ]
        )
    }
    const SaveUser = async () => {
        console.log("onSaveUser > ", FoundedUser)
        let payload = {
            "org": selectedSite.org,
            "category": "site",
            "ref": selectedSite.code,
            "target_id": FoundedUser.code,
            "target_category": "supervisor",
            "status": "active",
            "created_by": "biangacila@gmail.com",
            "allocated_to": "n/a"
        }
        try {
            console.log(":( Save supervisor record> ",payload)
            const response = await FetchDataFromDomainDrivenPost(payload, "allocations")
            console.log("Submit response>>>>>> ", response)
            if (response.status === 200 || response.status === 201) {
                navigation.goBack();
                alert('User allocated successfully!');
            } else {
                alert('Failed to allocate user.');
            }
        } catch (error) {
            console.error('Error submitting user:', error);
        }
    }
    const RenderUserDetail = ({k, value}: any) => {
        return (
            <View style={styles.userBox}>
                <Text style={styles.userKey}>{k} : </Text>
                <Text style={styles.userValue}>{value}</Text>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>New User</Text>
            <View style={styles.inputBox}>
                <InputTextBox
                    label={""}
                    width={width - 40 - 100}
                    placeholder={"Email address of the supervisor"}
                    onChangeText={setInputEmail}
                    boxStyle={{marginTop: 15, backgroundColor: Colors.brand2.bluePrimary}}
                />
                <GenericButton
                    onPress={onFindUserInfo}
                    bgColor={Colors.brand.blue}
                    borderColor={Colors.brand.white}
                    width={100}
                    label={"Find user"}
                    height={35}
                    borderRadius={5}
                    style={{
                        marginTop: -5,
                    }}
                    labelColor={Colors.brand.white}
                />
            </View>

            {isUserFind && <View style={styles.detailUser}>
                <Text>User is find with detail:</Text>
                <RenderUserDetail k={"Code"} value={FoundedUser.code}/>
                <RenderUserDetail k={"Surname"} value={FoundedUser.family_name}/>
                <RenderUserDetail k={"First name"} value={FoundedUser.name}/>
                <RenderUserDetail k={"Phone"} value={FoundedUser.phone_number}/>
                <RenderUserDetail k={"Email"} value={FoundedUser.email}/>

                <GenericButton
                    onPress={onSaveUser}
                    bgColor={Colors.brand.white}
                    borderColor={Colors.brand.green}
                    width={width - 60}
                    label={"Save user"}
                    height={35}
                    borderRadius={5}
                    style={{
                        marginVertical: 20,
                    }}
                    labelColor={Colors.brand.green}
                    borderWidth={1}
                />
            </View>}
        </View>
    )
}


// Styles
const styles = StyleSheet.create({
    inputBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: Colors.brand.lightBlue,
        borderStyle: "solid",
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
        borderColor: Colors.brand.lightGray,
        minHeight: 150,
        width: width - 40,
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
        flex: 1,
        padding: 20,
        flexDirection: "column",
        backgroundColor: Colors.brand.white,
        minHeight: height-30,
        width,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
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
