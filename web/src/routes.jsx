import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from './pages/Login/index.jsx';
import { PaginaInicial } from './pages/servicos/index.jsx';
import { AuthContextProvider } from './context/authcontext';
import { Usuarios} from './pages/adm/index.jsx';

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
                <Route path="/Usuarios"
                        element={
                            <PrivateRoute>
                                <Usuarios />
                            </PrivateRoute>
                        } />
                </Routes>
            </AuthContextProvider>
        </BrowserRouter>
    );
}