import {handleApiError} from "@/redux/utils";
import {PostToGoAny} from "@/services/service-http-post";
import {getLoadConfigDataAction, ReduxSaveALLaseRecord, ReduxSaveCurrentCaseRecord} from "@/redux/actions";
import store from "../redux/store"
import {CaseRecord} from "@/types/type-models";
import {sortDataByDate} from "@/services/service-common";

export const updateCurrentCaseStoreAfterChange=async (dispatch:any)=>{
    try {
        let state  = store.getState().core
        let currCase = state.currentCaseRecord;
        for(let i in state.allCase){
            let record = state.allCase[i];
            if(record.Code===currCase.Code){
                currCase = record
            }
        }
        dispatch(ReduxSaveCurrentCaseRecord(currCase))
    }catch(e){
        console.log("updateCurrentCaseStoreAfterChange error > ", e);
    }
}
export const getAllCaseRecordFetch=async (dispatch:any)=>{
    try {
        let state  = store.getState().core
        let org  = state.currentWorker.Org
        let project = state.currentWorker.Project
        let endpoint=`/crud/CaseRecord/list`;
        let postData= {
            Org:org,
            conditions: {"Org": org, "Project": project}
        }
        let res = await  PostToGoAny(endpoint,postData)
        let data = extractApiDataArrayCrud(res.data.RESULT ) as CaseRecord[]
        let sortedCases = sortDataByDate(data,"CreatedDate") as CaseRecord[]
        await dispatch(ReduxSaveALLaseRecord(sortedCases))

        await updateCurrentCaseStoreAfterChange(dispatch)
    }catch (e) {
        return handleApiError(e);
    }
}
export const getLoadConfigDataFetch=async (dispatch:any)=>{
    try {
        let endpoint = "core/config/load-db"
        let postData={}
        let res = await  PostToGoAny(endpoint,postData)
        await dispatch(getLoadConfigDataAction(extractApiDataArray(res.data.RESULT )))
        return extractApiDataArray(res.data.RESULT );
    }catch (e) {
        return handleApiError(e);
    }
}

export const extractApiDataArrayCrud=(res:any):any=>{
    let data= res as {error:any,Data:any}
    if(data.Data===null){
        data.Data = []
    }
    return   data.Data
}
export const extractApiDataArray=(res:any):any=>{
    let data= res as {error:any,data:any}
    if(data.data===null){
        data.data = []
    }
    return   data.data
}