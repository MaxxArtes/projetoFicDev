import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Foods } from './pages/Foods';

import { AuthContextProvider } from './contexts/AuthContext';

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
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/foods" element={
                        <PrivateRoute>
                            <Foods />
                        </PrivateRoute>
                    } />
                </Routes>
            </AuthContextProvider>
        </BrowserRouter>
    );
}
