import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';

export function Usuarios() {
    const navigate = useNavigate();
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
    const [isEditMode, setIsEditMode] = useState(false);
    const [userData, setUserData] = useState(null);
    const [editPassword, setEditPassword] = useState('');

    const handleVoltarParaPaginaInicial = () => {
        navigate('/PaginaInicial');
    };

    const handleSair = () => {
        sessionStorage.removeItem('token');
        navigate('/');
    };

    const handleRecuperarSenhaClick = () => {
        setMostrarModal(true);
    };

    const aumentar = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const diminuir = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleUserSelection = (userId) => {
        if (selectedUsers.includes(userId)) {
            setSelectedUsers(selectedUsers.filter(id => id !== userId));
        } else {
            setSelectedUsers([...selectedUsers, userId]);
        }
    };

    const handleEditButtonClick = (user) => {
        setIsEditMode(true);
        setUserData(user);
        setMostrarModal(true);
    };

    const handleDeleteUser = async (userId) => {
        try {
            const accessToken = sessionStorage.getItem("token");
            const response = await api.delete(`/deletarUsuario/${userId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });

            if (response.status === 200 || response.status === 204) {
                setSelectedUsers(selectedUsers.filter(id => id !== userId));
                const usersResponse = await api.get(`/listarUsuarios/${page}`);
                const userData = usersResponse.data;
                setUsers(userData.data);

                const calculatedTotalPages = Math.ceil(userData.count / 5);
                setTotalPages(calculatedTotalPages);
            } else {
                console.error('Erro ao excluir o usuário:', response.data);
            }
        } catch (error) {
            console.error('Erro na solicitação:', error);
        }
    };

    const handleSaveUser = async () => {
        try {
            if (password !== rePassword) {
                console.error('As senhas não correspondem.');
                return;
            }

            const updatedUserData = {
                nome: isEditMode ? userData.nome : nome,
                cargo: isEditMode ? userData.cargo : cargo,
                especialidade: isEditMode ? userData.especialidade : especialidade,
                cpf: isEditMode ? userData.cpf : cpf,
                email: isEditMode ? userData.email : email,
                password: isEditMode ? editPassword : password,
            };

            const accessToken = sessionStorage.getItem("token");
            const response = isEditMode
                ? await api.put(`/editarUsuario/${userData.id_usuario}`, updatedUserData, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                : await api.post('/registerUsuario', updatedUserData);

            if (response.status === 200 || response.status === 204) {
                setSelectedUsers(selectedUsers.filter(id => id !== userData.id_usuario));
                const usersResponse = await api.get(`/listarUsuarios/${page}`);
                const userData = usersResponse.data;
                setUsers(userData.data);

                const calculatedTotalPages = Math.ceil(userData.count / 5);
                setTotalPages(calculatedTotalPages);
            } else {
                console.error('Erro ao editar o usuário:', response.data);
            }

            // Limpe os campos após a conclusão
            setNome('');
            setCargo('');
            setEspecialidade('');
            setCpf('');
            setEmail('');
            setPassword('');
            setRePassword('');
            setEditPassword('');
            setUserData(null);
            setMostrarModal(false);
            setIsEditMode(false);

        } catch (error) {
            console.error('Erro ao editar usuário', error);
        }
    };

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

                // Limpe os campos após a conclusão
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
            <div className={styles.nav}>
                <div>
                    <h1>USUÁRIOS</h1>
                    <div>
                        <h1>dashboards</h1>
                    </div>
                </div>
                <div>
                    <button onClick={handleVoltarParaPaginaInicial}>Voltar para Página Inicial</button>
                    <button onClick={handleSair}><img onClick={handleSair} alt="voltar" src="sair.png" /></button>
                </div>
            </div>
            <br />


            <div className={styles.pesquisarnome}>
                <div className={styles.pesquisa}>
                    <div className={styles.h1}></div>
                    <div className={styles.inputGroup}>
                        <input className={styles.formControl} placeholder="Pesquisar" />
                        <button className={styles.button}>
                            <button onClick={() => handleRecuperarSenhaClick(true)} className={styles.button}>adicionar</button>
                        </button>
                    </div>
                </div>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.acoes}>Selecionar</th>
                        <th className={styles.acoes}>id</th>
                        <th className={styles.acoes}>NOME</th>
                        <th className={styles.acoes}>CARGO</th>
                        <th className={styles.acoes}>CPF</th>
                        <th className={styles.acoes}>E-MAIL</th>
                        <th className={styles.acoes}>ACÕES</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td className={styles.acoes}>
                                <input
                                    type="checkbox"
                                    onChange={() => handleUserSelection(user.id_usuario)}
                                    checked={selectedUsers.includes(user.id_usuario)}
                                />
                            </td>
                            <td className={styles.acoes}>{user.id_usuario}</td>
                            <td className={styles.acoes}>{user.nome}</td>
                            <td className={styles.acoes}>{user.cargo}</td>
                            <td className={styles.acoes}>{user.cpf}</td>
                            <td className={styles.acoes}>{user.email}</td>
                            <td className={styles.button}>
                                <button onClick={() => handleEditButtonClick(user)} className={styles.primaryButton}>editar</button>
                                <button onClick={() => handleDeleteUser(user.id_usuario)} className={styles.primaryButton}>deletar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <footer>
                <div className={styles.pagination}>
                    <button onClick={diminuir} className={styles.pageNumber}>
                        <img className={styles.circledRight} alt="<" src="./Circled1.png" />
                    </button>
                    <button className={styles.pageNumber}>{page}</button>
                    <button onClick={aumentar} className={styles.pageNumber}>
                        <img className={styles.circledRight} alt=">" src='./Circled.png' />
                    </button>
                </div>
            </footer>
            {mostrarModal && (
                <div className={styles.modal}>
                    <div className={styles.adicionar}>
                        <h4>{isEditMode ? 'Editar Usuário' : 'Adicionar Usuário'}</h4>
                        <div className={styles.contmodal}>
                            <div className={styles.inputcontainer}>
                                <input
                                    type="text"
                                    placeholder="Digite seu nome"
                                    value={isEditMode ? userData.nome : nome}
                                    onChange={(e) => {
                                        if (isEditMode) {
                                            setUserData({ ...userData, nome: e.target.value });
                                        } else {
                                            setNome(e.target.value);
                                        }
                                    }}
                                />
                                <select
                                    value={isEditMode ? userData.cargo : cargo}
                                    onChange={(e) => {
                                        if (isEditMode) {
                                            setUserData({ ...userData, cargo: e.target.value });
                                        } else {
                                            setCargo(e.target.value);
                                        }
                                    }}
                                >
                                    <option value="">Selecione o cargo</option>
                                    <option value="Atendente">Atendente</option>
                                    <option value="Médico">Médico</option>
                                </select>
                                <input
                                    type="text"
                                    placeholder="Digite sua especialização"
                                    value={isEditMode ? userData.especialidade : especialidade}
                                    onChange={(e) => {
                                        if (isEditMode) {
                                            setUserData({ ...userData, especialidade: e.target.value });
                                        } else {
                                            setEspecialidade(e.target.value);
                                        }
                                    }}
                                />
                                <input
                                    type="text"
                                    placeholder="Digite seu CPF"
                                    value={isEditMode ? userData.cpf : cpf}
                                    onChange={(e) => {
                                        if (isEditMode) {
                                            setUserData({ ...userData, cpf: e.target.value });
                                        } else {
                                            setCpf(e.target.value);
                                        }
                                    }}
                                />
                            </div>
                            <div className={styles.inputcontainer}>
                                <input
                                    type="email"
                                    placeholder="Digite seu email"
                                    value={isEditMode ? userData.email : email}
                                    onChange={(e) => {
                                        if (isEditMode) {
                                            setUserData({ ...userData, email: e.target.value });
                                        } else {
                                            setEmail(e.target.value);
                                        }
                                    }}
                                />
                                <input
                                    type="password"
                                    placeholder="Digite sua senha"
                                    value={isEditMode ? userData.password : password}
                                    onChange={(e) => {
                                        if (isEditMode) {
                                            setUserData({ ...userData, password: e.target.value });
                                        } else {
                                            setPassword(e.target.value);
                                        }
                                    }}
                                />
                                <input
                                    type="password"
                                    placeholder="Digite novamente sua senha"
                                    value={isEditMode ? userData.rePassword : rePassword}
                                    onChange={(e) => {
                                        if (isEditMode) {
                                            setUserData({ ...userData, rePassword: e.target.value });
                                        } else {
                                            setRePassword(e.target.value);
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <div className={styles.botao}>
                            <button onClick={isEditMode ? () => handleSaveUser(userData.id_usuario) : handleSubmit}>
                                {isEditMode ? 'Salvar' : 'Adicionar'}
                            </button>
                            <p onClick={() => setMostrarModal(false)}>cancelar</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
