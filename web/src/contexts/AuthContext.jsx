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
            const result = await api.post('/login', data);
            sessionStorage.setItem(
                'token',
                JSON.stringify(result.data.accessToken)
            );
            navigate('/foods');
        } catch (error) {
            alert(`Houve um erro no Login:
            ${error.response.data.error}`)
        } finally {
            setLoading(false);
        }
    };

    const createUser = async (data) => {
        try {
            setLoading(true);
            const result = await api.post('/register', data);
            sessionStorage.setItem(
                'token',
                JSON.stringify(result.data.accessToken)
            );
            navigate('/foods');
        } catch (error) {
            alert(`Houve um erro ao cadastrar usuário
            ${error.response.data.error}`);
        } finally {
            setLoading(false)
        }
    };

    const logout = () => {
        sessionStorage.removeItem('token');
        navigate('/');
    }

    return (
        <AuthContext.Provider
            value={{
                login,
                createUser,
                logout,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
