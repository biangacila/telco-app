import React, {useEffect, useReducer, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SERVER_HOST_WEBSOCKET} from "@/config/server-api";
import {FinanceDashboardType} from "@/types/type-finance-dashboard";
import {ReduxSetDashboardFinance} from "@/redux/actions";
import {IsDashboardDataEqual} from "@/services/service-dashboard";
import {defaultStateType} from "@/redux/reducer"; // Adjust the path to your store file

const WebSocketProvider: React.FC = () => {
    const rootState = useSelector((state: any) => state.core);
    const socket = useRef<WebSocket | null>(null);
    const loginType = useSelector((state: any) => state.core.loginType);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("-> Am in websocket server ):( ");
        if (loginType !== '') {
            let u = rootState.loginWithProvider
            let tempUser = "UC102"
            // Only connect WebSocket when loginType is "provider" UC102
            //socket.current = new WebSocket(`ws://${SERVER_HOST_WEBSOCKET}?userCode=${u.code}`);
            socket.current = new WebSocket(`ws://${SERVER_HOST_WEBSOCKET}?userCode=${tempUser}`);

            socket.current.onopen = () => {
                console.log('WebSocket connected');
            };

            socket.current.onmessage = (event: MessageEvent) => {
                onMessage(event.data).then(r => null);
            };

            socket.current.onclose = () => {
                console.log('WebSocket closed');
            };
            socket.current.onerror = (e: any) => {
                console.log('!(((->WebSocket error:', e);
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
        if (!IsDashboardDataEqual(inputData, rootState.dashboardInfo)) {
            dispatch(ReduxSetDashboardFinance(inputData))
            //console.log("!not SAME INPUT FROM THE WEBSOCKET! IGNORE");
            //return
        }
        //console.log(':) Message from server:', payload);
    }

    return null; // This component does not render anything itself
};

export default WebSocketProvider;
