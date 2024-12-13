export type User2 = {
    code: string,
    email: string,
    given_name: string,
    family_name: string,
    name: string,
    phone_number: string,
    username: string,
    role?: string,
    updated_at: string,
    created_at: string,
    picture: string,
}
export type CompanyType = {
    name: string,
    code: string,
    detail: { [index: string]: any },
    created_at: string,
    status: string,
}
export type DealerType = {
    name: string,
    code: string,
    org?: string,
    detail: { [index: string]: any },
    created_at: string,
    status: string,
    owner?: { name: string, code: string }
}
export type RoleType = {
    Code: string,
    UserCode: string,
    Category: string,
    RefCode: string,
    RefName: string,
    FullName: string,

    Status: string,
    CreatedAt: string,
    UpdatedAt: string,
    CreatedBy: string,
}
export type   PayloadAllocation = {
    org?: string,
    category: string,
    source_id: string,
    destination_id: string,
    source_entity: string,
    destination_entity: string,
    status?: string,
    created_by?: string,
}
export type Allocation = {
    org: string,
    category: string,
    source_id: string,
    destination_id: string,
    source_entity: string,
    destination_entity: string,
    status: string,
    created_by: string,
    created_at: string,
    comment: string,
    details: { [index: string]: any }
}
export type SellerType = {
    org: string;
    code: string;
    name: string;
    email: string;
    phone: string;
    dealer: string;
    subdealer: string;
    supervisor: string;
    bank_ref1: string;
    bank_ref2?: string;
    commission_dealer: number;
    commission_subdealer: number;
    commission_agent: number;
    created_by: string;
    status: string;
};
export type TelkomBundleType = {
    Id: string;
    Network: string;
    ProductId: string;
    ServiceCode: string;
    PackageName: string;
    ServiceDesc: string;
    Amount: number;
    Category: string;
}
export type RechargeResultType = {
    "ApiUrl": string,
    "AppName": string,
    "DealerCode": string,
    "Network": string,
    "Org": string,
    "PhoneNumber": string,
    "ProductId": string,
    "ProductType": string,
    "RechargeReference": string,
    "RequestDateTime": string,
    "ResponseCode": string,
    "ResponseMessage": string,
    "ResponseStatus": string,
    "SaleAmount": number,
    "SellerID": string,
    "ServiceCode": string,
    "ServiceDesc": string,
    "SupervisorCode": string,
    "TransDate": string,
    "TransNumber": string,
    "TransTime": string,
    "TransactionStatus": string,
    "UserCode": string
}
export type RechargeRequestType = {
    "dealer_code": string,
    "network": string,
    "org": string,
    "phone": string,
    "product_type": string,
    "sale_amount": number,
    "seller_id": string,
    "service_code": string,
    "supervisor_code": string,
    "user_code": string
}
export type Transaction = {
    ApiRef: string; // Reference for the API transaction
    AppName: string; // Name of the application
    CreatedDate: string; // Date when the transaction was created (YYYY-MM-DD)
    CreatedTime: string; // Time when the transaction was created (HH:mm:ss)
    DealerCode: string; // Dealer's unique code
    ExtRef: string; // External reference (e.g., phone number)
    Id: string; // Unique identifier for the transaction
    InRef: string; // Internal reference (if any, empty in this case)
    Network: string; // Network provider
    NewBalance: number; // New balance after the transaction
    OldBalance: number; // Old balance before the transaction
    Org: string; // Organization code
    Refs: string | null; // Additional references (nullable)
    SellerCode: string; // Seller's unique code
    SupervisorCode: string; // Supervisor's unique code
    TransAmount: number; // Transaction amount
    TransCat: string; // Transaction category (e.g., sale)
    TransDate: string; // Transaction date (YYYY-MM-DD)
    TransNumber: string; // Unique transaction number
    TransTime: string; // Transaction time (HH:mm:ss)
    TransType: string; // Transaction type (e.g., debit)
    UserCode: string; // User's unique code
};
export type SaleRecord = {
    AppName: string; // Application name
    Org: string; // Organization code
    SellerID: string; // Seller's ID
    UserCode: string; // User's unique code
    TransNumber: string; // Unique transaction number
    TransDate: string; // Transaction date (YYYY-MM-DD)
    TransTime: string; // Transaction time (HH:mm:ss)
    PhoneNumber: string; // Phone number involved in the transaction
    ProductId: string; // Product ID (empty if not applicable)
    ProductType: string; // Type of product (e.g., airtime)
    ServiceCode: string; // Service code
    ServiceDesc: string; // Service description (empty if not applicable)
    SaleAmount: number; // Sale amount
    Network: string; // Network provider
    RequestDateTime: string; // Request date and time (empty if not applicable)
    ApiUrl: string; // API URL (empty if not applicable)
    ResponseCode: string; // Response code (e.g., OK)
    ResponseStatus: string; // Response status (empty if not applicable)
    ResponseMessage: string; // Response message (e.g., SUCCESS)
    TransactionStatus: string; // Status of the transaction (empty if not applicable)
    RechargeReference: string; // Recharge reference code
    DealerCode: string; // Dealer's unique code
    SupervisorCode: string; // Supervisor's unique code
};

export type SuperUserType={
    app_name?:string,
    email:string,
    name:string,
    created_at:string,
    status?:string,
}


