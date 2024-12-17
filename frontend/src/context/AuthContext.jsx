import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(() => {
        const storedUser = sessionStorage.getItem('usuario');
        console.log("Usuario en sessionStorage al iniciar:", storedUser); // <-- Verifica aquí el valor
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [isAuthenticated, setIsAuthenticated] = useState(!!user);

    useEffect(() => {
        console.log("Usuario actual en el estado:", user); // <-- Verifica si el estado se actualiza correctamente
        if (!isAuthenticated) {
            navigate('/auth');
        }
    }, [isAuthenticated, user, navigate]);

    const loginUser = (userData) => {
        const userWithRole = {
            ...userData,
            role: userData.role,
            name: userData.name, // Asegúrate de incluir "name"
        };
        console.log("Guardando usuario en sessionStorage:", userWithRole); // <-- Verifica aquí
        sessionStorage.setItem('usuario', JSON.stringify(userWithRole));
        setUser(userWithRole);
        setIsAuthenticated(true);
    };
    
    const logoutUser = () => {
        // Elimina el usuario del sessionStorage y actualiza el estado
        sessionStorage.removeItem('usuario');
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
}