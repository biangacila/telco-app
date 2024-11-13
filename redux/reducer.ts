
import {
    ALL_CASE_RECORD_SET,
    CURRENT_CASE_RECORD_SET, CURRENT_COMPANY_SET,
    CURRENT_WORKER_SET, DASHBOARD_FINANCE_SET,
    LOAD_CONFIG_DATA,
    LOGIN_SET, LOGIN_TOKEN, LOGIN_WITH_PROVIDER, LOGOUT_SET,
    WORKER_SET
} from "./constant";
import {initialCompany, initialLoginState, initialUserInfoType} from "@/types/type_initialize";
import {loginState, UserInfoType} from "@/types/type_general";
import {FinanceDashboardType, initialFinanceDashboard} from "@/types/type-finance-dashboard";
import {CompanyType} from "@/types/type-model";


type defaultStateType={
    login:loginState,
    loginWithProvider:UserInfoType,
    loginType:string,
    loginToken:string,
    dashboardInfo:FinanceDashboardType,
    currentCompany:CompanyType,
}
let defaultState:defaultStateType={
    login:initialLoginState,
    loginWithProvider:initialUserInfoType,
    loginType:"",
    loginToken:"",
    dashboardInfo:initialFinanceDashboard,
    currentCompany: initialCompany,
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

    }
    return state
}
export {
    defaultStateType
}
