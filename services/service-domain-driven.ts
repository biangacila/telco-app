import axios from "axios";
import {SERVER_HOST} from "@/config/server-connection";
import store from "@/redux/store";

const getTokenFromStore=():string=>{
    let state = store.getState().core
    return state.login.token
}
export const includeToken=()=>{
    let token = store.getState().core.login.token
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

export const FetchDataFromDomainDrivenGet=(backend_server:string,endpoint:string) => {
    includeToken()
    let postUrl = `${backend_server}${endpoint}`;
    return axios.get(postUrl);
}
