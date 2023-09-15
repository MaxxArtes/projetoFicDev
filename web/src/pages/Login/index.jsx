import React, { useState } from 'react';
import styles from './styles.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export function LoginForm() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarModal, setMostrarModal] = useState(false);
    const navigate = useNavigate();

    //   const handleRecuperarSenhaClick = () => {
    //     setMostrarModal(true);
    //   };

    const redirecionarParaPaginaInicial = () => {
        navigate('/PaginaInicial');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/loginUsuario', { email, senha });
            if (response.status === 200) {
                console.log('Login bem-sucedido');
                redirecionarParaPaginaInicial(); // Chama a função de redirecionamento
            } else {
                console.error('Erro de login');
            }
        } catch (error) {
            console.error('Erro ao fazer login', error);
        }
    };

    const toggleMostrarSenha = () => {
        setMostrarSenha(!mostrarSenha);
    };

    return (
        <main className={styles.contanier}>
            <logo >
                <img className={styles.logo} src="logo.png" alt="logo" />
            </logo>
            <login className={styles.login}>
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
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)} />
                        <button
                            type="button"
                            onClick={toggleMostrarSenha}
                            className={styles.showPasswordButton}
                        >
                            {mostrarSenha ? 'Ocultar' : 'Mostrar'} senha
                        </button>
                        {/* <a href="#" onClick={handleRecuperarSenhaClick} className={styles.h6}>
                            Recuperar senha
                        </a> */}
                    </label>
                    {/* Renderize o modal quando mostrarModal for verdadeiro */}
                    {mostrarModal && (
                        <div className={styles.modal}>
                            {/* Conteúdo do modal */}
                            <h2>Recuperar Senha</h2>
                            {/* ... Outro conteúdo do modal ... */}
                            <button onClick={() => setMostrarModal(false)}>Fechar</button>
                        </div>
                    )}
                    <br />
                    <button className={styles.button} type="submit"><h2 className={styles.h2}>Entrar</h2></button>
                </form>
            </login>
        </main >
    );
}


