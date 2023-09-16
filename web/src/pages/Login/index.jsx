import React, { useState } from 'react';
import styles from './styles.module.css';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';

export function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarModal, setMostrarModal] = useState(false);
    const navigate = useNavigate();

    const handleRecuperarSenhaClick = () => {
        setMostrarModal(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const result = await api.post('/loginUsuario', { email, password });
            console.log(result);
            sessionStorage.setItem('token', result.data.token);
            navigate('/PaginaInicial');


        } catch (error) {
            console.error('Erro ao fazer login', error);
        }
    };

    const toggleMostrarSenha = () => {
        setMostrarSenha(!mostrarSenha);
    };

    return (
        <main className={styles.contanier}>
            <div className={styles.logo}>
                <img src="logo.png" alt="logo" />
            </div>


            <div className={styles.login}>
                <form onSubmit={handleSubmit}>
                    <h1 className={styles.h1}>Login</h1>
                    <br />
                    <label>
                        <h2 className={styles.h2}>E-mail:</h2>
                        <input pattern="^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$"
                            title="E-mail inválido"
                            required
                            placeholder="Digite seu e-mail"
                            className={styles.input}
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <br />
                    <br />
                    <label>
                        <h2 className={styles.h2}>Senha:</h2>
                        <input
                            required="senha obrigatório"
                            placeholder='Digite sua senha'
                            className={styles.input}
                            minLength='6'
                            title='A senha precisa ser maior que 6 caracteres.'
                            type={mostrarSenha ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />

                        <button
                            type="button"
                            onClick={toggleMostrarSenha}
                            className={styles.showPasswordButton}
                        >

                        </button>

                    </label>
                    <h4 className={styles.h4} onClick={() => handleRecuperarSenhaClick(true)}>Recuperar Senha</h4>

                    {mostrarModal && (

                        <div className={styles.modal}>

                            <h4>Recuperar senha</h4>
                            {
                                <div className={styles.inputcontainer}>
                                    <input type="cpf" placeholder='Digite seu cpf' />
                                    <span className={styles.icon} ></span>
                                    <div className="rectangle" />
                                </div>

                            }
                            <button onClick={() => setMostrarModal(false)}>Enviar</button>
                        </div>

                    )}
                    <br />
                    <button className={styles.button1} type="submit"><h2 className={styles.entrar}>Entrar</h2></button>
                </form>
            </div>
        </main >
    );
}
