
export type User2 = {
    code: string,
    email: string,
    given_name: string,
    family_name: string,
    name:string,
    phone_number: string,
    username: string,
    role?: string,
    updated_at:string,
    created_at:string,
    picture:string,
}
export type CompanyType ={
    name: string,
    code: string,
    detail:{[index:string]: any},
    created_at:string,
    status:string,
}
export type DealerType ={
    name: string,
    code: string,
    detail:{[index:string]: any},
    created_at:string,
    status:string,
    owner?:{name:string,code:string}
}

export type   PayloadAllocation = {
    org?: string,
    category:string,
    source_id: string,
    destination_id: string,
    source_entity: string,
    destination_entity: string,
    status?: string,
    created_by?: string,
}
