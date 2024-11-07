import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [expirationTime, setExpirationTime] = useState(localStorage.getItem('tokenExpiration'));

    const login = (newToken) => {
        const expirationDuration = 60 * 60 * 1000;
        const expirationDate = new Date(new Date().getTime() + expirationDuration);

        localStorage.setItem('token', newToken);
        localStorage.setItem('tokenExpiration', expirationDate.toISOString());
        setToken(newToken);
        setExpirationTime(expirationDate);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
        setToken(null);
        setExpirationTime(null);
    };

    const isAuthenticated = useCallback(() => {
        const currentTime = new Date().getTime();
        if (!token || !expirationTime) return false;

        if (currentTime > new Date(expirationTime).getTime()) {
            logout();
            return false;
        }

        return true;
    }, [token, expirationTime]);


    useEffect(() => {
        const checkAuth = () => {
            if (!isAuthenticated()) {
                logout();
            }
        };
        checkAuth();
    }, [token, expirationTime, isAuthenticated]);

    return (
        <AuthContext.Provider value={{ token, login, logout, isAuthenticated: isAuthenticated() }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
