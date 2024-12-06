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
    "ResponseMessage":string,
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
export type RechargeRequestType={
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
