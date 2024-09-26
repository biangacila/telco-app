
import {
    ALL_CASE_RECORD_SET,
    CURRENT_CASE_RECORD_SET,
    CURRENT_WORKER_SET,
    LOAD_CONFIG_DATA,
    LOGIN_SET,
    WORKER_SET
} from "./constant";
import { initialLoginState} from "@/types/type_initialize";
import {loginState} from "@/types/type_general";


type defaultStateType={
    login:loginState
}
let defaultState:defaultStateType={
    login:initialLoginState,


}
export default function rootReducer(     state=defaultState ,     {type, payload}: {type: string, payload: any}):any{
    let newState = state;
    switch (type) {
        case LOGIN_SET:
            newState.login = payload as loginState;
            return Object.assign({}, newState);

    }
    return state
}