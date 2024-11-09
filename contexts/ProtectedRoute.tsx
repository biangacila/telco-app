// contexts/ProtectedRoute.tsx
import React from 'react';
import { useAuth } from '@/contexts/AuthProvider';
import { useRouter } from 'expo-router';
import {useNavigationState} from "@react-navigation/core";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    if (!isAuthenticated) {
        router.replace('/auth/loginScreen'); // Redirect to login if not authenticated
        return null;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
