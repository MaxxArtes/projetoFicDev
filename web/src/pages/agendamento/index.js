import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns'; // Importe a função de formatação de datas

export function Agendamentos() {
    const navigate = useNavigate();
    const [selectedPacientes, setSelectedPacientes] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [query, setQuery] = useState(''); // Estado para armazenar o valor da consulta
    const [nomeMedico, setNomeMedico] = useState('');
    const [especialidade, setEspecialidade] = useState('');
    const [data, setData] = useState('');
    const [horario, setHorario] = useState('');
    const [unidadeSaude, setUnidadeSaude] = useState('');
    const [agendamentoData, setAgendamentoData] = useState(null);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const handleVoltarParaPaginaInicial = () => {
        navigate('/PaginaInicial');
    };
    


    const handleSearchClick = (query) => {
        setQuery(query);
        setPage(1); // Volta para a primeira página ao iniciar uma nova pesquisa
    };

    const handleSair = () => {
        sessionStorage.removeItem('token'); // Remova o token do sessionStorage
        navigate('/');
    };

    const handleEditButtonClick = (agendamento) => {
        setIsEditMode(true);
        setAgendamentoData(agendamento);
        setMostrarModal(true);
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

    function handlePacienteSelection(pacienteId) {
        if (selectedPacientes.includes(pacienteId)) {
            setSelectedPacientes(selectedPacientes.filter(id => id !== pacienteId));
        } else {
            setSelectedPacientes([...selectedPacientes, pacienteId]);
        }
    }

    const handleEditAgendamento = async (agendamentoId) => {
        try {
            const accessToken = sessionStorage.getItem("token");
            const response = await api.get(`/editarAgendamento/${agendamentoId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
    
            if (response.status === 200) {
                const agendamentoData = response.data;
    
                // Defina os valores dos campos do modal com os dados do agendamento
                setNomeMedico(agendamentoData.nome_medico);
                setEspecialidade(agendamentoData.especialidade);
                setData(agendamentoData.data);
                setHorario(agendamentoData.horario);
                setUnidadeSaude(agendamentoData.unidade_saude);
    
                // Outras configurações necessárias, como definir o estado de edição e userData, e mostrar o modal
                setAgendamentoData(agendamentoData);
                setIsEditMode(true);
                setMostrarModal(true);
            } else {
                console.error('Erro ao editar o agendamento:', response.data);
            }
        } catch (error) {
            console.error('Erro ao editar o agendamento:', error);
        }
    };

    const handleSubmit = async () => {
        try {
            if (nomeMedico && especialidade && data && horario && unidadeSaude) {
                const agendamentoData = {
                    nome_medico: nomeMedico,
                    especialidade: especialidade,
                    data: data,
                    horario: horario,
                    unidade_saude: unidadeSaude,
                };
    
                const accessToken = sessionStorage.getItem("token");
                const response = await api.post('/registerAgendamento', agendamentoData, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
    
                if (response.status === 200 || response.status === 201) {
                    console.log('Agendamento registrado com sucesso!', response.data);
    
                    // Limpe os campos após a conclusão
                    setNomeMedico('');
                    setEspecialidade('');
                    setData('');
                    setHorario('');
                    setUnidadeSaude('');
                    setAgendamentoData(null);
    
                    setMostrarModal(false);
                } else {
                    console.error('Erro ao registrar o agendamento:', response.data);
                }
            } else {
                console.error('Por favor, preencha todos os campos obrigatórios.');
            }
        } catch (error) {
            console.error('Erro ao registrar o agendamento:', error);
        }
    };
    
    

    const handleSaveAgendamento = async () => {
        try {
            const updatedAgendamentoData = {
                nome_medico: isEditMode ? agendamentoData.nome_medico : nomeMedico,
                especialidade: isEditMode ? agendamentoData.especialidade : especialidade,
                data: isEditMode ? agendamentoData.data : data,
                horario: isEditMode ? agendamentoData.horario : horario,
                unidade_saude: isEditMode ? agendamentoData.unidade_saude : unidadeSaude,
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
                // Atualize a lista de agendamentos após a conclusão
                const agendamentosResponse = await api.get('/listarAgendamento');
                const agendamentoData = agendamentosResponse.data;
                setAgendamentoData(agendamentoData);
    
                // Limpe os campos após a conclusão
                setNomeMedico('');
                setEspecialidade('');
                setData('');
                setHorario('');
                setUnidadeSaude('');
                setAgendamentoData(null);
                setMostrarModal(false);
                setIsEditMode(false);
            } else {
                console.error('Erro ao criar/editar o agendamento:', response.data);
            }
        } catch (error) {
            console.error('Erro ao criar/editar agendamento:', error);
        }
    };
    

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get(`/listarPacientes/${page}?nome=${query}`);
                const userData = response.data;
                setPacientes(userData.data);

                const calculatedTotalPages = Math.ceil(userData.count / 5);
                setTotalPages(calculatedTotalPages);
            } catch (error) {
                console.error('Erro ao buscar usuários', error);
            }
        };

        fetchUsers();
    }, [page, query]);

    return (
        <div className={styles.ATENDIMENTO}>
            <header>
                <div>
                    <img alt="voltar" src="Account.png" />
                </div>
                <div className={styles.header}>
                    <h1>Atendimento</h1>
                </div>
                <div className={styles.navdiv}>
                    <img onClick={handleVoltarParaPaginaInicial} alt="voltar" src="Arrow.png" />
                    <img alt="voltar" src="Account.png" />
                    <img onClick={handleSair} alt="voltar" src="sair.png" />
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
                        <button className={styles.button} onClick={() => handleSearchClick(query)}>
                            Pesquisar
                        </button>
                        <button className={styles.button}>
                            <p1 onClick={() => handleRecuperarSenhaClick(true)}>cadastrar</p1>
                            <img className={styles.search} alt="Search" src="adicao.png" />
                        </button>
                    </div>
                </div>

                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Selecionar</th>
                            <th>Nome do Paciente</th>
                            <th>e-mail</th>
                            <th>tel</th>
                            <th>cel</th>
                            <th>Data de Nascimento</th>
                            <th>CNS</th>
                            <th>CPF</th>
                            <th>sexo</th>
                            <th>Agendar</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pacientes.map(paciente => (
                            <tr key={paciente.id_paciente}>
                                <td className={styles.acoes}>
                                    <input className={styles.tablevalues}
                                        type="checkbox"
                                        onChange={() => handlePacienteSelection(paciente.id_paciente)}
                                        checked={selectedPacientes.includes(paciente.id_paciente)}
                                    />
                                </td>
                                <td className={styles.tablevalues}>{paciente.nome}</td>
                                <td className={styles.tablevalues}>{paciente.email}</td>
                                <td className={styles.tablevalues}>{paciente.tel}</td>
                                <td className={styles.tablevalues}>{paciente.cel}</td>
                                <td className={styles.tablevalues}>{format(new Date(paciente.data_nasc), 'dd/MM/yyyy')}</td>
                                <td className={styles.tablevalues}>{paciente.CNS}</td>
                                <td className={styles.tablevalues}>{paciente.CPF}</td>
                                <td>
                                    <button className={styles.primaryButton}>Agendar</button>
                                </td>
                                <td>
                                    <img alt="Editar" src="edit.png" />
                                    <img alt="Excluir" src="lixo.png" />
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
                    <button onClick={aumentar} className={styles.pageNumber}>{page}</button>
                    <button onClick={aumentar} className={styles.pageNumber}>
                        <img className={styles.circledRight} alt="Próxima Página" src="./Circled.png" />
                    </button>
                </div>
            </footer>

            {mostrarModal && (
                <div className={styles.modal}>
                    {mostrarModal && (
    <div className={styles.modal}>
        <div className={styles.adicionar}>
            <h4>{isEditMode ? 'Editar Usuário' : 'Adicionar Usuário'}</h4>
            <div className={styles.contmodal}>
                <div className={styles.inputcontainer}>
                    {/* ... Outros campos existentes ... */}
                    <input
                        type="text"
                        placeholder="Nome do Médico"
                        value={isEditMode ? agendamentoData.nome_medico : nomeMedico}
                        onChange={(e) => {
                            if (isEditMode) {
                                setAgendamentoData({ ...agendamentoData, nome_medico: e.target.value });
                            } else {
                                setNomeMedico(e.target.value);
                            }
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Especialidade"
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
                        type="date"
                        placeholder="Data"
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
                        type="time"
                        placeholder="Horário"
                        value={isEditMode ? agendamentoData.horario : horario}
                        onChange={(e) => {
                            if (isEditMode) {
                                setAgendamentoData({ ...agendamentoData, horario: e.target.value });
                            } else {
                                setHorario(e.target.value);
                            }
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Unidade de Saúde"
                        value={isEditMode ? agendamentoData.unidade_saude : unidadeSaude}
                        onChange={(e) => {
                            if (isEditMode) {
                                setAgendamentoData({ ...agendamentoData, unidade_saude: e.target.value });
                            } else {
                                setUnidadeSaude(e.target.value);
                            }
                        }}
                    />
                </div>
                {/* ... Outros campos existentes ... */}
            </div>
            <div className={styles.botao}>
                <button onClick={isEditMode ? () => handleEditAgendamento(agendamentoData.id_agendamento) : handleSubmit}>
                    {isEditMode ? 'Salvar' : 'Adicionar'}
                </button>
                <p onClick={() => setMostrarModal(false)}>cancelar</p>
            </div>
        </div>
    </div>
)}

                </div>
            )}
        </div>
    );
}
