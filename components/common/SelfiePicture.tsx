import {useEffect, useState} from "react";
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import {Image} from "react-native"
import {ReduxSetTakenPicture} from "@/redux/actions";
import {useDispatch} from "react-redux";
import * as Location from "expo-location";
import axios from "axios";
import {_base64ToArrayBuffer} from "@/services/functions";
import {dropboxConfig} from "@/config/dropbox-config";
import {Alert, Dimensions, StyleSheet, View} from "react-native";
import GenericButton from "@/components/FormInputs/GenericButton";
import {Colors} from "@/constants/Colors";
import StageButton from "@/components/common/StageButton";

type Props={
    onCancel:any,
    onRetry:any,
    setImage:any,
    setImageUrl:any,
    finish:any,
}
const {width, height} = Dimensions.get("screen")
export default (props: Props) => {
    const [image, setImage] = useState<any>(null);
    const [imageUrl,setImageUrl]=useState("")
    const [hasPermission, setHasPermission] = useState<any>(null);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [processingPicture, setProcessingPicture] = useState<any>(false);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            console.log("selfie status @@@@@@@-> ",status);
            setHasPermission(status === 'granted');

        })();
    }, []);

    useEffect(() => {
        if(!processingPicture){
            setProcessingPicture(true);
            onTakePicture().then(()=>{
                console.log(">> onTakePicture finish> ",image)
            })
        }
    }, []);

    const onTakePicture = async () => {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: false,
            /*aspect: [4, 3],*/
            quality: 1,
            base64: false, // We will convert to base64 manually
            cameraType:ImagePicker.CameraType.front
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setImage(uri);
            // Log the URI and dimensions
            console.log('Captured Image URI:', uri);
            props.setImageUrl(uri)
            setImageUrl(uri)
            // Get the dimensions of the image
            Image.getSize(uri, (width, height) => {
                console.log('Image dimensions:', { width, height });
            }, (error) => {
                console.error('Error getting image dimensions:', error);
            });

            props.setImage(Image)
            props.finish()

        }
    }

    const onRetry=()=>{
        setImage(null)
        setProcessingPicture(false)
        props.onRetry()
        onTakePicture().then(null)
    }
    const saveContinue=()=>{
        props.setImage(image)
        props.setImageUrl(imageUrl)
        props.finish()
    }

    return(
        <View style={{width}}>
            <View style={styles.preview}>
                {image && <Image source={{ uri: image }} style={styles.image} />}
            </View>
            <View style={styles.buttonContainer2}>

                <GenericButton
                    onPress={()=>onRetry()}
                    width={width / 2 - 40}
                    height={50}
                    labelColor={Colors.brand.red}
                    bgColor={Colors.brand.white}
                    borderColor={Colors.brand.lightRed}
                    borderRadius={5}
                    label={"RE-TRY"}
                    borderWidth={1}
                />
                <StageButton
                    label={"SAVE & PROCESS"}
                    onPress={()=>saveContinue}
                    bgColor={Colors.brand2.green}
                    labelColor={Colors.brand.white}
                    width={(width/2) - 40}
                    borderColor={Colors.brand.black}
                    minHeight={50}
                />
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    buttonContainer2: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: width-40,
        marginVertical: 10,
        marginHorizontal: 20,
    },
    preview: {
        width: width,
        height: height/1.5,
    },
    camera: {
        width: '100%',
        height: '50%',
    },
    image: {
        width: width,
        height: height/1.5,
        resizeMode: 'cover',
        borderRadius: 10,
        marginBottom: 10,
        borderColor:"black"
    },
})
