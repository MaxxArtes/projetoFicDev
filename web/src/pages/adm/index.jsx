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
    const [editPassword, setEditPassword] = useState(''); // Adicione um estado para a senha durante a edição

    const handleVoltarParaPaginaInicial = () => {
        navigate('/PaginaInicial');
    };

    const handleSair = () => {
        sessionStorage.removeItem('token'); // Remova o token do sessionStorage
        navigate('/');
    };

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
    const handleEditButtonClick = (user) => {
        setIsEditMode(true);
        setUserData(user); // Defina o estado userData com os dados do usuário existente
        console.log('HANDLE USERDATA: ', user);
        setMostrarModal(true);
    };


    async function handleDeleteUser(userId) {
        try {
            const accessToken = sessionStorage.getItem("token");
            console.log("accessToken: ", accessToken);
            const response = await api.delete(`/deletarUsuario/${userId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            console.log(response)

            if (response.status === 200 || response.status === 204) {
                setSelectedUsers(selectedUsers.filter(id => id !== userId));
                // Após a exclusão bem-sucedida, faça a solicitação GET para buscar dados atualizados
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
    }

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
                console.log('Usuário editado com sucesso!', response.data);

                setSelectedUsers(selectedUsers.filter(id => id !== userData.id_usuario));
                const usersResponse = await api.get(`/listarUsuarios/${page}`);
                const userData = usersResponse.data;
                setUsers(userData.data);

                const calculatedTotalPages = Math.ceil(userData.count / 5);
                setTotalPages(calculatedTotalPages);

                // Após a exclusão bem-sucedida, faça a solicitação GET para buscar dados atualizados
            } else {
                console.error('Erro ao editar o usuário:', response.data);
            }

            setNome('');
            setCargo('');
            setEspecialidade('');
            setCpf('');
            setEmail('');
            setPassword('');
            setRePassword('');
            setEditPassword(''); // Limpe o estado editPassword
            setUserData(null); // Defina o estado userData como null após a edição


            setMostrarModal(false);
            setIsEditMode(false);


            // Atualize a lista de usuários após a edição
            const updatedUsers = users.map((user) =>
                user.id_usuario === userData.id_usuario ? response.data : user
            );
            setUsers(updatedUsers);
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
                </div>
                <div>
                    <button onClick={handleVoltarParaPaginaInicial}>Voltar para Página Inicial</button>
                    <button onClick={handleSair}>Sair</button>
                </div>
            </div>
            <br />
            <button onClick={() => handleRecuperarSenhaClick(true)}>adicionar</button>
            <table>
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
                                <button onClick={() => handleEditButtonClick(user)}>editar</button>

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
                    console.log('MOSTRAMODAL USERDATA: ',userData)
                    <div className={styles.adicionar}>
                        <div>
                            <h4>{isEditMode ? 'Editar Usuário' : 'Adicionar Usuário'}</h4>
                            <div className={styles.inputcontainer1}>
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
                            </div>
                        </div>
                        <div className={styles.contmodal}>
                            <div className={styles.inputcontainer}>
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
                                    value={isEditMode ? userData.password : password} // Defina o valor do campo de senha com o valor de senha quando estiver no modo de edição
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
                                    value={isEditMode ? userData.rePassword : rePassword} // Defina o valor do campo de rePassword com o valor de rePassword quando estiver no modo de edição
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
                        <button onClick={isEditMode ? () => handleSaveUser(userData.id_usuario) : handleSubmit}>
                            {isEditMode ? 'Salvar' : 'Adicionar'}
                        </button>
                        <p onClick={() => setMostrarModal(false)}>cancelar</p>
                    </div>
                </div>
            )}




        </div>
    );
}
