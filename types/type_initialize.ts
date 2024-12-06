import {loginState, User, UserInfoType} from "@/types/type_general";
import {
    CompanyType,
    DealerType,
    RechargeRequestType,
    RechargeResultType,
    SellerType,
    TelkomBundleType,
    User2
} from "@/types/type-model";

export const initialRechargeRequestType:RechargeRequestType={
    "dealer_code": "",
    "network": "",
    "org": "",
    "phone": "",
    "product_type": "",
    "sale_amount": 0,
    "seller_id": "",
    "service_code": "",
    "supervisor_code": "",
    "user_code": ""
}
export const initialRechargeResultType:RechargeResultType={
    "ApiUrl": "",
    "AppName": "",
    "DealerCode": "",
    "Network": "",
    "Org": "",
    "PhoneNumber": "",
    "ProductId": "",
    "ProductType": "",
    "RechargeReference": "",
    "RequestDateTime": "",
    "ResponseCode": "",
    "ResponseMessage": "",
    "ResponseStatus": "",
    "SaleAmount": 0,
    "SellerID": "",
    "ServiceCode": "",
    "ServiceDesc": "",
    "SupervisorCode": "",
    "TransDate": "",
    "TransNumber": "",
    "TransTime": "",
    "TransactionStatus": "",
    "UserCode": ""
}
export const initialSellerType:SellerType={

        org: "",
        code: "",
        name: "",
        email: "",
        phone: "",
        dealer: "",
        subdealer: "",
        supervisor: "",
        bank_ref1: "",
        bank_ref2: "",
        commission_dealer: 0,
        commission_subdealer: 0,
        commission_agent: 0,
        created_by: "",
        status: "",

}
export const initialTelkomBundleType:TelkomBundleType={
    Id          : "",
    Network     : "",
    ProductId   : "",
    ServiceCode : "",
    PackageName : "",
    ServiceDesc : "",
    Amount      :0,
    Category    : "",
}
export const initialUserInfoType:UserInfoType={
    email:"",
    name:"",
    given_name:"",
    family_name:"",
    code:"",
    picture:"",
}
export const initializeUser: User = {
    Code: "",
    Email: "" ,
    Name: "",
    Surname: "",
    Phone: "",
    Username: "",
    Password: "",
    Org: "",
    Role: "",
    Picture:""
}

export const initialLoginState:loginState={
    hasLogin: false,
    token: "",
    expiredAt: "",
    user: initializeUser,
}
export const initialUser2: User2 = {
    code: "",
    email: "",
    name: "",
    surname: "",
    phone: "",
    username: "",
    timestamp: "",
    role: "",
}

export const initialDealerType:DealerType = {
    code:"",
    name:"",
    created_at:"",
    detail:{},
    status:""
}
export const initialCompany:CompanyType= {
    "code": "BT8001",
    "name": "Biacibenga Solutions",
    "detail": {
        "Email": "info@biacibenga.com",
        "Phone number": "27684011702"
    },
    "created_at": "2024-11-04 16:00:40",
    "status": "active"
}
