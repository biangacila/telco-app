
import {
    LOGIN_SET,
    LOAD_CONFIG_DATA,
    WORKER_SET,
    CURRENT_WORKER_SET,
    CURRENT_CASE_RECORD_SET,
    ALL_CASE_RECORD_SET
} from "./constant"
export const ReduxSaveLoginInfo = (payload:any) => {
    return {
        type: LOGIN_SET,
        payload
    }
}
export const getLoadConfigDataAction=(payload:any)=>{
    return{
        type: LOAD_CONFIG_DATA,
        payload
    }
}
export const ReduxSaveCurrentWorker=(payload:any)=>{
    return{
        type: CURRENT_WORKER_SET,
        payload
    }
}
export const ReduxSaveCurrentCaseRecord=(payload:any)=>{
    return{
        type: CURRENT_CASE_RECORD_SET,
        payload
    }
}
export const ReduxSaveALLaseRecord=(payload:any)=>{
    return{
        type: ALL_CASE_RECORD_SET,
        payload
    }
}

