import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import ModalPerfil from '../../components/modalPerfil';

export function PaginaInicial() {
    const navigate = useNavigate();
    const [mostrarModal, setMostrarModal] = useState(false);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [userData, setUserData] = useState(null);
    const [users, setUsers] = useState([]);


    async function handleVoltarParaPaginaInicial() {
        window.location.reload();
    };
    const handleSair = () => {
        sessionStorage.removeItem('token');
        navigate('/');
    };

    const handleEditButtonClick = (user) => {
        setUserData(user);
        setMostrarModal(true);
    };

    const handleSaveUser = async () => {
        try {
            if (!password || !rePassword) {
                setPassword(userData ? userData.password : '');
                setRePassword(userData ? userData.password : '');
            } else if (password !== rePassword) {
                throw new Error('As senhas não correspondem.');
            }

            const updatedUserData = {
                nome: userData ? userData.nome : nome,
                email: userData ? userData.email : email,
                password: userData ? userData.password : password,
            };

            const accessToken = sessionStorage.getItem('token');
            const usersResponse = await api.put(`/editarUsuario/${userData.id_usuario}`, updatedUserData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (usersResponse.status === 200 || usersResponse.status === 204) {
                alert("Usuario atalizado com sucesso!!")
                handleVoltarParaPaginaInicial(nome)
                setMostrarModal(false);
                setEmail("")
            } else {
                throw new Error(`Erro ao editar o usuário: ${usersResponse.data}`);
            }
        } catch (error) {
            console.error('Erro ao editar usuário', error);
            // Exiba uma mensagem de erro amigável ao usuário aqui em vez de apenas no console
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Verifique se o email está no sessionStorage
                const userEmail = sessionStorage.getItem('userEmail'); // Troque 'email' pela chave correta no seu sessionStorage

                console.log('USEREMAIL2: ', userEmail);

                if (userEmail) {
                    // Faça uma chamada à API para verificar se o email existe na tabela de usuários
                    const response = await api.get(`/verificarUsuarioPorEmail/${userEmail}`); // Substitua com a rota correta em sua API
                    const userData = response.data;
                    console.log('USEREMAIL3: ', userEmail);

                    if (userData) {
                        // Se o email existir na tabela de usuários, configure o estado 'nome' com o nome correspondente
                        setNome(userData.nome);
                    }
                }
            } catch (error) {
                console.error('Erro ao verificar o usuário', error);
            }
        };

        fetchUserData();
    }, []); // Coloque um array vazio para que este useEffect seja executado apenas uma vez ao montar o componente

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get(`/buscarUsuarioPorNome/${nome}`);
                console.log(response);
                const userData = response.data;

                // Certifique-se de que userData é um único usuário, não uma lista de usuários
                if (userData) {
                    setUsers([userData]); // Coloque os dados do usuário em um array para ser compatível com users.map
                }
            } catch (error) {
                console.error('Erro ao fazer login', error);
            }
        };

        fetchUsers();
    }, [nome]);


    return (
        <div className={styles.paginainicial}>

            <header>
                <div className={styles.navdiv1}>
                    <div onClick={() => handleVoltarParaPaginaInicial(nome)} className={styles.imagem}><img alt="voltar" src="logo.png" />
                    </div>
                    <div className={styles.navdiv}>
                        <table className={styles.table}>
                            <h1>paginainicial</h1>

                            <div className={styles.header}>
                                <tbody>
                                    {users.map((user, index) => (
                                        <tr key={index} style={{ display: 'flex', alignItems: 'center' }}>
                                            {/* <td className={styles.acoes}>{user.id_usuario}</td> */}
                                            <td className={styles.acoes}>{user.nome}</td>
                                            <td className={styles.acoes}>{user.email}</td>
                                            <td className={styles.button}>
                                                <ModalPerfil />
                                            </td>
                                            <td>
                                                <img onClick={handleSair} alt="sair" src="sair.png" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </div>
                        </table>
                    </div>
                </div>

            </header>
            <div className={styles.overlapgroup}>
                <Link to="/Agendamentos">
                    <button className={styles.rectangle}>atendimento</button>
                </Link>
                <Link to="/Consultas">
                    <button className={styles.rectangle1}>consulta</button>
                </Link>
                <Link to="/Usuarios/">
                    <button className={styles.rectangle}>adm</button>
                </Link>
            </div>
            {mostrarModal && (
                <div className={styles.modal}>
                    <div className={styles.adicionar}>
                        <h4>Editar Usuário</h4>
                        <div className={styles.contmodal}>
                            <div className={styles.inputcontainer}>
                                <input
                                    type="text"
                                    placeholder="Digite seu nome"
                                    value={userData ? userData.nome : nome}
                                    onChange={(e) => {
                                        setUserData({ ...userData, nome: e.target.value });
                                    }}
                                />
                            </div>
                            <div className={styles.inputcontainer}>
                                <input
                                    type="email"
                                    placeholder="Digite seu email"
                                    value={userData ? userData.email : email}
                                    onChange={(e) => {
                                        setUserData({ ...userData, email: e.target.value });
                                    }}
                                />
                                <input
                                    type="password"
                                    placeholder="Digite sua senha"
                                    value={userData ? userData.password : password}
                                    onChange={(e) => {
                                        setUserData({ ...userData, password: e.target.value });
                                    }}
                                />
                                <input
                                    type="password"
                                    placeholder="Digite novamente sua senha"
                                    value={rePassword}
                                    onChange={(e) => {
                                        setRePassword(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className={styles.botao}>
                            <button onClick={handleSaveUser}>Salvar</button>
                            <p onClick={() => setMostrarModal(false)}>Cancelar</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
