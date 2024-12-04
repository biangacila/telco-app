import axios from "axios";
import {SERVER_HOST} from "@/config/server-connection";
import store from "@/redux/store";

const getTokenFromStore=():string=>{
    let state = store.getState().core
    return state.loginToken
}
export const includeToken=()=>{
    let token = store.getState().core.loginToken
    console.log("(:--->LOGIN TOKEN IS HERE> ",token!=="",token)
    if (token!=="") {

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
}


export const FetchDataFromDomainDrivenPost = async (payload: any, backend: string, endpoint: string) => {
    try {
        includeToken(); // Assuming this sets up token in axios defaults or headers
        const postUrl = `${backend}${endpoint}`;

        // Log the request to check the URL and payload
        console.log("Sending POST request to:", postUrl);
        console.log("Payload:", payload);

        const response = await axios.post(postUrl, payload);

        // Log the response to ensure it's returning as expected
        console.log("Response received:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error in POST request:", error);

        // Handle the error based on your requirements
        if (axios.isAxiosError(error)) {
            console.error("Axios error response:", error.response?.data);
        }
        throw error; // Re-throw to handle higher up if necessary
    }
};

export const FetchDataFromDomainDrivenGet=async (backend_server:string,endpoint:string) => {
    let token = store.getState().core.loginToken
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    try{
        let postUrl = `${backend_server}${endpoint}`;
        //console.log("GEt url is> ",postUrl)
        let response  = await  axios.get(postUrl);
        // Log the response to ensure it's returning as expected
        //console.log("Response received:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error in GET request:", error);

        // Handle the error based on your requirements
        if (axios.isAxiosError(error)) {
            console.error("Axios error response:", error.response?.data);
        }
        throw error; // Re-throw to handle higher up if necessary
    }

}
