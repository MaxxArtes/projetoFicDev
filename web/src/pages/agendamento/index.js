import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';
import { ModalAgendamento } from '../../components/modalagendamento/modalAgendamento.js';
import { ModalCadastrarPaciente } from '../../components/modalpaciente/modalPaciente';

export function Agendamentos() {

    const navigate = useNavigate();
    const [mostrarAgendamentoModal, setMostrarAgendamentoModal] = useState(false);
    const [mostrarCadastroPacienteModal, setMostrarCadastroPacienteModal] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [agendamentos, setAgendamentos] = useState([]);
    const [selectedAgendamentos, setSelectedAgendamentos] = useState([]);
    // const [userData, setUserData] = useState(null);
    // const [agendamento]

    const handleVoltarParaPaginaInicial = () => {
        navigate('/PaginaInicial');
    };

    

    function handleAgendamentoSelection(agendamentoId) {
        if (selectedAgendamentos.includes(agendamentoId)) {
          setSelectedAgendamentos(selectedAgendamentos.filter(id => id !== agendamentoId));
        } else {
          setSelectedAgendamentos([...selectedAgendamentos, agendamentoId]);
        }
      }

    const handleAgendarClick = () => {
        setMostrarAgendamentoModal(true);
    };

    const handleSair = () => {
        sessionStorage.removeItem('token'); // Remova o token do sessionStorage
        navigate('/');
    };

    const handleRecuperarSenhaClick = () => {
        setMostrarCadastroPacienteModal(true);
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

    

    useEffect(() => {
        const fetchagendamentos = async () => {
            try {
                const response = await api.get(`/agendamentos/1`);
                console.log(response);
                const userData = response.data[0];
                setAgendamentos(userData);
                const calculatedTotalPages = Math.ceil(userData.count / 5);
                setTotalPages(calculatedTotalPages);
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
                        <input className={styles.formControl} placeholder="Pesquisar" />
                        <button className={styles.button}>
                            <button className={styles.button} onClick={handleRecuperarSenhaClick}>Cadastrar Paciente</button>
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
                                    <input
                                        type="checkbox"
                                        onChange={() => handleAgendamentoSelection(agendamentoItem.id_agendamento)}
                                        checked={selectedAgendamentos.includes(agendamentoItem.id_agendamento)}
                                    />
                                </td>
                                <td>{agendamentoItem.id_agendamento} / {agendamentoItem.id_paciente}</td>                                                                
                                <td>{agendamentoItem.nome}</td>
                                <td>{agendamentoItem.nome_medico}</td>
                                <td>{agendamentoItem.especialidade}</td>
                                <td>{agendamentoItem.data}</td>
                                <td>{agendamentoItem.horario}</td>
                                <td>
                                    <button className={styles.primaryButton} onClick={() => handleAgendarClick(agendamentoItem.id_agendamento)}>Agendar</button>
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
            {mostrarAgendamentoModal && (
                <ModalAgendamento mostrarModal={mostrarAgendamentoModal} onClose={() => setMostrarAgendamentoModal(false)} />
            )}
            {mostrarCadastroPacienteModal && (
                <ModalCadastrarPaciente mostrarModal={mostrarCadastroPacienteModal} onClose={() => setMostrarCadastroPacienteModal(false)} />
            )}

        </div>
    );
}
