import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
            setToken(savedToken);
            decodeToken(savedToken);
        }
    }, []);

    const decodeToken = (token) => {
        try {
            const decoded = jwtDecode(token);
            setUserInfo(decoded);
            console.log(decoded);
        } catch (error) {
            console.error("Token JWT inválido:", error);
            logout();
        }
    };

    const login = async (username, password) => {
        try {
            const response = await axios.post("http://localhost:8080/auth/login", {
                username,
                password,
            });

            const receivedToken = response.data.token;
            localStorage.setItem("token", receivedToken);
            setToken(receivedToken);
            decodeToken(receivedToken);

            navigate("/");
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUserInfo(null);
        navigate("/login");
    };

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider
            value={{
                token,
                isAuthenticated,
                login,
                logout,
                userInfo,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
