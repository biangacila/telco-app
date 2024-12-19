import {NameEntry, ShareReceiptType} from "@/types/type_general";
import {
    FetchDataFromDomainDrivenGet, FetchDataFromDomainDrivenGetWithError,
    FetchDataFromDomainDrivenPost,
    FetchDataFromDomainDrivenPostWithError
} from "@/services/service-domain-driven";
import {SERVER_AUTH_SERVICE, SERVER_TELCO_CORE, SERVER_TELCO_FINANCE} from "@/config/server-connection";
import {
    Allocation,
    CompanyType,
    DealerType,
    PayloadAllocation,
    SellerType, SuperUserType,
    Transaction,
    User2
} from "@/types/type-model";
import store from "../redux/store"
import {initialSellerType, initialUser2} from "@/types/type_initialize";
import moment from "moment";
import {Linking} from "react-native"
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import {superUserList} from "@/config/super_user_list";
import Base64 from "./Base64";

export function _base64ToArrayBuffer(base64:string) {
    base64 = base64.split('data:image/png;base64,').join('');
    let binary_string = Base64.atob(base64),
        len = binary_string.length,
        bytes = new Uint8Array(len),
        i;

    for (i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}
export const IsInSuperUserList=(username:string,data:SuperUserType[]):boolean=>{
    for(let i in data){
        let item =data[i]
        if(item.email===username){
            return true
        }
    }
    return false
}
export const ShareReceipt=async (info:ShareReceiptType): Promise<void> => {
    try {
        // Receipt content
        const receiptText = `
Telco Receipt
---------------
Receiver: ${info.Receiver}
Amount incl.Vat: R${info.Amount}
Time: ${info.Time}
Date: ${info.Date}
Category: ${info.Category}
Agent: ${info.Agent}
Ref: ${info.NetworkRef}
Network: ${info.Network} \n

For any query call customer service at 0802589632 with reference: ${info.NetworkRef}\n
            `;
        // Create WhatsApp URL
        const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(receiptText)}`;

        // Open WhatsApp
        const canOpen = await Linking.canOpenURL(whatsappUrl);
        if (canOpen) {
            await Linking.openURL(whatsappUrl);
        } else {
            alert('WhatsApp is not installed on this device.');
        }


        /*// Save receipt content to a file
        const fileUri = FileSystem.documentDirectory + 'receipt.txt';
        await FileSystem.writeAsStringAsync(fileUri, receiptData, {
            encoding: FileSystem.EncodingType.UTF8,
        });

        // Check if sharing is available
        if (await Sharing.isAvailableAsync()) {
            await Sharing.shareAsync(fileUri, {
                mimeType: 'text/plain',
                dialogTitle: 'Share Receipt',
            });
        } else {
            alert('Sharing is not available on this device.');
        }*/
    } catch (error) {
        console.error('Error sharing receipt:', error);
        alert('Failed to share receipt.');
    }
}
export function sortTransactionsByDateTime(list: Transaction[] ): Transaction[]  {
    if(!list){
        return list;
    }
    return  list.sort((a, b) => {
        const dateTimeA = new Date(`${a.TransDate}T${a.TransTime}`);
        const dateTimeB = new Date(`${b.TransDate}T${b.TransTime}`);
        return dateTimeB.getTime() - dateTimeA.getTime(); // Descending order
    }) ;
}
export const getAllTransactionTotalAmount=(data:Transaction[]):string=>{
    let tot:number = 0;
    for(let i in data){
        let row = data[i]
        tot+=row.TransAmount
    }
    return formatNumberToTwoDecimalPlaces(tot)
}
export const loadTransactionHistoryData = async (userCode:string,periodStart:string,periodEnd:string,category:string,feedbackFunction:any) => {
    let endpoint = `/transactions/get/history/user/${userCode}/${periodStart}/${periodEnd}/${category}`
    let req = await FetchDataFromDomainDrivenGet(SERVER_TELCO_FINANCE, endpoint)
    let data = req.records as Transaction[]
    feedbackFunction(data)
}
export const formatDate1=(dateIn:string):string=>{
    return moment(dateIn).format("MMM DD, YY");
}
export const formatDate2=(dateIn:string):string=>{
    return moment(dateIn).format("DD-MMM HH:mm");
}
export function getDateRange(selection: "Day" | "Week" | "Month"): { From: string; To: string } {
    const today = new Date();
    const result = { From: "", To: "" };

    if (selection === "Day") {
        const dateString = today.toISOString().split("T")[0]; // Format: YYYY-MM-DD
        result.From = dateString;
        result.To = dateString;
    } else if (selection === "Week") {
        // Calculate the start and end of the current week (Monday to Sunday)
        const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
        const startOfWeek = new Date(today);
        const endOfWeek = new Date(today);

        // Adjust to get Monday (start of the week)
        startOfWeek.setDate(today.getDate() - ((dayOfWeek + 6) % 7)); // If Sunday, moves to previous Monday
        // Adjust to get Sunday (end of the week)
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        result.From = startOfWeek.toISOString().split("T")[0]; // Format: YYYY-MM-DD
        result.To = endOfWeek.toISOString().split("T")[0];
    } else if (selection === "Month") {
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Last day of the current month

        result.From = `${startOfMonth.getFullYear()}-${String(startOfMonth.getMonth() + 1).padStart(2, "0")}-${String(startOfMonth.getDate()).padStart(2, "0")}`;
        result.To = `${endOfMonth.getFullYear()}-${String(endOfMonth.getMonth() + 1).padStart(2, "0")}-${String(endOfMonth.getDate()).padStart(2, "0")}`;

    }

    return result;
}




export function formatNumberToTwoDecimalPlaces(num: number): string {
    return num.toFixed(2);
}
export function getTransactionDateTime(transactionNumber: string): { date: string; time: string } {
    // Split the transaction number to extract the last part (timestamp)
    const parts = transactionNumber.split("-");
    const timestampStr = parts[parts.length - 1];

    // Convert the timestamp string to a number
    const timestamp = parseInt(timestampStr, 10);

    // Create a Date object from the timestamp (assuming it's in seconds, adjust for milliseconds if needed)
    const transactionDate = new Date(timestamp * 1000);

    // Format the date to YYYY-MM-DD
    const year = transactionDate.getFullYear();
    const month = String(transactionDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(transactionDate.getDate()).padStart(2, '0');
    const date = `${year}-${month}-${day}`;

    // Format the time to HH:mm:ss
    const hours = String(transactionDate.getHours()).padStart(2, '0');
    const minutes = String(transactionDate.getMinutes()).padStart(2, '0');
    const seconds = String(transactionDate.getSeconds()).padStart(2, '0');
    const time = `${hours}:${minutes}:${seconds}`;

    return { date, time };
}
export const findUserSellerConfig=(userCode:string,data:SellerType[]):SellerType=>{
    let config:SellerType = initialSellerType
    for(let key in data){
        let row = data[key];
        if(row.code===userCode){
            config = row
        }
    }
    return config
}
export const RequestRechargeMapsNetwork=(inValue:string):string=>{
    if(inValue==="Telkom SA"){
        return "telkom"
    }
    return inValue
}
export function formatToTenDigits(phone: string): string {
    // Remove non-digit characters from the input
    const cleanedPhone = phone.replace(/\D/g, '');

    // Check if the cleaned phone number is 9 digits
    if (cleanedPhone.length === 9) {
        return '0' + cleanedPhone; // Add a leading zero to make it 10 digits
    } else if (cleanedPhone.length === 10) {
        return cleanedPhone; // Already 10 digits, return as is
    }

    return phone // Handle invalid input
}


export function isValidPhoneNumber(phone: string): boolean {
    // Remove non-digit characters from the input
    const cleanedPhone = phone.replace(/\D/g, '');

    // Check if the cleaned phone number is 9 or 10 digits long
    return /^[0-9]{9,10}$/.test(cleanedPhone);
}
export  const isInAllocationAsOther2=(row:DealerType,keyDetail:string,valueDetail:string):boolean=>{
    if( typeof row.detail[keyDetail] !== "undefined" ){
        if(row.detail[keyDetail]===valueDetail){
            return true;
        }
    }
    return false
}
export  const isInAllocationAsOther=(sourceId:string,destinationId:string,allocations:Allocation[]):boolean=>{
    let ok = false
    for(let i in allocations){
        let row  = allocations[i];
        let str = JSON.stringify(row);
        if(str.indexOf(sourceId) !== -1 && str.indexOf(destinationId) !== -1){
            console.log(`3 LL> ${sourceId} In ${destinationId} | Found OK  `);
            return true
        }
        /*console.log(`2 LL> ${sourceId} == ${row.source_id} && >  ${row.destination_id}==${destinationId}`);
        if(row.source_id==sourceId&&row.destination_id==destinationId){
            ok=true
        }*/
    }
    //console.log(`3 LL> ${sourceId} In ${destinationId}: ${ok}   `);
    return ok
}
export  const isInAllocationAsDealer=(keyIn:string,allocations:Allocation[]):boolean=>{
    //console.log(`2 LL> ${keyIn} : ${JSON.stringify(allocations)} >  `);
    let ok = false
    for(let i in allocations){
        let row  = allocations[i];
        if(row.source_id==keyIn){
            ok=true
        }
    }
    return ok
}
export const loadCompanies = async (setDataCompanies:any) => {
    let endpoint = `/companies/get/all`
    let result = await FetchDataFromDomainDrivenGet(SERVER_TELCO_CORE,endpoint)
    let data = result.results as CompanyType[]
    setDataCompanies(data)
}
export const FindSuperUsers=async(feedback:any): Promise<SuperUserType[]>=> {
    let ls:SuperUserType[] = [];
    let endpoint = "/superusers/list/active" ;
    let res = await FetchDataFromDomainDrivenGetWithError(SERVER_TELCO_CORE,endpoint)
    if(res.status=="success"){
        ls  = res.data.results as SuperUserType[];
    }
    feedback(ls)
    return ls;
}
export const FindUserInfo =async (email:string,feedback:any) :Promise<any>=> {
    let targetEmail = email.trim().toLowerCase();
    let endpoint = "/users/exist" ;
    let payload={
        username: targetEmail,
    }
    let foundedUser:User2 = initialUser2
    let boo = false

    let result = await FetchDataFromDomainDrivenPost(payload,SERVER_AUTH_SERVICE,endpoint)
    if( result.user === undefined){
        feedback(foundedUser,boo)
        return{
            user:foundedUser,
            ok:boo
        }
    }
    let user  = result.user as User2
    if(user.name!==""){
        foundedUser = user
        boo = true
    }

    feedback(foundedUser,boo)
    return{
        user:foundedUser,
        ok:boo
    }
}
export function getFirstPart(name: string): string {
    return name.split(" ")[0];
}
export   const buildDataNameEntry=(data:any[],name:string,code:string,status:string,owner?:{full_name:string,user_code:string}):NameEntry[]=>{
    let ls:NameEntry[]=[];
    for(let i in data){
        let row = data[i]
        let rec = row as {[index:string]:any}
        let owner = "";
        if(typeof rec.owner!=='undefined'){
            owner = rec.owner.full_name;
        }
        ls.push({
            code: rec[code],
            name:rec[name],
            status:rec[status],
            owner:owner,
            avatar:"",
        })
    }
    return ls
}

export const SubmitAllocation = async (payload:PayloadAllocation) => {
    let state = store.getState().core;
    let org = state.currentCompany.code;
    const uInfo = state.loginWithProvider;
    let payload2 = {
        ...payload,
        org: org,
        status: "active",
        created_by: `${uInfo.code}<${uInfo.name}>`
    }
    let endpoint = `/allocations`
    return FetchDataFromDomainDrivenPost(payload2, SERVER_TELCO_CORE, endpoint)
}
