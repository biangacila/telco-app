import {FinanceDashboardType} from "@/types/type-finance-dashboard";


export const IsDashboardDataEqual=(data1:FinanceDashboardType,data2:FinanceDashboardType):boolean=>{
    data1.LastUpdatedAt = ""
    data2.LastUpdatedAt = ""
    return JSON.stringify(data1) === JSON.stringify(data2);
}
