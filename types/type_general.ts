export type loginState = {
    hasLogin: boolean,
    token: string,
    expiredAt: string,
    user: User,
}
export type LoginFeedbackResponse = {
    record: User
    status: boolean,
    token: string,
    expiredAt: string,
}
export type ApiResponse = {
    data: {
        RESULT: any,
    }
}
export type User = {
    Code: string,
    Email: string,
    Name: string,
    Surname: string,
    Phone?: string,
    Username: string,
    Password?: string,
    Org?: string,
    Role?: string,
    Picture?:string
}

export type RootStackParamList = {
    LandingPage: undefined;
    Login: undefined;
    Signup: undefined;
    Dashboard: undefined;
};
export interface Contributor {
    id: string;
    name: string;
    avatar: string; // URL for avatar image
    isHost?: boolean;
    userCode:string,
    email:string
}
