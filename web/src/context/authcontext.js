import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export const AuthContext = createContext(null);

export function AuthContextProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({}); // Adicione o estado de erros

    const login = async (data) => {
        try {
            setLoading(true);
            const result = await api.post('/loginUsuario', data);
            sessionStorage.setItem(
                'token',
                JSON.stringify(result.data.accessToken)
            );
            navigate('/PaginaInicial');
        } catch (error) {
            alert(`Houve um erro no Login:
            ${error.response.data.error}`);
        } finally {
            setLoading(false);
        }
    };

    const registerUsuario = async (data) => {
        try {
            setLoading(true);
            const result = await api.post('/registerUsuario', data);
            sessionStorage.setItem(
                'token',
                JSON.stringify(result.data.accessToken)
            );
            navigate('/PaginaInicial');
        } catch (error) {
            // Configure o estado de erros com base na resposta do servidor
            setErrors(error.response.data.errors || {});
            alert(`Houve um erro ao cadastrar usuário
            ${error.response.data.error}`);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        sessionStorage.removeItem('token');
        navigate('/');
    };

    return (
        <AuthContext.Provider
            value={{
                loginUsuario: login, // Use login em vez de loginUsuario
                registerUsuario, // Mantenha registerUsuario
                logout, // Mantenha logout
                loading, // Mantenha loading
                errors, // Adicione errors
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
