import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    FlatList,
    Image,
    TextStyle, Alert
} from "react-native";
import {useSelector} from "react-redux";
import {
    Allocation,
    DealerType,
    FloatBalance,
    FloatCashType,
    RoleType, SelfieType,
    SellerType,
    User2,
    WalletType
} from "@/types/type-model";
import {
    initialFloatBalance,
    initialFloatCash,
    initialSellerType,
    initialUser2,
    initialWalletType
} from "@/types/type_initialize";
import {FetchDataFromDomainDrivenGet, FetchDataFromDomainDrivenPostWithError} from "@/services/service-domain-driven";
import {SERVER_TELCO_CORE, SERVER_TELCO_FINANCE} from "@/config/server-connection";
import {Colors} from "@/constants/Colors";
import {formatDate2} from "@/services/functions";
import InputTextBox from "@/components/common/InputTextBox";
import GenericButton from "@/components/FormInputs/GenericButton";
import FrameDirectionH from "@/components/public/FrameDirectionH";
import StageButton from "@/components/common/StageButton";
import {savePictureToDropBox} from "@/services/service-photo";
import SelfiePicture from "@/components/common/SelfiePicture";
import {Icon} from "react-native-elements";

let {width, height} = Dimensions.get("screen")
export default () => {
    const [IsSaving, setIsSaving] = useState(false);
    const [mode, setMode] = useState("list");
    const [sync, setSync] = useState(false);
    const [InputSelectedUser, setInputSelectedUser] = useState<User2>(initialUser2)
    const [InputAmount, setInputAmount] = useState("")
    const [DataSeller, setDataSeller] = useState<SellerType[]>([])
    const [UserWallet, setUserWallet] = useState<WalletType>(initialWalletType)
    const [UserFloatBalance, setUserFloatBalance] = useState<FloatBalance>(initialFloatBalance);
    const [DataFloatCash, setDataFloatCash] = useState<FloatCashType[]>([]) // initialFloatCash:FloatCash
    const [PictureUrl, setPictureUrl] = useState<SelfieType>({
        url: "", address: "", lat: 0, long: 0
    })
    const [ImageCash, setImageCash] = useState<any>(null);
    const [ImageUrlLocal, setImageUrlLocal] = useState<string>("");

    const store = useSelector((state: any) => state.core);
    let user = store.loginWithProvider as User2
    let org = store.currentCompany.code;

    useEffect(() => {
        if (!sync) {
            setSync(true);
            fetchConfigInfo().then(null)
            loadFloatBalance().then(null)
            loadWallets().then(null)
            loadFloatCash().then(null)
        }

    }, []);

    const fetchConfigInfo = async () => {
        type ResponseType = {
            dealers: DealerType[],
            subdealers: DealerType[],
            supervisors: DealerType[],
            allocations: Allocation[],
            roles: RoleType[],
            sellers: SellerType[]
        }
        let endpoint = `/configs/get/all/org/${org}`
        let req = await FetchDataFromDomainDrivenGet(SERVER_TELCO_CORE, endpoint)
        let data = req.results as ResponseType
        setDataSeller(data.sellers || [])
    }
    const loadFloatCash = async () => {
        let endpoint = `/floatcashs/get/user/${user.code}`
        let req = await FetchDataFromDomainDrivenGet(SERVER_TELCO_FINANCE, endpoint)
        let data = req.results as FloatCashType[]
        console.log("loadFloatCash >>>>> ", data)
        setDataFloatCash(data)
    }
    const loadFloatBalance = async () => {
        let endpoint = `/floatbalances/get/user/${user.code}`
        let req = await FetchDataFromDomainDrivenGet(SERVER_TELCO_FINANCE, endpoint)
        let data = req.results as FloatBalance
        setUserFloatBalance(data)
    }
    const loadWallets = async () => {
        let endpoint = `/wallets/get/user/${user.code}`
        let req = await FetchDataFromDomainDrivenGet(SERVER_TELCO_FINANCE, endpoint)
        let data = req.records as WalletType
        setUserWallet(data)
    }
    const onNewCashUp = () => {
        setMode("new")
    }
    const onCloseNewCashUp = () => {
        setMode("list")
    }
    const getSellerRecord = (code: string): SellerType => {
        for (let i in DataSeller) {
            let row = DataSeller[i];
            if (row.code === code) {
                return row
            }
        }
        return initialSellerType;
    }
    const onSubmitCash = async () => {
        Alert.alert(
            'Save Cash-Up',
            'Are you to save this cash up?',
            [
                {text: "Cancel"},
                {
                    text: "Save", onPress:async () => {
                        setMode("saving")
                        let defaultImage = "https://c8.alamy.com/comp/F6T8NM/south-african-rand-notes-photographed-against-a-white-background-F6T8NM.jpg"
                        console.log("FF> ",0)
                        if (!ImageCash) {
                            console.log("FF> ",1)
                            submitRecord(defaultImage).then(null)
                        } else {
                             console.log("FF> ",2)
                           await savePictureToDropBox(ImageUrlLocal, (res: any,err:any) => {
                               if(err){
                                   console.log("err res savePictureToDropBox> ",res)
                                   return;
                               }
                               let resUrl = res.url;
                                submitRecord(resUrl).then(null)
                            })
                        }
                    }
                }
            ]
        )


    }
    const submitRecord = async (pictureUrl: string) => {
        let sellerRecord = getSellerRecord(user.code)
        let payload = {
            "seller": user.code,
            "reported_amount": InputAmount == "" ? 0 : parseFloat(InputAmount),
            "org": sellerRecord.org,
            "dealer": sellerRecord.dealer,
            "subdealer": sellerRecord.subdealer,
            "supervisor": sellerRecord.supervisor,
            "evidence_url": pictureUrl,
            "created_by": `<${InputSelectedUser.code}>${InputSelectedUser.name}<${InputSelectedUser.email}>`,
        }
        console.log("onSubmitFloat payload >>>> ", payload)
        let endpoint = `/floatcashs/post/new`
        let result = await FetchDataFromDomainDrivenPostWithError(payload, SERVER_TELCO_FINANCE, endpoint)
        let response = result.data
        console.log("submit float response > ", result)

        loadFloatCash().then(null)
        alert(`Thank you, float record saved `)
        setMode("list");
    }
    const onTakePicture = async () => {
        setMode("picture")
    }
    const onSavePicture = (info: SelfieType) => {
        setMode("new")
        setPictureUrl(info)
    }
    const onCancelSelfie = () => {
        setMode("new")
    }
    const finishCaptureImage = () => {
        setMode("new")
    }
    const canCashUp=():boolean=>{
        if(InputAmount == "" ){
            return false
        }
        if(ImageUrlLocal==""){
            return false
        }
        return true
    }
    const getDataCash=():FloatCashType[]=>{
        let data = DataFloatCash
        data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        return data
    }
    const RenderPicture = () => {
        return (
            <View>
                <SelfiePicture
                    onCancel={onCancelSelfie}
                    onRetry={onTakePicture}
                    finish={finishCaptureImage}
                    setImageUrl={setImageUrlLocal}
                    setImage={setImageCash}
                />
            </View>
        )
    }
    const RenderNew = () => {
        return (
            <View>
                <View style={styles.TitleBox}>
                    <Text style={styles.titleList}>New cash up</Text>
                    <TouchableOpacity
                        onPress={() => {
                            onCloseNewCashUp()
                        }}
                        style={{...styles.btnNew, backgroundColor: Colors.brand.red}}
                    >
                        <Text style={styles.btnNewText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
                <View style={{paddingHorizontal: 20}}>
                    <InputTextBox
                        label={"Amount:"}
                        width={"100%"}
                        onChangeText={setInputAmount}
                        value={InputAmount}
                        placeholder={""}
                        keyboardType={"numeric"}
                        boxStyle={{marginTop: 15,marginBottom:10, backgroundColor: Colors.brand.blue}}
                    />

                    <FrameDirectionH iStyles={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: width-40,
                        paddingTop:-20,
                        paddingBottom:-20,
                    }}>
                        <TouchableOpacity
                            style={styles.iconPicture}
                            onPress={() => onTakePicture()}
                        >
                            <Icon name={"camera"} type="material-community" size={30} color={"white"}/>
                        </TouchableOpacity>
                    </FrameDirectionH>


                    <View>
                        {ImageCash ?
                            <View style={styles.preview}>
                                {ImageUrlLocal !== "" &&
                                    <Image source={{uri: ImageUrlLocal}} style={styles.image}/>}
                            </View> :
                            (
                                <Text style={{textAlign:"center"}}>Image not available</Text>

                            )}
                    </View>

                    {canCashUp()&&
                        <FrameDirectionH iStyles={{
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: width-40,
                            paddingTop:20
                        }}>
                        <GenericButton
                            onPress={onSubmitCash}
                            bgColor={Colors.brand.blue}
                            borderColor={Colors.brand.white}
                            width={width-40}
                            label={"Submit"}
                            height={50}
                            borderRadius={5}
                            style={{
                                marginTop: -5,
                                marginLeft: 0,
                            }}
                            labelColor={Colors.brand.white}
                        />
                    </FrameDirectionH>
                    }

                </View>
            </View>
        )
    }
    const renderFlatListItem = ({item}: { item: FloatCashType }) => {
        const innerRec = (display: string, value: any, valStyle?: TextStyle) => {
            return (
                <View style={styles.innerRecBox}>
                    <Text style={styles.innerRecBoxDisp}>{display}:</Text>
                    <Text style={[styles.innerRecBoxVal, valStyle]}>{value}</Text>
                </View>
            )
        }
        return (
            <View style={styles.contributorItem}>
                <View>
                    <Image
                        source={{uri: item.evidence_url}}
                        style={styles.img}
                    />
                </View>
                <View>
                    {innerRec("Cash", "R" + item.reported_amount, {color: Colors.brand.red})}
                    {innerRec("Float", "R" + item.assigned_amount)}
                    {innerRec("Created", formatDate2(item.created_at),{fontSize:12})}
                </View>
            </View>
        )
    }
    const RenderList = () => {

        return (
            <View>
                <View style={styles.TitleBox}>
                    <Text style={styles.titleList}>List cash-up</Text>
                    <TouchableOpacity
                        onPress={() => {
                            onNewCashUp()
                        }}
                        style={styles.btnNew}
                    >
                        <Text style={styles.btnNewText}>+ New</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <FlatList
                        data={getDataCash()}
                        renderItem={renderFlatListItem}
                        keyExtractor={(item) => item.code}
                        style={styles.list}
                    />
                </View>

            </View>
        )
    }
    const RenderSaving = () => {
        return (
            <View>
                <View style={styles.TitleBox}>
                    <Text style={styles.titleList}>Please wait while saving your cash-up....</Text>
                </View>
            </View>
        )
    }
    const SwitchMode = () => {
        switch (mode) {
            case "list":
                return RenderList()
            case "new":
                return RenderNew()
            case "picture":
                return RenderPicture()
            case "saving":
                return RenderSaving()
            default:
                return RenderList()
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                {SwitchMode()}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    iconPicture:{
      backgroundColor:"black",
      width:50,
      height:50,
        borderRadius:25,
      alignItems:"center",
      justifyContent:"center"
    },
    preview: {
        marginTop:10,
        width: width - 20,
        height: width - 20,
    },
    image: {
        width: width - 20,
        height: width - 20,
        resizeMode: 'cover',
        borderRadius: 10,
        marginBottom: 10,
        borderColor: "black"
    },
    innerRecBoxDisp: {
        fontStyle: "italic",
        fontSize: 14,
    },
    innerRecBoxVal: {
        fontSize: 14,
        fontWeight: "bold",
    },
    innerRecBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: width - 20 - 140,
        paddingLeft: 10,
        minHeight: 35,
        borderBottomWidth: 0,
        borderColor: Colors.brand.lightBlue,
        marginLeft: 5,
    },
    img: {
        width: 120,
        height: 120,
        borderRadius: 5,
    },
    list: {
        flexGrow: 0,
    },
    contributorItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    btnNewText: {
        color: Colors.brand.white,
        fontSize: 14,
        fontWeight: "bold"
    },
    btnNew: {
        backgroundColor: Colors.brand.blue,
        width: 110,
        borderRadius: 5,
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 15,
    },
    titleList: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.brand.blue
    },
    TitleBox: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 2,
    },
})
