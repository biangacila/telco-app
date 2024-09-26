import {loginState, User} from "@/types/type_general";

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