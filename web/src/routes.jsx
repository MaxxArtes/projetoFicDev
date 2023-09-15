import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from './pages/login/index.jsx';
import { PaginaInicial } from './pages/servicos/index.jsx';
import { AuthContextProvider } from './context/authcontext';

export const isAuthenticate = () => {
    const token = sessionStorage.getItem('token');
    return token !== null;
};

export function PrivateRoute({ children }) {
    if (!isAuthenticate()) {
        return <Navigate to="/" replace />
    }
    return children;
}

export function Navigations() {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <Routes>
                    <Route index path="/" element={<LoginForm />} />
                    <Route path="/PaginaInicial"
                     element={
                        <PrivateRoute>
                            <PaginaInicial />
                        </PrivateRoute>
                    } />
                </Routes>
            </AuthContextProvider>
        </BrowserRouter>
    );
}