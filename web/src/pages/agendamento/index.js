import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import styles from './styles.module.css';

export function Agendamentos() {
    const [selectedAgendamentos, setSelectedAgendamentos] = useState([]);
    const [agendamentos, setAgendamentos] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [data, setData] = useState('');
    const [hora, setHora] = useState('');
    const [descricao, setDescricao] = useState('');
    const [local, setLocal] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isEditMode, setIsEditMode] = useState(false);
    const [agendamentoData, setAgendamentoData] = useState(null);

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

    function handleAgendamentoSelection(agendamentoId) {
        if (selectedAgendamentos.includes(agendamentoId)) {
            setSelectedAgendamentos(selectedAgendamentos.filter(id => id !== agendamentoId));
        } else {
            setSelectedAgendamentos([...selectedAgendamentos, agendamentoId]);
        }
    }

    const handleEditButtonClick = (agendamento) => {
        setIsEditMode(true);
        setAgendamentoData(agendamento);
        setMostrarModal(true);
    };

    async function handleDeleteAgendamento(agendamentoId) {
        try {
            const accessToken = sessionStorage.getItem("token");
            const response = await api.delete(`/deletarAgendamento/${agendamentoId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });

            if (response.status === 200 || response.status === 204) {
                setSelectedAgendamentos(selectedAgendamentos.filter(id => id !== agendamentoId));
                const agendamentosResponse = await api.get(`/listarAgendamentos/${page}`);
                const agendamentoData = agendamentosResponse.data;
                setAgendamentos(agendamentoData.data);

                const calculatedTotalPages = Math.ceil(agendamentoData.count / 5);
                setTotalPages(calculatedTotalPages);
            } else {
                console.error('Erro ao excluir o agendamento:', response.data);
            }
        } catch (error) {
            console.error('Erro na solicitação:', error);
        }
    }

    const handleSaveAgendamento = async () => {
        try {
            const updatedAgendamentoData = {
                data,
                hora,
                descricao,
                local,
            };

            const accessToken = sessionStorage.getItem("token");
            const response = isEditMode
                ? await api.put('/editarAgendamento', updatedAgendamentoData, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                : await api.post('/registerAgendamento', updatedAgendamentoData);

            if (response.status === 200 || response.status === 204) {
                console.log('Agendamento criado/editado com sucesso!', response.data);

                setSelectedAgendamentos(selectedAgendamentos.filter(id => id !== agendamentoData.id));
                const agendamentosResponse = await api.get(`/listarAgendamentos/${page}`);
                const agendamentoData = agendamentosResponse.data;
                setAgendamentos(agendamentoData.data);

                const calculatedTotalPages = Math.ceil(agendamentoData.count / 5);
                setTotalPages(calculatedTotalPages);

                setData('');
                setHora('');
                setDescricao('');
                setLocal('');
                setAgendamentoData(null);

                setMostrarModal(false);
                setIsEditMode(false);

                const updatedAgendamentos = agendamentos.map((agendamento) =>
                    agendamento.id === agendamentoData.id ? response.data : agendamento
                );
                setAgendamentos(updatedAgendamentos);
            } else {
                console.error('Erro ao criar/editar o agendamento:', response.data);
            }
        } catch (error) {
            console.error('Erro ao criar/editar o agendamento', error);
        }
    };

    useEffect(() => {
        const fetchAgendamentos = async () => {
            try {
                const response = await api.get(`/listarAgendamentos/${page}`);
                const agendamentoData = response.data;
                setAgendamentos(agendamentoData.data);

                const calculatedTotalPages = Math.ceil(agendamentoData.count / 5);
                setTotalPages(calculatedTotalPages);
            } catch (error) {
                console.error('Erro ao carregar agendamentos', error);
            }
        };

        fetchAgendamentos();
    }, [page]);

    return (
        <div className={styles.ADMINAGENDAMENTOS}>
            <h1>AGENDAMENTOS</h1>
            <br />
            <button onClick={() => handleRecuperarSenhaClick(true)}>Adicionar</button>
            <table>
                <thead>
                    <tr>
                        <th>Selecionar</th>
                        <th>ID</th>
                        <th>Data</th>
                        <th>Hora</th>
                        <th>Descrição</th>
                        <th>Local</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {agendamentos.map((agendamento, index) => (
                        <tr key={index}>
                            <td>
                                <input
                                    type="checkbox"
                                    onChange={() => handleAgendamentoSelection(agendamento.id)}
                                    checked={selectedAgendamentos.includes(agendamento.id)}
                                />
                            </td>
                            <td>{agendamento.id}</td>
                            <td>{agendamento.data}</td>
                            <td>{agendamento.hora}</td>
                            <td>{agendamento.descricao}</td>
                            <td>{agendamento.local}</td>
                            <td className={styles.button}>
                                <button onClick={() => handleEditButtonClick(agendamento)}>Editar</button>
                                <button onClick={() => handleDeleteAgendamento(agendamento.id)}>Deletar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={styles.page}>
                <div className={styles.diminuir}>
                    <button onClick={() => diminuir()}>Diminuir</button>
                </div>
                <div>
                    <p id='page'>{page}</p>
                </div>
                <div className={styles.aumentar}>
                    <button onClick={() => aumentar()}>Aumentar</button>
                </div>
            </div>
            {mostrarModal && (
                <div className={styles.modal}>
                    <div className={styles.adicionar}>
                        <div>
                            <h4>{isEditMode ? 'Editar Agendamento' : 'Adicionar Agendamento'}</h4>
                            <div className={styles.inputcontainer1}>
                                <input
                                    type="text"
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
                            </div>
                        </div>
                        <div className={styles.contmodal}>
                            <div className={styles.inputcontainer}>
                                <input
                                    type="text"
                                    placeholder="Hora"
                                    value={isEditMode ? agendamentoData.hora : hora}
                                    onChange={(e) => {
                                        if (isEditMode) {
                                            setAgendamentoData({ ...agendamentoData, hora: e.target.value });
                                        } else {
                                            setHora(e.target.value);
                                        }
                                    }}
                                />
                                <input
                                    type="text"
                                    placeholder="Descrição"
                                    value={isEditMode ? agendamentoData.descricao : descricao}
                                    onChange={(e) => {
                                        if (isEditMode) {
                                            setAgendamentoData({ ...agendamentoData, descricao: e.target.value });
                                        } else {
                                            setDescricao(e.target.value);
                                        }
                                    }}
                                />
                                <input
                                    type="text"
                                    placeholder="Local"
                                    value={isEditMode ? agendamentoData.local : local}
                                    onChange={(e) => {
                                        if (isEditMode) {
                                            setAgendamentoData({ ...agendamentoData, local: e.target.value });
                                        } else {
                                            setLocal(e.target.value);
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <button onClick={isEditMode ? () => handleSaveAgendamento(agendamentoData.id) : handleSaveAgendamento}>
                            {isEditMode ? 'Salvar' : 'Adicionar'}
                        </button>
                        <p onClick={() => setMostrarModal(false)}>Cancelar</p>
                    </div>
                </div>
            )}
        </div>
    );
}
