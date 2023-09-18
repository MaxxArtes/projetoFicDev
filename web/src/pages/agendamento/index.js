import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';

export function Agendamentos() {
    const navigate = useNavigate();
    const [selectedPacientes, setSelectedPacientes] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

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

    function handlePacienteSelection(pacienteId) {
        if (selectedPacientes.includes(pacienteId)) {
            setSelectedPacientes(selectedPacientes.filter(id => id !== pacienteId));
        } else {
            setSelectedPacientes([...selectedPacientes, pacienteId]);
        }
    }

    useEffect(() => {
        const fetchPacientes = async () => {
            try {
                const response = await api.get(`/listarPacientes/${page}`);
                const pacienteData = response.data;
                setPacientes(pacienteData.data);

                const calculatedTotalPages = Math.ceil(pacienteData.count / 5);
                setTotalPages(calculatedTotalPages);
            } catch (error) {
                console.error('Erro ao listar pacientes', error);
            }
        };

        fetchPacientes();
    }, [page]);

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
                        <input className={styles.formControl} placeholder="Pesquisar" />
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
                                    <input
                                        type="checkbox"
                                        onChange={() => handlePacienteSelection(paciente.id_paciente)}
                                        checked={selectedPacientes.includes(paciente.id_paciente)}
                                    />
                                </td>
                                <td>{paciente.nome}</td>
                                <td>{paciente.email}</td>
                                <td>{paciente.tel}</td>
                                <td>{paciente.cel}</td>
                                <td>{paciente.data_nasc}</td>
                                <td>{paciente.CNS}</td>
                                <td>{paciente.CPF}</td>
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
                    {/* Coloque o conteúdo do modal aqui */}
                </div>
            )}
        </div>
    );
}
