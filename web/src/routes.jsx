import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from './pages/Login/index.jsx';
import { PaginaInicial } from './pages/servicos/index.jsx';
import { AuthContextProvider } from './context/authcontext';
import { Usuarios} from './pages/adm/index.jsx';
export const isAuthenticate = () => {
    return sessionStorage.getItem('token');
};

export function PrivateRoute({ children }) {
    const token = isAuthenticate();
    if (!token) {
        return <Navigate to="/" replace />
    }
    return children;
}

// export const getToken = () => {
//     return sessionStorage.getItem('token');
// };

// export function PrivateRoute({ children }) {
//     
//     if (!token) {
//         return <Navigate to="/" replace />;
//     }
//     return children;
// }

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