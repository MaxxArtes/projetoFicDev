import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';


export function Agendamentos() {

    const navigate = useNavigate();
    const [mostrarModal, setMostrarModal] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [agendamentos, setAgendamentos] = useState([]);
    const [query, setQuery] = useState('');
    const [agendamentoData, setAgendamentoData] = useState(null);
    const [nomeMedico, setNomeMedico] = useState(agendamentoData ? agendamentoData.nomeMedico : '');
    const [data, setData] = useState(agendamentoData ? agendamentoData.data : '');
    const [especialidade, setEspecialidade] = useState(agendamentoData ? agendamentoData.especialidade : '');
    const [hora, setHora] = useState(agendamentoData ? agendamentoData.hora : '');
    const [isEditMode, setIsEditMode] = useState(false);
    const [nome, setNome] = useState('');
    const [selectedAgendamentos, setSelectedAgendamentos] = useState([]);


    const handleVoltarParaPaginaInicial = () => {
        navigate('/PaginaInicial');
    };
    const handleSair = () => {
        sessionStorage.removeItem('token'); // Remova o token do sessionStorage
        navigate('/');
    };
    const handleAgendamentoSelection = (userId) => {
        if (setSelectedAgendamentos.includes(userId)) {
            setSelectedAgendamentos(selectedAgendamentos.filter(id => id !== userId));
        } else {
            setSelectedAgendamentos([...selectedAgendamentos, userId]);
        }
    };
    const handleregistrarClick = () => {
        setMostrarModal(true);
    };

    async function aumentar() {
        if (page <  totalPages) {
            setPage(page + 1);
            console.log('aumentar: ', page);
        }
    };
    const diminuir = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };
    const handleSubmit = async () => {
        try {
            if (nome && nomeMedico && especialidade && data && hora) {

                const agendamentoData = {
                    nome,
                    nomeMedico,
                    especialidade,
                    data,
                    hora,
                };

                const response = await api.post('/registerAgendamento', agendamentoData);

                console.log('Agendamento registrado com sucesso!', response.data);

                // Limpe os campos após a conclusão
                setNome('');
                setNomeMedico('');
                setEspecialidade('');
                setData('');
                setHora('');
                setAgendamentoData(null);
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
                setSelectedAgendamentos(setSelectedAgendamentos.filter(id => id !== agendamentoData.id_usuario));
                const usersResponse = await api.get(`/agendamentos/${page}`);
                const agendamentoData = usersResponse.data;
                setAgendamentos(agendamentoData.data);


                const calculatedTotalPages = Math.ceil(agendamentoData.count / 5);
                setTotalPages(calculatedTotalPages);
            } else {
                console.error('Erro ao editar o usuário:', response.data);
            }

            // Limpe os campos após a conclusão
            setNome('');
            setNomeMedico('');
            setEspecialidade('');
            setData('');
            setHora('');
            setAgendamentoData(null);
            setMostrarModal(false);
            setIsEditMode(false);

        } catch (error) {
            console.error('Erro ao editar usuário', error);
        }
    };







    // function handleAgendamentoSelection(agendamentoId) {
    //     if (selectedAgendamentos.includes(agendamentoId)) {
    //         setSelectedAgendamentos(selectedAgendamentos.filter(id => id !== agendamentoId));
    //     } else {
    //         setSelectedAgendamentos([...selectedAgendamentos, agendamentoId]);
    //     }
    // }




    const handleEditButtonClick = (agendamento) => {
        setIsEditMode(true);
        setAgendamentoData(agendamento);
        setMostrarModal(true);
    };

    // const handleRecuperarSenhaClick = () => {
    //     setMostrarCadastroPacienteModal(true);
    // };


    useEffect(() => {
        const fetchagendamentos = async () => {
            try {
                const response = await api.get(`/agendamentos/${page}`);
                console.log(response);
                const agendamentoData = response.data.data;
                setAgendamentos(agendamentoData);
                console.log('agendamento data : ', agendamentoData);

                const calculatedTotalPages = Math.ceil(response.data.count / 10);
                setTotalPages(calculatedTotalPages);
                console.log('total pages : ', calculatedTotalPages);
                if (!response.ok) {
                    throw new Error('Erro ao buscar agendamentos');
                }
                const agendamentosData = await response.json();
                setAgendamentos(agendamentosData); // Define os agendamentos no estado
            } catch (error) {
                console.error(error);
                // Tratar erros (exemplo: exibir uma mensagem de erro na sua página web)
            }
        };

        fetchagendamentos();
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
                            onChange={(e) => setQuery(e.target.value)}
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
                        {agendamentos.map(agendamentoItem => (
                            <tr key={agendamentoItem.id_agendamento}>
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
                                    <button onClick={() => handleregistrarClick(true)} className={styles.button}>agendar</button>
                                </td>
                                <td>
                                    <img onClick={handleEditButtonClick(true)} alt="Editar" src="edit.png" />
                                    <img  alt="Excluir" src="lixo.png" />
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
                                            setAgendamentoData({ ...agendamentoData, nome: e.target.value });
                                        } else {
                                            setNome(e.target.value);
                                        }
                                    }}
                                />
                                <input
                                    type="text"
                                    placeholder="Digite o nome do medico"
                                    value={isEditMode ? agendamentoData.nomeMedico : nomeMedico}
                                    onChange={(e) => {
                                        if (isEditMode) {
                                            setAgendamentoData({ ...agendamentoData, especialidade: e.target.value });
                                        } else {
                                            setNomeMedico(e.target.value);
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
                                        setAgendamentoData({ ...agendamentoData, data: e.target.value });
                                    } else {
                                        setData(e.target.value);
                                    }
                                }}
                            />
                            <input
                                type="text"
                                placeholder="Digite sua especialização"
                                value={isEditMode ? agendamentoData.especialidade : especialidade}
                                onChange={(e) => {
                                    if (isEditMode) {
                                        setAgendamentoData({ ...agendamentoData, especialidade: e.target.value });
                                    } else {
                                        setEspecialidade(e.target.value);
                                    }
                                }}
                            />
                            <input
                                type="time"
                                placeholder="Digite a hora da consulta"
                                value={isEditMode ? agendamentoData.especialidade : hora}
                                onChange={(e) => {
                                    if (isEditMode) {
                                        setAgendamentoData({ ...agendamentoData, hora: e.target.value });
                                    } else {
                                        setHora(e.target.value);
                                    }
                                }}
                            />
                        </div>
                        <div className={styles.botao}>
                            <button onClick={isEditMode ? () => handleSaveUser(agendamentoData.id_agendamento) : handleSubmit}>
                                {isEditMode ? 'Salvar' : 'Adicionar'}
                            </button>
                            <p onClick={() => setMostrarModal(false)}>cancelar</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}