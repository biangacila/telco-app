import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SERVER_HOST_WEBSOCKET } from "@/config/server-api";
import { FinanceDashboardType } from "@/types/type-finance-dashboard";
import { ReduxSetDashboardFinance, ReduxSetWebsocketError } from "@/redux/actions";
import { IsDashboardDataEqual } from "@/services/service-dashboard";
import { User2 } from "@/types/type-model";

type SocketType = {
    startConnection: any;
    sendMessage: any;
};

const WebsocketContext = React.createContext<SocketType>({
    startConnection: () => null,
    sendMessage: () => null,
});

export default ({ children }: any) => {
    const rootState = useSelector((state: any) => state.core);
    const socket = useRef<WebSocket | null>(null);
    const loginType = useSelector((state: any) => state.core.loginType);
    const dispatch = useDispatch();

    let user = rootState.loginWithProvider as User2;
    const reconnectInterval = useRef<number>(1000); // Start with a 1-second delay for reconnection attempts
    const maxReconnectInterval = 16000; // Maximum delay (16 seconds)

    const connectWebSocket = () => {
        if (user.code !== '') {
            const tempUser = user.code;
            const url = `wss://cloudcalls.easipath.com/backend-telcowebsocket/api/ws?userCode=${tempUser}`;

            console.log("@@@@@@WS-url> ", url);
            socket.current = new WebSocket(url);

            socket.current.onopen = () => {
                console.log('WebSocket connected');
                dispatch(ReduxSetWebsocketError('WebSocket connected'));
                reconnectInterval.current = 1000; // Reset the reconnection interval on successful connection
            };

            socket.current.onmessage = (event: MessageEvent) => {
                onMessage(event.data).then(() => null);
            };

            socket.current.onclose = () => {
                console.log('WebSocket closed');
                dispatch(ReduxSetWebsocketError('WebSocket closed'));
                attemptReconnect(); // Attempt to reconnect
            };

            socket.current.onerror = (e: any) => {
                console.error('WebSocket error:', e.message || e);
                dispatch(ReduxSetWebsocketError(e.message));
                if (socket.current?.readyState === WebSocket.CLOSED) {
                    attemptReconnect(); // Attempt to reconnect on error
                }
            };
        }
    };

    const attemptReconnect = () => {
        setTimeout(() => {
            console.log(`Reconnecting WebSocket... (Delay: ${reconnectInterval.current / 1000}s)`);
            connectWebSocket();

            // Increase the interval for the next reconnection attempt, up to the maximum
            reconnectInterval.current = Math.min(reconnectInterval.current * 2, maxReconnectInterval);
        }, reconnectInterval.current);
    };

    useEffect(() => {
        if (user.code !== '') {
            connectWebSocket();
        }

        // Clean up WebSocket connection on component unmount or if loginType changes
        return () => {
            if (socket.current) {
                socket.current.close();
            }
        };
    }, [loginType]);

    const onMessage = async (payload: any) => {
        const inputData = JSON.parse(payload) as FinanceDashboardType;
        inputData.Data.Sims = 0;

        if (!IsDashboardDataEqual(inputData, rootState.dashboardInfo)) {
            dispatch(ReduxSetDashboardFinance(inputData));
        }
    };

    const sendMessage = (title: any, body: any) => {
        const msg = {
            Type: title,
            Payload: body,
        };
        try {
            if (socket.current) {
                socket.current.send(JSON.stringify(msg));
            }
        } catch (e) {
            console.error("Error sending message:", e);
        }
    };

    const startConnection = () => {
        console.log("Starting WebSocket connection...");
        connectWebSocket();
    };

    return (
        <WebsocketContext.Provider value={{ startConnection, sendMessage }}>
            {children}
        </WebsocketContext.Provider>
    );
};
