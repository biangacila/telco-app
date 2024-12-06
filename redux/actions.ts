
import {
    LOGIN_SET,
    LOAD_CONFIG_DATA,
    WORKER_SET,
    CURRENT_WORKER_SET,
    CURRENT_CASE_RECORD_SET,
    ALL_CASE_RECORD_SET,
    LOGIN_WITH_PROVIDER,
    LOGIN_TOKEN,
    LOGOUT_SET,
    DASHBOARD_FINANCE_SET,
    CURRENT_COMPANY_SET,
    RECHARGE_NETWORK_SET,
    RECHARGE_TYPE_SET,
    RECHARGE_NUMBER_SET,
    RECHARGE_AMOUNT_SET,
    RECHARGE_PRODUCT_SET,
    RECHARGE_RESULT_SET, RECHARGE_REQUEST_SET, RECHARGE_RESULT_FAIL_SET
} from "./constant"
import {RechargeResultType} from "@/types/type-model";

export const ReduxSetRechargeRequest=(payload:any)=>{
    return{
        type:RECHARGE_REQUEST_SET,
        payload
    }
}
export const ReduxSetRechargeResult=(payload:any)=>{
    return{
        type:RECHARGE_RESULT_SET,
        payload
    }
}
export const ReduxSetRechargeResultFail=(payload:any)=>{
    return{
        type:RECHARGE_RESULT_FAIL_SET,
        payload
    }
}
export const ReduxSetRechargeProduct=(payload:any)=>{
    return{
        type:RECHARGE_PRODUCT_SET,
        payload
    }
}
export const ReduxSetRechargeAmount=(payload:any)=>{
    return{
        type:RECHARGE_AMOUNT_SET,
        payload
    }
}
export const ReduxSetRechargeNetwork=(payload:any)=>{
    return{
        type:RECHARGE_NETWORK_SET,
        payload
    }
}
export const ReduxSetRechargeType=(payload:any)=>{
    return{
        type:RECHARGE_TYPE_SET,
        payload
    }
}
export const ReduxSetRechargeNumber=(payload:any)=>{
    return{
        type:RECHARGE_NUMBER_SET ,
        payload
    }
}
export const ReduxSetDashboardFinance=(payload:any)=>{
    return{
        type:DASHBOARD_FINANCE_SET,
        payload
    }
}
export const ReduxSetLogout=(payload:any)=>{
    return{
        type:LOGOUT_SET,
        payload
    }
}
export const ReduxSetLoginToken=(payload :any)=>{
    return{
        type:LOGIN_TOKEN,
        payload,
    }
}
export const ReduxSetLoginWithProvider=(payload :any)=>{
    return{
        type:LOGIN_WITH_PROVIDER,
        payload,
    }
}
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

export const ReduxSetCurrentCompany=(payload:any)=>{
    return{
        type: CURRENT_COMPANY_SET,
        payload
    }
}


