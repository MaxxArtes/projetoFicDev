import React, { useState } from 'react';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email.includes('@') || !email.includes('.')) {
      setError('Por favor, insira um email válido.');
      return;
    }
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    // Enviar dados do formulário para o servidor
  };

  return (
    <header style={{display: 'flex',width: '1920px', height: '1080px'}}>
      <div style={{ width: '1358px', height: '1076px'}}>
        <img src="/logo.png" alt="Logo" />
      </div>
      <div style={{ width: '12%', height: '30%' , background: 'blue', justifyContent: 'center', alignItems: 'center'}}>
        <form onSubmit={handleSubmit} style={{justifyContent: 'center', alignItems: 'center' }}>
          <label>
            Email:
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <br />
          <label>
            Senha:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br />
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <button type="submit">Entrar</button>
        </form>
      </div>
    </header>
  );
}

export default LoginPage;