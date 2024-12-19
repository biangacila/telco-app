import * as Location from "expo-location";
import {_base64ToArrayBuffer} from "@/services/functions";
import axios from "axios";
import {dropboxConfig} from "@/config/dropbox-config";
import {Alert} from "react-native";
import * as FileSystem from 'expo-file-system';



export const savePictureToDropBox=async (image:any,feedback:any)=>{
    // Convert the image to base64
    console.log("FF> ",2,"a")
    console.log("Image URI:", image);
    let base64 = "";
    try{
         base64 = await FileSystem.readAsStringAsync(image, {
            encoding: FileSystem.EncodingType.Base64,
        });
        console.log("Base64 conversion successful");
    }catch (err:any) {
        console.error("Error converting image to Base64:", JSON.stringify(err));
        feedback(null,{error: "Error converting image to Base64:"+ JSON.stringify(err)});
        return; // Exit early if conversion fails
    }

    console.log("FF> ",3)
    await uploadToDropbox(base64,async (url:string)=>{
        console.log("THIS IS THE URL AFTER SAVING TO DROP BOX> ",url);
        /**
         * let get our geolocation
         */
        let lat:number = 0
        let lng:number = 0
        let address  =""
        try {
            let location = await Location.getCurrentPositionAsync({});
            lat = location.coords.latitude;
            lng = location.coords.longitude;

            // Reverse geocode to get the address
            let reverseGeocode = await Location.reverseGeocodeAsync({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
            const formattedAddress = `${reverseGeocode[0].street}, ${reverseGeocode[0].city}, ${reverseGeocode[0].region}`;
            address = reverseGeocode[0].formattedAddress||formattedAddress;
            console.log("KKKKKK---> ",reverseGeocode[0])
        }catch (e){
            console.log("ERROR LOCATION > ",e)
        }
        /**
         * let send to backend
         */
        let payload={
            url:url,
            lat,
            lng,
            address,
            error:null,
        }
        feedback(payload,null)
    })
}

const uploadToDropbox = async (base64Data: string,feedback:any) => {
    let base64Image = 'data:image/png;base64,'+base64Data
    let imageData = _base64ToArrayBuffer(base64Image);
    console.log("FF> ",5)
    try {
        const dropboxResponse = await axios.post(
            'https://content.dropboxapi.com/2/files/upload',
            imageData,
            {
                headers: {
                    Authorization: `Bearer ${dropboxConfig.DROPBOX_TOKEN}`,
                    'Dropbox-API-Arg': JSON.stringify({
                        path: `/applications/easit/attendant/${Date.now()}.png`,
                        mode: 'add',
                        autorename: true,
                        mute: false,
                    }),
                    'Content-Type': 'application/octet-stream',
                },
            }
        );

        console.log("2 :::ZZZZZZZ---> ",dropboxResponse.data)
        let rev = dropboxResponse.data.rev
        const downloadUrl = "https://cloudcalls.easipath.com/backend-pmis/api/files/download/"+rev
        feedback(downloadUrl)
    } catch (error) {
        console.error('Error uploading to Dropbox:', error);
        Alert.alert('Upload Failed', 'Could not upload image. Please try again.');
        let defaultImage = "https://c8.alamy.com/comp/F6T8NM/south-african-rand-notes-photographed-against-a-white-background-F6T8NM.jpg"
        feedback(defaultImage)
    } finally {
        //setIsUploading(false);
    }
};
