import {loginState, User} from "@/types/type_general";
import {User2} from "@/types/type-model";

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
