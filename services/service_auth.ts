import {ApiResponse, LoginFeedbackResponse} from "@/types/type_general";
import axios from "axios";
import {SERVER_HOST_AUTH} from "@/config/server-api";


export const DiscoverAuthLoginFromGoogleToken=async (username:string,token:string):Promise<any>=>{
    let endpoint  = "auth/discover-auth/google";
    let postData={
        Username: username,
        Token: token,
    }
    try{
        let resp = await  PostToGoAny(endpoint,postData)
        let infoFeedback = ExtractLoginResponse(resp)
        console.log("SubmitRegisterAccount > ",infoFeedback)
        return infoFeedback
    }catch (e) {
        return {status:"fail"}
    }
}

export const ExtractLoginResponse=(data:any):LoginFeedbackResponse=>{
    let response:ApiResponse =data as ApiResponse;
    let logInfo = response.data.RESULT as LoginFeedbackResponse;
    return logInfo

}

export const PostToGoAny=(endpoint:string,data:any,backendUrl?:string)=>{
    //includeToken()
    let url  = SERVER_HOST_AUTH;
    if(backendUrl){
        url = backendUrl
    }
    url = `${url}/${endpoint}`
    return axios.post(url, data);
}