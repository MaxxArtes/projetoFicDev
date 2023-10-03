import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';
import ChartComponent from '../../components/newchart';
import ModalPerfil from '../../components/modalPerfil';
import ConfirmationModal from '../../components/modalConfirmacao/index.jsx';
// import React, { PureComponent } from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function Usuarios() {
    const navigate = useNavigate();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [totalMedicos, setTotalMedicos] = useState();
    const [totalAtendentes, setTotalAtendentes] = useState();
    const [mostrarModal, setMostrarModal] = useState(false);
    const [nome, setNome] = useState('');
    const [cargo, setCargo] = useState('');
    const [especialidade, setEspecialidade] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isEditMode, setIsEditMode] = useState(false);
    const [userData, setUserData] = useState(null);
    const [editPassword, setEditPassword] = useState('');
    const [idUser, setIdUser] = useState([null]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [queryPacientes, setQueryPacientes] = React.useState('');
    let selectedPacientes = [];


    const idpaciente = (user) => {
        setIdUser(user.id_usuario);
        console.log("idpaciente: ", user.id_usuario);
        setIsModalOpen(true);

    }

    async function handlePesquisarPacientes() {
        if (queryPacientes) {
            console.log("queryPacientes: ", queryPacientes);
            selectedPacientes = selectedPacientes.filter(id => id !== pacientesData.id_paciente);
            const usersResponse = await api.get(`/listarPacientes/${page}?nome=${queryPacientes}`);
            const pacientesData = usersResponse.data.data;
            console.log(usersResponse)
            setUsers(pacientesData);

            const calculatedTotalPages = Math.ceil(pacientesData.count / 9);
            setTotalPages(calculatedTotalPages);
        }

        else if (!queryPacientes) {
            const usersResponse = await api.get(`/listarPacientes/${page}`);
            const pacientesData = usersResponse.data;
            setUsers(pacientesData.data);

            const calculatedTotalPages = Math.ceil(pacientesData.count / 9);
            setTotalPages(calculatedTotalPages);
        }


        else {
            console.error('Erro ao pesquisar o usuário:', queryPacientes);
        }
    };



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

    async function aumentarPacientes() {
        if (page < totalPages) {
            setPage(page + 1);
            console.log("PAGINA USUARIOS: ",page)
        }
    };

    const diminuirPacientes = () => {
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

    const handleDeleteUser = async (idUser) => {
        try {
            const accessToken = sessionStorage.getItem("token");
            const response = await api.delete(`/deletarUsuario/${idUser}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });

            if (response.status === 200 || response.status === 204) {
                setSelectedUsers(selectedUsers.filter(id => id !== idUser));
                const usersResponse = await api.get(`/listarUsuarios/${page}`);
                const userData = usersResponse.data;
                setUsers(userData.data);

                const calculatedTotalPages = Math.ceil(userData.count / 9);
                setTotalPages(calculatedTotalPages);
                setIsModalOpen(false);
            } else {
                console.error('Erro ao excluir o usuário:', response.data);
            }
        } catch (error) {
            console.error('Erro na solicitação:', error);
        }
    };

    const handleSaveUser = async () => {
        try {
            if (rePassword) {
                if (password !== rePassword) {
                    console.error('As senhas não correspondem.');
                    return;
                }
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

                const calculatedTotalPages = Math.ceil(userData.count / 9);
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
                console.log(response);
                const userData = response.data;
                setUsers(userData.data);
                const result = await api.get('/totalUsuarios');
                setTotalAtendentes(result.data.totalAtendentes.count);
                setTotalMedicos(result.data.totalMedicos.count);


                console.log('USERDATA.COUNT', userData.count)
                const calculatedTotalPages = Math.ceil(userData.count / 9);
                console.log(calculatedTotalPages)
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

    const tab1 = () => {
        const usuarios = document.getElementById('usuarios'); // Substitua 'agendamentos' pelo ID correto do elemento
        const dashboard = document.getElementById('dashboard'); // Substitua 'pacie' pelo ID correto do elemento

        usuarios.style.display = "none";
        dashboard.style.display = "block";
    }
    const tab2 = () => {
        const usuarios = document.getElementById('usuarios'); // Substitua 'agendamentos' pelo ID correto do elemento
        const dashboard = document.getElementById('dashboard'); // Substitua 'pacie' pelo ID correto do elemento

        usuarios.style.display = "block";
        dashboard.style.display = "none";
    }

    return (
        <div className={styles.geral} >
            <div className={styles.ATENDIMENTO}>
                <header>
                    <div className={styles.esq}>
                        <img alt="logo" src="logo.png" />
                        <div className={styles.header}>
                            <h1>usuarios</h1>
                        </div>
                    </div>
                    <div className={styles.navdiv}>
                        <ModalPerfil />
                        <div onClick={handleVoltarParaPaginaInicial} className={styles.profilecontainer}>
                            <img  alt="voltar" src="voltar.png" />
                            <div className={styles.profilecaption}>voltar</div>
                        </div>
                        <div onClick={handleSair} className={styles.profilecontainer}>
                            <img alt="sair" src="sair.png" />
                            <div className={styles.profilecaption}>sair</div>
                        </div>
                    </div>
                </header>
                <br />
                <div id="usuarios" style={{ display: "block" }}>
                    <button style={{ cursor: "pointer" }} onClick={tab2}>
                        usuarios
                    </button>
                    <button style={{ cursor: "pointer" }} onClick={tab1}>
                        dashboard
                    </button>
                    <div className={styles.bloco}>
                        <div className={styles.content}>
                            <div className={styles.pesquisa}>
                                <div className={styles.h1}>
                                    <h1>Pacientes</h1>
                                </div>
                                <div className={styles.inputGroup}>
                                    <input
                                        className={styles.formControl}
                                        placeholder="Pesquisar"
                                        value={queryPacientes}
                                        onChange={(e) => setQueryPacientes(e.target.value)}
                                    />

                                    <button onClick={handlePesquisarPacientes} className={styles.button}>
                                        Pesquisar
                                    </button>
                                    <button className={styles.button}>
                                        <button onClick={() => handleRecuperarSenhaClick(true)} className={styles.button}>adicionar</button>
                                        <img className={styles.search} alt="Search" src="adicao.png" />
                                    </button>
                                </div>
                            </div>

                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th className={styles.acoes}>Selecionar</th>
                                        <th className={styles.acoes}>NOME</th>
                                        <th className={styles.acoes}>CARGO</th>
                                        <th className={styles.acoes}>CPF</th>
                                        <th className={styles.acoes}>E-MAIL</th>
                                        <th className={styles.acoes}>EDITAR</th>
                                        <th className={styles.acoes}>EXCLUIR</th>
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
                                            <td className={styles.acoes}>{user.nome}</td>
                                            <td className={styles.acoes}>{user.cargo}</td>
                                            <td className={styles.acoes}>{user.cpf}</td>
                                            <td className={styles.acoes}>{user.email}</td>
                                            <td className={styles.acoes}>
                                                <button onClick={() => handleEditButtonClick(user)} className={styles.primaryButton}>
                                                    editar
                                                </button>
                                            </td>
                                            <td>
                                                <button onClick={() => idpaciente(user)}><img alt="deletar" src="lixo.png" /></button>
                                                <ConfirmationModal
                                                    isOpen={isModalOpen}
                                                    message="Tem certeza de que deseja excluir este item?"
                                                    onClose={() => setIsModalOpen(false)}
                                                    onConfirm={() => handleDeleteUser(idUser)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <footer>
                        <div className={styles.pagination}>
                            <button onClick={diminuirPacientes} className={styles.pageNumber}>
                                <img className={styles.circledRight} alt="Página Anterior" src="./Circled1.png" />
                            </button>
                            <button className={styles.pageNumber}>{page}</button>
                            <button onClick={aumentarPacientes} className={styles.pageNumber}>
                                <img className={styles.circledRight} alt="Próxima Página" src="./Circled.png" />
                            </button>
                        </div>
                    </footer>
                </div>
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
                <div id="dashboard" style={{ display: "none" }}>
                    <button style={{ cursor: "pointer" }} onClick={tab2}>
                        usuarios
                    </button>
                    <button style={{ cursor: "pointer" }} onClick={tab1}>
                        dashboard
                    </button>
                    <div className="App">
                        <h1>Meu Gráfico de Pizza</h1>
                        <ChartComponent />
                    </div>
                </div>
            </div>
        </div>
    );
}
