// AuthProvider.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ReduxSetLogout} from "@/redux/actions";

interface AuthContextProps {
    isAuthenticated: boolean;
    login: () => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const loginType = useSelector((state: any) => state.core.loginType);

    const dispatch = useDispatch();
    useEffect(() => {
        // Check initial login state based on loginType or other auth details
        if (loginType === 'provider' || loginType === 'local' ) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [loginType]);

    const login = async () => {
        // Mock login for example; replace with actual auth logic
        console.log("AuthProvider login requested@")
        setIsAuthenticated(true);
    };

    const logout = () => {
        console.log("AuthProvider logout requested@")
        dispatch(ReduxSetLogout(true))
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
