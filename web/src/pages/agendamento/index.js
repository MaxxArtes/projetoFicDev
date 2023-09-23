import React, { useEffect } from 'react';
import { api } from '../../services/api';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';

export function Agendamentos() {
    let [agendamentos, setAgendamentos] = React.useState([]);
    let [totalPages, setTotalPages] = React.useState(0);
    const [page, setPage] = React.useState(1);
    const navigate = useNavigate();
    let [mostrarModal, setMostrarModal] = React.useState(false);
    let query = '';
    let [agendamentoData, setAgendamentoData] = React.useState(null);
    let nomeMedico = '';
    let data = '';
    let especialidade = '';
    let hora = '';
    let [isEditMode, setIsEditMode] = React.useState(false);
    let nome = '';
    let selectedAgendamentos = [];

    const handleVoltarParaPaginaInicial = () => {
        navigate('/PaginaInicial');
    };

    const handleSair = () => {
        sessionStorage.removeItem('token');
        navigate('/');
    };

    const handleAgendamentoSelection = (userId) => {
        if (selectedAgendamentos.includes(userId)) {
            selectedAgendamentos = selectedAgendamentos.filter(id => id !== userId);
        } else {
            selectedAgendamentos = [...selectedAgendamentos, userId];
        }
    };

    const handleregistrarClick = () => {
        setIsEditMode(false);
        setMostrarModal(true);
    };

    async function aumentar() {
        if (page < totalPages) {
            setPage(page + 1);
            console.log('aumentar: ', page);
            console.log('total: ', totalPages);
        }
    }

    const diminuir = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleSubmit = async () => {
        try {
            if (nome && nomeMedico && especialidade && data && hora) {
                let agendamentoData = {
                    nome,
                    nomeMedico,
                    especialidade,
                    data,
                    hora,
                };

                const response = await api.post('/registerAgendamento', agendamentoData);

                console.log('Agendamento registrado com sucesso!', response.data);

                // Limpar os campos após a conclusão
                nome = '';
                nomeMedico = '';
                especialidade = '';
                data = '';
                hora = '';
                setAgendamentoData(null)
                setMostrarModal(false);
                setIsEditMode(false);

                setMostrarModal(false);
            } else {
                console.error('Por favor, preencha todos os campos.');
            }
        } catch (error) {
            console.error('Erro ao registrar Agendamento', error);
        }
    };

    const handleSaveUser = async () => {
        try {
            const updatedAgendamentoData = {
                nome: isEditMode ? agendamentoData.nome : nome,
                nomeMedico: isEditMode ? agendamentoData.nomeMedico : nomeMedico,
                especialidade: isEditMode ? agendamentoData.especialidade : especialidade,
                data: isEditMode ? agendamentoData.data : data,
                hora: isEditMode ? agendamentoData.hora : hora,
            };

            const accessToken = sessionStorage.getItem("token");
            const response = isEditMode
                ? await api.put(`/editarAgendamento/${agendamentoData.id_agendamento}`, updatedAgendamentoData, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                : await api.post('/registerAgendamento', updatedAgendamentoData);

            if (response.status === 200 || response.status === 204) {
                selectedAgendamentos = selectedAgendamentos.filter(id => id !== agendamentoData.id_usuario);
                const usersResponse = await api.get(`/agendamentos/${page}`);
                const agendamentoData = usersResponse.data;
                agendamentos = agendamentoData.data;

                const calculatedTotalPages = Math.ceil(agendamentoData.count / 5);
                totalPages = calculatedTotalPages;
            } else {
                console.error('Erro ao editar o usuário:', response.data);
            }

            // Limpar os campos após a conclusão
            nome = '';
            nomeMedico = '';
            especialidade = '';
            data = '';
            hora = '';
            setAgendamentoData(null)
            setMostrarModal(false);
            setIsEditMode(false);
            if (handleSaveUser()) {
                return
            };

        } catch (error) {
            console.error('Erro ao editar usuário', error);
        }
    };

    const handleEditButtonClick = (agendamentoItem) => {
        console.log('agendamento', agendamentoItem);
        setIsEditMode(true);
        setAgendamentoData(agendamentoItem);
        setMostrarModal(true);

    };

    useEffect(() => {
        const fetchAgendamentos = async () => {
            try {
                const response = await api.get(`/agendamentos/${page}`);
                console.log(response);
                const agendamentoData = response.data.data;
                setAgendamentos(agendamentoData); // Atualize o estado usando setAgendamentos
                console.log('agendamento data : ', agendamentoData);

                const calculatedTotalPages = Math.ceil(response.data.count / 10);
                setTotalPages(calculatedTotalPages); // Atualize o estado usando setTotalPages
                console.log('total pages : ', calculatedTotalPages);
                if (!response.ok) {
                    throw new Error('Erro ao buscar agendamentos');
                }

            } catch (error) {
                console.error(error);
            }
        };

        fetchAgendamentos();

    }, [page]);

    return (
        <div className={styles.ATENDIMENTO}>
            <header>
                <div className={styles.esq}>
                    <img alt="voltar" src="logo.png" />
                    <div className={styles.header}>
                        <h1>Atendimento</h1>
                    </div>
                </div>
                <div className={styles.navdiv}>
                    <img onClick={handleVoltarParaPaginaInicial} alt="voltar" src="voltar.png" />
                    <img alt="perfil" src="perfil.png" />
                    <img onClick={handleSair} alt="sair" src="sair.png" />
                </div>
            </header>

            <div className={styles.content}>
                <div className={styles.pesquisa}>
                    <div className={styles.h1}>
                        <h1>Agendamentos</h1>
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            className={styles.formControl}
                            placeholder="Pesquisar"
                            value={query}
                            onChange={(e) => query = e.target.value}
                        />
                        <button className={styles.button} >
                            Pesquisar
                        </button>
                        <button className={styles.button}>
                            <button className={styles.button} >Cadastrar Paciente</button>
                            <img className={styles.search} alt="Search" src="adicao.png" />
                        </button>
                    </div>
                </div>

                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Selecionar</th>
                            <th>id_a/id_p</th>
                            <th>Nome do Paciente</th>
                            <th>Nome do Medico</th>
                            <th>Data</th>
                            <th>Especialidade</th>
                            <th>Hora</th>
                            <th>Agendar</th>
                            <th>Ação</th>
                        </tr>
                    </thead>

                    <tbody>
                        {agendamentos.map((agendamentoItem, index) => (
                            <tr key={index}>
                                <td className={styles.acoes}>
                                    <input className={styles.tablevalues}
                                        type="checkbox"
                                        onChange={() => handleAgendamentoSelection(agendamentoItem.id_agendamento)}
                                        checked={selectedAgendamentos.includes(agendamentoItem.id_agendamento)}
                                    />
                                </td>
                                <td>{agendamentoItem.id_agendamento} / {agendamentoItem.id_paciente}</td>
                                <td>{agendamentoItem.nome_paciente}</td>
                                <td>{agendamentoItem.nome_medico}</td>
                                <td>{agendamentoItem.especialidade}</td>
                                <td>{agendamentoItem.data}</td>
                                <td>{agendamentoItem.horario}</td>
                                <td className={styles.agendar}>
                                    <button onClick={() => handleregistrarClick(agendamentoItem.id_agendamento)} className={styles.button}>agendar</button>
                                </td>
                                <td>
                                    <button>
                                        <img onClick={() => handleEditButtonClick(agendamentoItem.id_agendamento)} alt="Editar" src="edit.png" />
                                    </button>
                                    <button>
                                        {/* onClick={() => handleDeleteUser(user.id_usuario)} */}
                                        <img alt="Excluir" src="lixo.png" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <footer>
                <div className={styles.pagination}>
                    <button onClick={diminuir} className={styles.pageNumber}>
                        <img className={styles.circledRight} alt="Página Anterior" src="./Circled1.png" />
                    </button>
                    <button className={styles.pageNumber}>{page}</button>
                    <button onClick={aumentar} className={styles.pageNumber}>
                        <img className={styles.circledRight} alt="Próxima Página" src="./Circled.png" />
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
                                    value={isEditMode ? agendamentoData.nome : nome}
                                    onChange={(e) => {
                                        if (isEditMode) {
                                            agendamentoData = { ...agendamentoData, nome: e.target.value };
                                        } else {
                                            nome = e.target.value;
                                        }
                                    }}
                                />
                                <input
                                    type="text"
                                    placeholder="Digite o nome do medico"
                                    value={isEditMode ? agendamentoData.nomeMedico : nomeMedico}
                                    onChange={(e) => {
                                        if (isEditMode) {
                                            agendamentoData = { ...agendamentoData, especialidade: e.target.value };
                                        } else {
                                            nomeMedico = e.target.value;
                                        }
                                    }}
                                />
                            </div>
                            <input
                                type="date"
                                placeholder="Digite seu CPF"
                                value={isEditMode ? agendamentoData.data : data}
                                onChange={(e) => {
                                    if (isEditMode) {
                                        agendamentoData = { ...agendamentoData, data: e.target.value };
                                    } else {
                                        data = e.target.value;
                                    }
                                }}
                            />
                            <input
                                type="text"
                                placeholder="Digite sua especialização"
                                value={isEditMode ? agendamentoData.especialidade : especialidade}
                                onChange={(e) => {
                                    if (isEditMode) {
                                        agendamentoData = { ...agendamentoData, especialidade: e.target.value };
                                    } else {
                                        especialidade = e.target.value;
                                    }
                                }}
                            />
                            <input
                                type="time"
                                placeholder="Digite a hora da consulta"
                                value={isEditMode ? agendamentoData.hora : hora}
                                onChange={(e) => {
                                    if (isEditMode) {
                                        agendamentoData = { ...agendamentoData, hora: e.target.value };
                                    } else {
                                        hora = e.target.value;
                                    }
                                }}
                            />
                        </div>
                        <div className={styles.botao}>
                            <button onClick={isEditMode ? () => handleSaveUser(agendamentoData) : handleSubmit}>
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
