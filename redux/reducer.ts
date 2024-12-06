
import {
    ALL_CASE_RECORD_SET,
    CURRENT_CASE_RECORD_SET,
    CURRENT_COMPANY_SET,
    CURRENT_WORKER_SET,
    DASHBOARD_FINANCE_SET,
    LOAD_CONFIG_DATA,
    LOGIN_SET,
    LOGIN_TOKEN,
    LOGIN_WITH_PROVIDER,
    LOGOUT_SET, RECHARGE_AMOUNT_SET,
    RECHARGE_NETWORK_SET,
    RECHARGE_NUMBER_SET, RECHARGE_PRODUCT_SET, RECHARGE_REQUEST_SET, RECHARGE_RESULT_FAIL_SET, RECHARGE_RESULT_SET,
    RECHARGE_TYPE_SET,
    WORKER_SET
} from "./constant";
import {
    initialCompany,
    initialLoginState, initialRechargeRequestType,
    initialRechargeResultType,
    initialTelkomBundleType,
    initialUserInfoType
} from "@/types/type_initialize";
import {loginState, UserInfoType} from "@/types/type_general";
import {FinanceDashboardType, initialFinanceDashboard} from "@/types/type-finance-dashboard";
import {CompanyType, RechargeRequestType, RechargeResultType, TelkomBundleType} from "@/types/type-model";


type defaultStateType={
    login:loginState,
    loginWithProvider:UserInfoType,
    loginType:string,
    loginToken:string,
    dashboardInfo:FinanceDashboardType,
    currentCompany:CompanyType,
    rechargeNetwork:string,
    rechargeType:string,
    rechargeNumber:string,
    rechargeProduct:TelkomBundleType,
    rechargeAmount:number,
    rechargeResult:RechargeResultType,
    rechargeRequest:RechargeRequestType,
    rechargeResultFail:string,
}
let defaultState:defaultStateType={
    login:initialLoginState,
    loginWithProvider:initialUserInfoType,
    loginType:"",
    loginToken:"",
    dashboardInfo:initialFinanceDashboard,
    currentCompany: initialCompany,
    rechargeNetwork:"",
    rechargeType:"",
    rechargeNumber:"",
    rechargeProduct:initialTelkomBundleType,
    rechargeAmount:0,
    rechargeResult: initialRechargeResultType,
    rechargeRequest: initialRechargeRequestType,
    rechargeResultFail:""
}
export default function rootReducer(     state=defaultState ,     {type, payload}: {type: string, payload: any}):any{
    let newState = state;
    switch (type) {
        case LOGIN_SET:
            newState.login = payload as loginState;
            return Object.assign({}, newState);
        case LOGOUT_SET:
            newState.loginType = "";
            newState.loginToken ="";
        case LOGIN_TOKEN:
            newState.loginToken = payload ;
            return Object.assign({}, newState);
        case DASHBOARD_FINANCE_SET:
            newState.dashboardInfo = payload ;
            return Object.assign({}, newState);
        case LOGIN_WITH_PROVIDER:
            newState.loginWithProvider = payload as UserInfoType;
            newState.loginType = "provider";
            return Object.assign({}, newState);
        case CURRENT_COMPANY_SET:
            newState.currentCompany = payload as CompanyType;
            return Object.assign({}, newState);
        case RECHARGE_NETWORK_SET:
            newState.rechargeNetwork = payload ;
            return Object.assign({}, newState);
        case RECHARGE_TYPE_SET:
            newState.rechargeType= payload ;
            return Object.assign({}, newState);
        case RECHARGE_NUMBER_SET :
            newState.rechargeNumber = payload ;
            return Object.assign({}, newState);
        case RECHARGE_AMOUNT_SET:
            newState.rechargeAmount = payload
            return Object.assign({}, newState);
        case RECHARGE_PRODUCT_SET:
            newState.rechargeProduct = payload as TelkomBundleType;
            return Object.assign({}, newState);
        case RECHARGE_RESULT_SET:
            newState.rechargeResult = payload as RechargeResultType;
            return Object.assign({}, newState);
        case RECHARGE_REQUEST_SET:
            newState.rechargeRequest = payload as RechargeRequestType;
            return Object.assign({}, newState);
        case RECHARGE_RESULT_FAIL_SET:
            newState.rechargeResultFail = payload ;
            return Object.assign({}, newState);

    }
    return state
}
export {
    defaultStateType
}
