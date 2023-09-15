import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export const AuthContext = createContext(null);

export function AuthContextProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const login = async (data) => {
        try {
            setLoading(true);
            const result = await api.post('/Login', data);
            sessionStorage.setItem(
                'token',
                JSON.stringify(result.data.accessToken)
            );
            navigate('/PaginaInicial');
        } catch (error) {
            alert(`Houve um erro no Login:
            ${error.response.data.error}`)
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        sessionStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <AuthContext.Provider
            value={{
                login,
                logout,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
