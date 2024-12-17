import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(() => {
        const storedUser = sessionStorage.getItem('usuario');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [isAuthenticated, setIsAuthenticated] = useState(!!user);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/auth'); // Redirige a login si no está autenticado
        }
    }, [isAuthenticated, navigate]);

    const loginUser = (userData) => {
        // Guarda la información del usuario en el sessionStorage
        const userWithRole = {
            ...userData,
            role: userData.role, // Usa "role" en lugar de "rol"
        };
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