import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import styles from './styles.module.css';

export function Usuarios() {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [nome, setNome] = useState('');
    const [cargo, setCargo] = useState('');
    const [especialidade, setEspecialidade] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const handleRecuperarSenhaClick = () => {
        setMostrarModal(true);
    };

    function aumentar() {
        if (page < totalPages) {
            setPage(page + 1);
        }
    }

    function diminuir() {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    function handleUserSelection(userId) {
        if (selectedUsers.includes(userId)) {
            setSelectedUsers(selectedUsers.filter(id => id !== userId));
        } else {
            setSelectedUsers([...selectedUsers, userId]);
        }
    }

    function handleDeleteUser(userId) {
        api.delete(`/deletarUsuario/${userId}`)
        .then(response => {
            if (response.status === 200) {
                setSelectedUsers(selectedUsers.filter(id => id !== userId));
            } else {
                console.error('Erro ao excluir o usuário:', response.data);
            }
        })
        .catch(error => {
            console.error('Erro na solicitação:', error);
        });
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get(`/listarUsuarios/${page}`);
                const userData = response.data;
                setUsers(userData.data);

                const calculatedTotalPages = Math.ceil(userData.count / 5);
                setTotalPages(calculatedTotalPages);
            } catch (error) {
                console.error('Erro ao fazer login', error);
            }
        };

        fetchUsers();
    }, [page]);

    const handleSubmit = async () => {
        try {
            if (cargo && especialidade && cpf && email && password && rePassword) {
                if (password !== rePassword) {
                    console.error('As senhas não correspondem.');
                    return;
                }

                const userData = {
                    nome,
                    cargo,
                    especialidade,
                    cpf,
                    email,
                    password,
                };

                const response = await api.post('/registerUsuario', userData);

                console.log('Usuário registrado com sucesso!', response.data);

                setNome('');
                setCargo('');
                setEspecialidade('');
                setCpf('');
                setEmail('');
                setPassword('');
                setRePassword('');

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
            <h1>USUÁRIOS</h1>
            <br />
            <button onClick={() => handleRecuperarSenhaClick(true)}>adicionar</button>
            <table>
                <thead>
                    <tr>
                        <th>Selecionar</th>
                        <th>id</th>
                        <th>NOME</th>
                        <th>CARGO</th>
                        <th>CPF</th>
                        <th>E-MAIL</th>
                        <th>ACÕES</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>
                                <input
                                    type="checkbox"
                                    onChange={() => handleUserSelection(user.id_usuario)}
                                    checked={selectedUsers.includes(user.id_usuario)}
                                />
                            </td>
                            <td>{user.id_usuario}</td>
                            <td>{user.nome}</td>
                            <td>{user.cargo}</td>
                            <td>{user.cpf}</td>
                            <td>{user.email}</td>
                            <td className={styles.button}>
                                <button>editar</button>
                                <button onClick={() => handleDeleteUser(user.id_usuario)}>deletar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={styles.page}>
                <div className={styles.diminuir}>
                    <button onClick={() => diminuir()}>diminuir</button>
                </div>
                <div>
                    <p id='page'>{page}</p>
                </div>
                <div className={styles.aumentar}>
                    <button onClick={() => aumentar()}>aumentar</button>
                </div>
            </div>
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
                                    onChange={(e) => setNome(e.target.value)}
                                />
                            </div>
                        </div>
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
                        <button onClick={handleSubmit}>adicionar</button>
                        <p onClick={() => setMostrarModal(false)}>cancelar</p>
                    </div>
                </div>
            )}
        </div>
    );
}
