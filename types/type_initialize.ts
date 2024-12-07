import {loginState, User, UserInfoType} from "@/types/type_general";
import {
    CompanyType,
    DealerType,
    RechargeRequestType,
    RechargeResultType, SaleRecord,
    SellerType,
    TelkomBundleType, Transaction,
    User2
} from "@/types/type-model";
export const  initialTransaction:Transaction = {
    ApiRef:  "", // Reference for the API transaction
    AppName:  "", // Name of the application
    CreatedDate:  "", // Date when the transaction was created (YYYY-MM-DD)
    CreatedTime:  "", // Time when the transaction was created (HH:mm:ss)
    DealerCode:  "", // Dealer's unique code
    ExtRef:  "", // External reference (e.g., phone number)
    Id:  "", // Unique identifier for the transaction
    InRef:  "", // Internal reference (if any, empty in this case)
    Network:  "", // Network provider
    NewBalance:  0, // New balance after the transaction
    OldBalance: 0, // Old balance before the transaction
    Org:  "", // Organization code
    Refs:  "" , // Additional references (nullable)
    SellerCode:  "", // Seller's unique code
    SupervisorCode:  "", // Supervisor's unique code
    TransAmount: 0,// Transaction amount
    TransCat:  "", // Transaction category (e.g., sale)
    TransDate:  "", // Transaction date (YYYY-MM-DD)
    TransNumber:  "", // Unique transaction number
    TransTime:  "", // Transaction time (HH:mm:ss)
    TransType:  "", // Transaction type (e.g., debit)
    UserCode:  "", // User's unique code
};
export const initialSaleRecord:SaleRecord={
    AppName: "",
    Org: "",
    SellerID: "",
    UserCode: "",
    TransNumber: "",
    TransDate: "",
    TransTime: "",
    PhoneNumber: "",
    ProductId: "",
    ProductType: "",
    ServiceCode: "",
    ServiceDesc: "",
    SaleAmount: 2,
    Network: "",
    RequestDateTime: "",
    ApiUrl: "",
    ResponseCode: "",
    ResponseStatus: "",
    ResponseMessage: "",
    TransactionStatus: "",
    RechargeReference: "",
    DealerCode: "",
    SupervisorCode: "",
}
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
