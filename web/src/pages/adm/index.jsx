import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import styles from './styles.module.css';

export function Usuarios() {
    const [users, setUsers] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [nome, setNome] = useState('');
    const [cargo, setCargo] = useState('');
    const [especialidade, setEspecialidade] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');


    const handleRecuperarSenhaClick = () => {
        setMostrarModal(true);
    };


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/listarUsuarios/3');
                const userData = response.data; // Assuming the API returns an array of user data
                setUsers(userData.data); // Update the state with user data
                console.log(userData);
            } catch (error) {
                console.error('Erro ao fazer login', error);
            }
        };

        fetchUsers(); // Call the function to fetch user data when the component mounts
    }, []);

    const handleSubmit = async () => {
        try {
            // Certifique-se de que todos os campos foram preenchidos antes de enviar a solicitação
            if (cargo && especialidade && cpf && email && password && rePassword) {
                // Certifique-se de que a senha e a senha de reconfirmação correspondam
                if (password !== rePassword) {
                    console.error('As senhas não correspondem.');
                    return;
                }

                // Crie um objeto com os dados do usuário a serem enviados
                const userData = {
                    nome,
                    cargo,
                    especialidade,
                    cpf,
                    email,
                    password,
                };

                // Envie a solicitação POST para a rota /registerUsuario
                const response = await api.post('/registerUsuario', userData);

                // Lide com a resposta, talvez exibindo uma mensagem de sucesso
                console.log('Usuário registrado com sucesso!', response.data);

                // Limpe os campos após o registro
                setNome('');
                setCargo('');
                setEspecialidade('');
                setCpf('');
                setEmail('');
                setPassword('');
                setRePassword('');

                // Feche o modal se necessário
                setMostrarModal(false);
            } else {
                console.error('Por favor, preencha todos os campos.');
            }
        } catch (error) {
            console.error('Erro ao registrar usuário', error);
        }
    };

    return (
        <div className={styles.ADMINUSUARIOS}>
            {/* Your UI components go here */}
            <h1>USUÁRIOS</h1>
            <br />
            <button onClick={() => handleRecuperarSenhaClick(true)}>adicionar</button>
            <table>
                <thead>
                    <tr>
                        <th>NOME</th>
                        <th>CARGO</th>
                        <th>CPF</th>
                        <th>E-MAIL</th>
                        <th>ACÕES</th>
                        {/* Add other table headers as needed */}
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.nome}</td>
                            <td>{user.cargo}</td>
                            <td>{user.cpf}</td>
                            <td>{user.email}</td>
                            <td className={styles.button}><button>editar</button><button>deletar</button></td>
                            {/* Replace 'email' with the actual property name */}
                            {/* Render other user data as needed */}
                        </tr>
                    ))}
                </tbody>
            </table>

            {mostrarModal && (

                <div className={styles.modal}>

                    <div className={styles.adicionar}>
                        <div>
                            <h4>adicionar</h4>
                            <div className={styles.inputcontainer1} >
                                <input
                                    type="text"
                                    placeholder='Digite seu nome'
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)} // Adicione o manipulador para o campo "nome"
                                />
                            </div>
                        </div>
                        {
                            <div className={styles.contmodal}>

                                <div className={styles.inputcontainer}>
                                <select value={cargo} onChange={(e) => setCargo(e.target.value)}>
    <option value="">Selecione o cargo</option>
    <option value="Atendente">Atendente</option>
    <option value="Médico">Médico</option>
  </select>
                                    <input
                                        type="text"
                                        placeholder='Digite sua especialização'
                                        value={especialidade}
                                        onChange={(e) => setEspecialidade(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        placeholder='Digite seu CPF'
                                        value={cpf}
                                        onChange={(e) => setCpf(e.target.value)}
                                    />
                                </div>
                                <div className={styles.inputcontainer}>
                                    <input
                                        type="email"
                                        placeholder='Digite seu email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <input
                                        type="password"
                                        placeholder='Digite sua senha'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <input
                                        type="password"
                                        placeholder='Digite novamente sua senha'
                                        value={rePassword}
                                        onChange={(e) => setRePassword(e.target.value)}
                                    />
                                </div>
                            </div>

                        }
                    <button onClick={handleSubmit}>adicionar</button>
                    <p onClick={() => setMostrarModal(false)}>cancelar</p>
                </div>
                </div>

    )
}
        </div >

    );

}
