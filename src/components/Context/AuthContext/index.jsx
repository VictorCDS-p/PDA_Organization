import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const userData = JSON.parse(atob(token.split('.')[1])); 
            setUser(userData);
        }
    }, []);

    const login = (token, userType) => {
        localStorage.setItem("token", token); 
        const userWithRole = { ...JSON.parse(atob(token.split('.')[1])), userType };
        setUser(userWithRole);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
