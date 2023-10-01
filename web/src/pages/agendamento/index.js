import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';
import ModalEditar from '../../components/modalagendamento/modalEditar/index.jsx';
import ModalSave from '../../components/modalSave';
import useAgendamento from '../../hook/useAgendamento';
import ModalSavePacientes from '../../components/modalSavepacientes/index.jsx';
import ModalEditPacientes from '../../components/modalEditpacientes/index.jsx';
import ModalPerfil from '../../components/modalPerfil';
import ConfirmationModal from '../../components/modalConfirmacao/index.jsx';
// import usePagination from '../../hook/usePagination';

export function Agendamentos() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const {
        agendamentos, setAgendamentos, totalPages, setTotalPages,
        page, setPage, mostrarModal, setMostrarModal, query, setQuery, setAgendamentoData, isEditMode, setIsEditMode,

    } = useAgendamento();
    let {
        endereco, nomeMedico, especialidade, data, agendamentoData, dataNasc, sexo, nomePaciente, email, tel, cel, cns, cpf, nome, horario, selectedAgendamentos
    } = useAgendamento();


    const [pacientes, setPacientes] = React.useState([]);
    const [totalPagesPacientes, setTotalPagesPacientes] = React.useState(0);
    const [pagePacientes, setPagePacientes] = React.useState(1);
    const [mostrarModalPacientes, setMostrarModalPacientes] = React.useState(false);
    const [queryPacientes, setQueryPacientes] = React.useState();
    let selectedPacientes = [];




    function formatarData(data) {
        const dataObj = new Date(data);

        // Verifica se a data é válida
        if (isNaN(dataObj.getTime())) {
            return "Data inválida";
        }

        const dia = String(dataObj.getDate()).padStart(2, '0');
        const mes = String(dataObj.getMonth() + 1).padStart(2, '0'); // Note que os meses são indexados a partir de 0
        const ano = dataObj.getFullYear();

        return `${dia}/${mes}/${ano}`;
    }

    useEffect(() => {
        const fetchPacientes = async () => {
            try {
                console.log("PagePacientes: ", pagePacientes);
                const response = await api.get(`/listarPacientes/${pagePacientes}`);
                const pacientesData = response.data.data;
                setPacientes(pacientesData); // Atualize o estado usando setPacientes

                const calculatedTotalPages = Math.ceil(response.data.count / 8);
                setTotalPagesPacientes(calculatedTotalPages); // Atualize o estado usando setTotalPagesPacientes
            } catch (error) {
                console.error('Erro ao buscar pacientes', error);
            }
        };

        fetchPacientes(); // Chame a função imediatamente

    }, [pagePacientes]);

    async function aumentarPacientes() {
        if (pagePacientes < totalPagesPacientes) {
            setPagePacientes(pagePacientes + 1);
        }
    };

    const diminuirPacientes = () => {
        if (pagePacientes > 1) {
            setPagePacientes(pagePacientes - 1);
        }
    };


    const handleVoltarParaPaginaInicial = () => {
        navigate('/PaginaInicial');
    };

    const handleSair = () => {
        sessionStorage.removeItem('token');
        navigate('/');
    };

    const handleregistrarPacientes = () => {
        setMostrarModalPacientes(true);
    };
    async function handlePesquisar() {
        if (query) {
            console.log("QUERY: ", query);
            selectedAgendamentos = selectedAgendamentos.filter(id => id !== agendamentoData.id_usuario);
            const usersResponse = await api.get(`/agendamentos/${page}?nome=${query}`);
            console.log(usersResponse)
            const agendamentoData = usersResponse.data;
            setAgendamentos(agendamentoData.data);

            const calculatedTotalPages = Math.ceil(agendamentoData.count / 10);
            setTotalPages(calculatedTotalPages);
        }

        else if (!query) {
            const usersResponse = await api.get(`/agendamentos/${page}`);
            const agendamentoData = usersResponse.data;
            setAgendamentos(agendamentoData.data);

            const calculatedTotalPages = Math.ceil(agendamentoData.count / 10);
            setTotalPages(calculatedTotalPages);
        }


        else {
            console.error('Erro ao pesquisar o usuário:', query);
        }
    };
    async function handlePesquisarPcientes() {
        if (queryPacientes) {
            console.log("queryPacientes: ", queryPacientes);
            selectedPacientes = selectedPacientes.filter(id => id !== pacientesData.id_paciente);
            const usersResponse = await api.get(`/listarPacientes/${pagePacientes}?nome=${queryPacientes}`);
            console.log(usersResponse)
            const pacientesData = usersResponse.data.data;
            setAgendamentos(pacientesData);

            const calculatedTotalPages = Math.ceil(pacientesData.count / 10);
            setTotalPagesPacientes(calculatedTotalPages);
        }

        else if (!queryPacientes) {
            const usersResponse = await api.get(`/listarPacientes/${page}`);
            const pacientesData = usersResponse.data;
            setPacientes(pacientesData.data);

            const calculatedTotalPages = Math.ceil(pacientesData.count / 10);
            setTotalPagesPacientes(calculatedTotalPages);
        }


        else {
            console.error('Erro ao pesquisar o usuário:', queryPacientes);
        }
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

    const handleDeletePaciente = async (id) => {
        try {
            // Fazer a solicitação de exclusão do paciente com base no ID
            const response = await api.delete(`/deletarPacientes/${id}`);
            if (response.status === 204) {
                const response = await api.get(`/listarPacientes/${pagePacientes}`);
                const pacientesData = response.data.data;
                setPacientes(pacientesData); // Atualize o estado usando setPacientes

                const calculatedTotalPages = Math.ceil(response.data.count / 10);
                setTotalPagesPacientes(calculatedTotalPages); // Atualize o estado usando setTotalPagesPacientes
            } else {
                console.error('Erro ao excluir paciente');
            }
        } catch (error) {
            console.error('Erro ao excluir paciente', error);
        }
    };



    const handleDeleteAgendamento = async (id) => {
        try {
            // Fazer a solicitação de exclusão do agendamento com base no ID
            const response = await api.delete(`/deletarAgendamento/${id}`);
            if (response.status === 204) {
                // Atualizar a lista de agendamentos após a exclusão
                const usersResponse = await api.get(`/agendamentos/${page}`);
                const agendamentoData = usersResponse.data;
                setAgendamentos(agendamentoData.data);

                const calculatedTotalPages = Math.ceil(agendamentoData.count / 10);
                setTotalPages(calculatedTotalPages);
            } else {
                console.error('Erro ao excluir agendamento');
            }
        } catch (error) {
            console.error('Erro ao excluir agendamento', error);
        }
    };


    const handleSubmit = async () => {
        try {
            if (nome && nomeMedico && especialidade && data && horario) {
                let agendamentoData = {
                    nome,
                    nomeMedico,
                    especialidade,
                    data,
                    horario,
                };

                const response = await api.post('/registerAgendamento', agendamentoData);

                console.log('Agendamento registrado com sucesso!', response.data);

                // Limpar os campos após a conclusão
                nome = '';
                nomeMedico = '';
                especialidade = '';
                data = '';
                horario = '';
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
            const AgendamentoData = {
                nome: agendamentoData.nome,
                nomeMedico: agendamentoData.nomeMedico,
                especialidade: agendamentoData.especialidade,
                data: agendamentoData.data,
                horario: agendamentoData.horario,
            };

            const accessToken = sessionStorage.getItem("token");
            const response = isEditMode
                ? await api.put(`/editarAgendamento/${agendamentoData.id_agendamento}`, AgendamentoData, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                : await api.post('/registerAgendamento', AgendamentoData);

            if (response.status === 200 || response.status === 204) {

                const usersResponse = await api.get(`/agendamentos/${page}`);
                const agendamentoData = usersResponse.data;
                setAgendamentos(agendamentoData.data);

                const calculatedTotalPages = Math.ceil(agendamentoData.count / 10);
                setTotalPages(calculatedTotalPages);
            } else {
                console.error('Erro ao editar o usuário:', response.data);
            }

            // Limpar os campos após a conclusão
            nome = '';
            nomeMedico = '';
            especialidade = '';
            data = '';
            horario = '';
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

    const fetchAgendamentos = async () => {
        try {
            const response = await api.get(`/agendamentos/${page}`);
            console.log(response);
            const agendamentoData = response.data.data;
            setAgendamentos(agendamentoData); // Atualize o estado usando setAgendamentos
            console.log('agendamento data : ', agendamentoData);

            const calculatedTotalPages = Math.ceil(response.data.count / 8);
            setTotalPages(calculatedTotalPages); // Atualize o estado usando setTotalPages
            console.log('total pages : ', calculatedTotalPages);
            if (!response.ok) {
                throw new Error('Erro ao buscar agendamentos');
            }

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchAgendamentos();
    }, [page]);

    return (
        <div className={styles.geral} >
            <div className={styles.ATENDIMENTO}>
                <header>
                    <div className={styles.esq}>
                        <img alt="voltar" src="logo.png" />
                        <div className={styles.header}>
                            <h1>Atendimento</h1>
                        </div>
                    </div>
                    <div className={styles.navdiv}>
                        <ModalPerfil />
                        <img onClick={handleVoltarParaPaginaInicial} alt="voltar" src="voltar.png" />
                        <img onClick={handleSair} alt="sair" src="sair.png" />
                    </div>
                </header>
                <div className={styles.bloco}>

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

                                <button onClick={handlePesquisar} className={styles.button} >
                                    Pesquisar
                                </button>
                            </div>
                        </div>

                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Nome do paciente</th>
                                    <th>Nome do Medico</th>
                                    <th>Especialidade</th>
                                    <th>Data</th>
                                    <th>Hora</th>
                                    <th>Ação</th>
                                </tr>
                            </thead>

                            <tbody>
                                {agendamentos.map((agendamentoItem, index) => (
                                    <tr key={index}>
                                        <td>{agendamentoItem.nome_paciente}</td>
                                        <td>{agendamentoItem.nome_medico}</td>
                                        <td>{agendamentoItem.especialidade}</td>
                                        <td>{(formatarData(agendamentoItem.data))}</td>
                                        <td>{agendamentoItem.horario}</td>
                                        <td>
                                            <ModalEditar dados={agendamentoItem} fetchAgendamentos={fetchAgendamentos} />
                                            <button onClick={() => setIsModalOpen(true)}><img alt="deletar" src="lixo.png" /></button>
                                            <ConfirmationModal
                                                isOpen={isModalOpen}
                                                message="Tem certeza de que deseja excluir este item?"
                                                onClose={() => setIsModalOpen(false)}
                                                onConfirm={() => handleDeleteAgendamento(agendamentoItem.id_agendamento)}
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
                        <button onClick={diminuir} className={styles.pageNumber}>
                            <img className={styles.circledRight} alt="Página Anterior" src="./Circled1.png" />
                        </button>
                        <button className={styles.pageNumber}>{page}</button>
                        <button onClick={aumentar} className={styles.pageNumber}>
                            <img className={styles.circledRight} alt="Próxima Página" src="./Circled.png" />
                        </button>
                    </div>
                </footer>

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

                                <button onClick={handlePesquisarPcientes} className={styles.button}>
                                    Pesquisar
                                </button>
                                <button className={styles.button}>
                                    <ModalSavePacientes dados={pacientes} setPacientes={setPacientes} setTotalPagesPacientes={setTotalPagesPacientes} page={pagePacientes} />
                                    <img className={styles.search} alt="Search" src="adicao.png" />
                                </button>
                            </div>
                        </div>

                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Nome do Paciente</th>
                                    <th>Email</th>
                                    <th>Tel</th>
                                    <th>Cel</th>
                                    <th>CNS</th>
                                    <th>CPF</th>
                                    <th>Sexo</th>
                                    <th>Data de Nascimento</th>
                                    <th>Endereço</th>
                                    <th>Agendar</th>
                                    <th>Ação</th>
                                </tr>
                            </thead>

                            <tbody>
                                {pacientes.map((pacienteItem, index) => (
                                    <tr key={index}>
                                        <td>{pacienteItem.id_paciente}</td>
                                        <td>{pacienteItem.nome}</td>
                                        <td>{pacienteItem.email}</td>
                                        <td>{pacienteItem.tel}</td>
                                        <td>{pacienteItem.cel}</td>
                                        <td>{pacienteItem.CNS}</td>
                                        <td>{pacienteItem.CPF}</td>
                                        <td>{pacienteItem.sexo}</td>
                                        <td>{(formatarData(pacienteItem.data_nasc))}</td>
                                        <td>{pacienteItem.endereco}</td>
                                        <td className={styles.agendar}>
                                            <ModalSave dados={pacienteItem} fetchAgendamentos={fetchAgendamentos} />
                                        </td>
                                        <td>
                                            <button>
                                                <ModalEditPacientes dados={pacienteItem} setPacientes={setPacientes} setTotalPagesPacientes={setTotalPagesPacientes} page={pagePacientes} />
                                            </button>
                                            <button onClick={() => setIsModalOpen(true)}><img alt="deletar" src="lixo.png" /></button>
                                            <ConfirmationModal
                                                isOpen={isModalOpen}
                                                message="Tem certeza de que deseja excluir este item?"
                                                onClose={() => setIsModalOpen(false)}
                                                onConfirm={() => handleDeletePaciente(pacienteItem.id_paciente)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>


                {/* Paginação para Pacientes */}
                <footer>
                    <div className={styles.pagination}>
                        <button onClick={diminuirPacientes} className={styles.pageNumber}>
                            <img className={styles.circledRight} alt="Página Anterior" src="./Circled1.png" />
                        </button>
                        <button className={styles.pageNumber}>{pagePacientes}</button>
                        <button onClick={aumentarPacientes} className={styles.pageNumber}>
                            <img className={styles.circledRight} alt="Próxima Página" src="./Circled.png" />
                        </button>
                    </div>
                </footer>
            </div>
        </div >
    );
}
