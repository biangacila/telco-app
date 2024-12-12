import React, {useEffect,  useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SERVER_HOST_WEBSOCKET} from "@/config/server-api";
import {FinanceDashboardType} from "@/types/type-finance-dashboard";
import {ReduxSetDashboardFinance, ReduxSetWebsocketError} from "@/redux/actions";
import {IsDashboardDataEqual} from "@/services/service-dashboard";
import {User2} from "@/types/type-model";

type SocketType={
    startConnection:any,
    sendMessage:any,

}
const WebsocketContext = React.createContext<SocketType>({
    startConnection:()=>null,
    sendMessage:()=>null,
});

export default ({children}:any)=> {
    const rootState = useSelector((state: any) => state.core);
    const socket = useRef<WebSocket | null>(null);
    const loginType = useSelector((state: any) => state.core.loginType);
    const dispatch = useDispatch();

    let user = rootState.loginWithProvider as User2

    useEffect(() => {
        console.log("-> Am in websocket server ):( ");
        if (user.code !== '') {
            let u = rootState.loginWithProvider
            let tempUser = user.code // "UC102"
            // Only connect WebSocket when loginType is "provider" e.g. UC102
            //socket.current = new WebSocket(`ws://${SERVER_HOST_WEBSOCKET}?userCode=${u.code}`);
            let url = `wss://cloudcalls.easipath.com/backend-telcowebsocket/api/ws?userCode=${tempUser}`
            url = `ws://safer.easipath.com:3319/backend-telcowebsocket/api/ws?userCode=${tempUser}`
            console.log("@@@@@@WS-url> ", url)
            socket.current = new WebSocket(url);

            socket.current.onopen = () => {
                console.log('WebSocket connected 2');
                dispatch(ReduxSetWebsocketError('WebSocket connected'))
            };

            socket.current.onmessage = (event: MessageEvent) => {
                onMessage(event.data).then(r => null);
            };

            socket.current.onclose = () => {
                console.log('WebSocket closed');
                dispatch(ReduxSetWebsocketError('WebSocket closed'))
            };
            socket.current.onerror = (e: any) => {
                console.log('!(((->WebSocket error:', e);
                dispatch(ReduxSetWebsocketError(e))
            }
        }

        // Clean up WebSocket connection on component unmount or if loginType changes
        return () => {
            if (socket.current) {
                socket.current.close();
            }
        };
    }, [loginType]);

    const onMessage = async (payload: any) => {

        let inputData = JSON.parse(payload) as FinanceDashboardType;
        inputData.Data.Sims = 0
        //console.log("onMessage@@@@@@@----> ",inputData)
        if (!IsDashboardDataEqual(inputData, rootState.dashboardInfo)) {
            dispatch(ReduxSetDashboardFinance(inputData))
        }
    }
    const sendMessage=(title:any,body:any)=>{
        let msg = {
            Type:title,
            Payload:body
        }
        try{
            //console.log("sendMessage ::))ZZZZZ--> ",title," > ",body)
            if(socket.current){
                socket.current.send(JSON.stringify(msg))
            }

        }catch (e) {
            console.error("):( Error send message: ",e)
        }
    }
    const startConnection=()=>{
        console.log(":::) startConnection Hello")
    }

    return<WebsocketContext.Provider value={{startConnection,sendMessage}}>{children}</WebsocketContext.Provider>
}
