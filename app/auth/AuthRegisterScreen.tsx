import {View, Text, StyleSheet, Dimensions, Platform, KeyboardAvoidingView} from "react-native";
import {StatusBar} from "expo-status-bar";
import ContainerPage from "@/components/common/ContainerPage";
import Banner1 from "@/components/common/Banner1";
import {useNavigation} from "expo-router";
import {useState} from "react";
import InputTextBox from "@/components/common/InputTextBox";
import LandingButton from "@/components/common/LandingButton";
import {Colors} from "@/constants/Colors";
import RowBtn from "@/components/common/RowBtn";
import {FetchDataFromDomainDrivenPostWithError} from "@/services/service-domain-driven";
import {SERVER_AUTH_SERVICE, SERVER_TELCO_PRODUCT} from "@/config/server-connection";
import {User2} from "@/types/type-model";
import {User} from "@/types/type_general";


type Props = {
    route: any,

}
const {width, height} = Dimensions.get("screen")
export default (props: Props) => {
    const [InputUsername, setInputUsername] = useState("")
    const [InputPassword, setInputPassword] = useState("")
    const [InputName, setInputName] = useState("")
    const [InputSurname, setInputSurname] = useState("")
    const [InputPhone, setInputPhone] = useState("")
    const [InputConfirmPassword, setInputConfirmPassword] = useState("")
    const [errorLogin, setErrorLogin] = useState<any>(null);

    const keyboardVerticalOffset = Platform.OS === 'ios' ? 80 : 0;
    const navigation = useNavigation();
    const onLogin = () => {
        navigation.navigate("AuthLoginScreen" as never)
    }
    const onForgetPassword = () => {
        navigation.navigate("AuthForgetPassword1Screen" as never)
    }
    const validateInput = (): boolean => {
        const msg = (info: string, suffix: string = " can't be empty"): boolean => {
            alert(`${info} ${suffix}`)
            return false
        }
        if (InputName === "") {
            return msg("Name")
        }
        if (InputSurname === "") {
            return msg("Surname")
        }
        if (InputUsername === "") {
            return msg("Email")
        }
        if (InputPhone === "") {
            return msg("Phone number")
        }
        if (InputPassword === "") {
            return msg("Password")
        }
        if (InputPassword !== InputConfirmPassword) {
            return msg("Password", " doesn't match")
        }

        return true
    }
    const onSubmit = async () => {
        if (!validateInput()) {
            return
        }
        try {
            let postData = {
                given_name: InputName,
                family_name: InputSurname,
                email: InputUsername,
                phone_number: InputPhone,
                password: InputPassword,
                provider: "local",
                verified_email:false,
            }
            await SubmitRegisterAccount(postData)
            //alert("Coming soon")
        } catch (e) {
            alert(e)
        }
    }
    const SubmitRegisterAccount=async (payload:any)=>{

        let endpoint = "/users"
        let res=
            await FetchDataFromDomainDrivenPostWithError(payload,SERVER_AUTH_SERVICE, endpoint)
        if(res.status==="success") {
            let result = res.data as User
            console.log("@@@SubmitRegister res > ",result)
            alert("Thank you! Your account has been successfully created. You can now log in with your new account.")
            navigation.navigate("auth/loginScreen" as never)
        }else{
            let message  =`Response error\n\n${res.error.message}`
            console.log("@SubmitRegister  ERROR RECEIVE> ",message)
            alert(message)
        }
    }
    const RenderInputs = (props: { label: string, fn: any, borderColor: any }) => {
        return (
            <InputTextBox
                label={props.label}
                borderColor={props.borderColor}
                onChangeText={(e: any) => props.fn(e)}
                labelStyle={{fontSize: 18}}
            />
        )
    }
    return (
        <KeyboardAvoidingView
            style={{flex: 1}}
            behavior="padding"
            keyboardVerticalOffset={keyboardVerticalOffset}>
            <ContainerPage>
                <Banner1/>
                {errorLogin ? <View style={styles.errorLoginBox}>
                    <Text style={styles.errorLoginText}>{errorLogin}</Text>
                </View> : null}
                <View style={{marginTop: 20}}>
                    <StatusBar style="light" backgroundColor={"white"} translucent={true}/>
                    {RenderInputs({fn: setInputName, label: "FIRST NAME", borderColor: "black"})}
                    {RenderInputs({fn: setInputSurname, label: "SURNAME", borderColor: "black"})}
                    {RenderInputs({fn: setInputUsername, label: "EMAIL", borderColor: "black"})}
                    {RenderInputs({fn: setInputPhone, label: "PHONE", borderColor: "black"})}
                    {RenderInputs({fn: setInputPassword, label: "PASSWORD", borderColor: "black"})}
                    {RenderInputs({fn: setInputConfirmPassword, label: "CONFIRM PASSWORD", borderColor: "black"})}
                </View>
                {errorLogin ? <View style={styles.errorLoginBox}>
                    <Text style={styles.errorLoginText}>{errorLogin}</Text>
                </View> : null}

                <View style={styles.buttonContainer}>
                    <LandingButton
                        label={"Register".toUpperCase()}
                        onPress={() => onSubmit()}
                        bgColor={Colors.brand.blue}
                        borderColor={Colors.brand.black}
                    />
                </View>


                <View style={styles.lineContainer}>
                    <RowBtn
                        label1={"Login"}
                        onPressLabel1={onLogin}
                        onPressLabel2={onForgetPassword}
                    />
                </View>

            </ContainerPage>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    errorLoginText: {
        color: Colors.brand.red,
        fontWeight: "bold",
        fontSize: 18
    },
    errorLoginBox: {
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 20,
        marginHorizontal:20,
    },
    banner: {
        width: width,
        height: height / 2.5,
        resizeMode: "contain"
    },

    buttonContainer: {
        width: width - 60,
    },

    lineContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        paddingHorizontal: 40,
        width: width,
    }
})
