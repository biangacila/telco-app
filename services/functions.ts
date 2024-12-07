import {NameEntry} from "@/types/type_general";
import {FetchDataFromDomainDrivenGet, FetchDataFromDomainDrivenPost} from "@/services/service-domain-driven";
import {SERVER_AUTH_SERVICE, SERVER_TELCO_CORE} from "@/config/server-connection";
import {Allocation, CompanyType, DealerType, PayloadAllocation, SellerType, User2} from "@/types/type-model";
import store from "../redux/store"
import {initialSellerType, initialUser2} from "@/types/type_initialize";
import moment from "moment";

export const formatDate1=(dateIn:string):string=>{
    return moment(dateIn).format("DD-MMM-YYYY");
}
export function getDateRange(selection: "Day" | "Week" | "Month"): { From: string; To: string } {
    const today = new Date();
    const result = { From: "", To: "" };

    if (selection === "Day") {
        const dateString = today.toISOString().split("T")[0]; // Format: YYYY-MM-DD
        result.From = dateString;
        result.To = dateString;
    } else if (selection === "Week") {
        // Calculate the start and end of the current week
        const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - dayOfWeek); // Start of the week (Sunday)

        const endOfWeek = new Date(today);
        endOfWeek.setDate(today.getDate() + (6 - dayOfWeek)); // End of the week (Saturday)

        result.From = startOfWeek.toISOString().split("T")[0]; // Format: YYYY-MM-DD
        result.To = endOfWeek.toISOString().split("T")[0];
    } else if (selection === "Month") {
        // Calculate the start and end of the current month
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Last day of the month

        result.From = startOfMonth.toISOString().split("T")[0]; // Format: YYYY-MM-DD
        result.To = endOfMonth.toISOString().split("T")[0];
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
    console.log("::::::::loadCompanies > ",data)
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
        console.log("am response undefined> ",result)
        feedback(foundedUser,boo)
        return{
            user:foundedUser,
            ok:boo
        }
    }
    let user  = result.user as User2
    console.log(":::>onFindUserInfo>Response > ",result)
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
            console.log("Owner >>>>> ",rec.owner)
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
