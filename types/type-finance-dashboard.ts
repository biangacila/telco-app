type WalletRecord = {
    AppName: string;
    Balance: number;
    DealerCode: string;
    LastTransAmount: number;
    LastTransApiRef: string;
    LastTransCategory: string;
    LastTransDate: string;
    LastTransExtRef: string;
    LastTransNumber: string;
    LastTransRefs: string | null;
    LastTransTime: string;
    LastTransType: string;
    Network: string;
    OldBalance: number;
    Org: string;
    SellerCode: string;
    SupervisorCode: string;
    UpdatedAt: string;
    UserCode: string;
};

type Data = {
    Balance: number;
    ClosingBalance: number;
    Commission: number;
    Date: string;
    DepositBank: number;
    DepositManual: number;
    Name: string;
    OpeningBalance: number;
    Org: string;
    Sale: number;
    Time: string;
    TransferIn: number;
    TransferOut: number;
    UserCode: string;
    Wallet: number;
    WalletRecord: WalletRecord;
    Sims:number,
};

type UserCode = {
    Code: string;
};

export type FinanceDashboardType = {
    UserCode: UserCode;
    Data: Data;
    LastUpdatedAt: string;
};
export const initialFinanceDashboard: FinanceDashboardType = {
    "UserCode": {
        "Code": "UC102"
    },
    "Data": {
        "Balance": 0,
        "ClosingBalance": 0,
        "Commission": 0,
        "Date": "2024-11-09",
        "DepositBank": 0,
        "DepositManual": 0,
        "Name": "",
        "OpeningBalance": 0,
        "Org": "C1002",
        "Sale": 0,
        "Time": "",
        "TransferIn": 0,
        "TransferOut": 0,
        "UserCode": "",
        "Wallet": 0,
        "WalletRecord": {
            "AppName": "",
            "Balance": 0,
            "DealerCode": "",
            "LastTransAmount": 0,
            "LastTransApiRef": "",
            "LastTransCategory": "",
            "LastTransDate": "",
            "LastTransExtRef": "",
            "LastTransNumber": "",
            "LastTransRefs": null,
            "LastTransTime": "",
            "LastTransType": "",
            "Network":"",
            "OldBalance": 0,
            "Org": "C1002",
            "SellerCode": "",
            "SupervisorCode": "",
            "UpdatedAt": "",
            "UserCode": ""
        },
        Sims:0,
    },
    "LastUpdatedAt": ""
}

