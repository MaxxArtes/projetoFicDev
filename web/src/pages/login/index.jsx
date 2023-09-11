// login/index.js
import React from 'react';
import { api } from '../../services/api';
import { useState } from 'react';
import Modal from 'react-modal';

export function Login() { // exporte o componente Login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpf, setCpf] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleLogin(e) {
    e.preventDefault();
    api.post('/login', { email, password })
      .then(response => {
        // verificar se a resposta existe
        if (response?.data) {
          // fazer algo com o token de autenticação
          console.log(response.data.token);
          // mostrar um alerta de confirmação de entrada
          alert('Login feito com sucesso!');
        } else {
          // mostrar uma mensagem de aviso
          alert('Resposta vazia ou nula');
        }
      })
      .catch(error => {
        // mostrar mensagem de erro
        alert(error.response.data.message);
      });
  }



  function handleRecoverPassword(e) {
    e.preventDefault();
    api.post('/recover-password', { cpf })
      .then(response => {
        // mostrar mensagem de sucesso
        alert(response.data.message);
        setModalIsOpen(false);
      })
      .catch(error => {
        // mostrar mensagem de erro
        alert(error.response.data.message);
      });
  }

  return (
    <div className="App">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">E-mail:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
      <p onClick={() => setModalIsOpen(true)}>Recuperação de senha</p>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          },
          content: {
            width: '400px',
            height: '200px',
            margin: 'auto',
            textAlign: 'center'
          }
        }}
      >
        <h2>Recuperação de senha</h2>
        <form onSubmit={handleRecoverPassword}>
          <label htmlFor="cpf">CPF:</label>
          <input
            type="text"
            id="cpf"
            value={cpf}
            onChange={e => setCpf(e.target.value)}
            required
          />
          <button type="submit">Enviar</button>
        </form>
      </Modal>
    </div>
  );
}
