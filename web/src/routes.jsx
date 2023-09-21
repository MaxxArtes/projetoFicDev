import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from './pages/Login/index.jsx';
import { PaginaInicial } from './pages/servicos/index.jsx';
import { AuthContextProvider } from './context/authcontext';
import { Usuarios } from './pages/adm/index.jsx';
import { Agendamentos } from './pages/agendamento/index.js';
import { ModalAgendamento } from './components/modalagendamento/modalAgendamento.js';
import { RegisterAgendamento } from './components/registeragendamento/registerAgendamente.js';
import { ModalCadastrarPaciente } from './components/modalpaciente/modalPaciente.js';

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
                    <Route path="/Agendamentos"
                        element={
                            <PrivateRoute>
                                <Agendamentos />
                            </PrivateRoute>
                        } />
                    <Route path="/ModalAgendamento" element={<ModalAgendamento />} />
                    <Route path="/registerAgendamento" element={<RegisterAgendamento />} />
                    <Route path="/ModalCadastrarPaciente" element={<ModalCadastrarPaciente />} />
                </Routes>
            </AuthContextProvider>
        </BrowserRouter>
    );
}