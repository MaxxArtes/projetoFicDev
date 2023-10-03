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
import ConfirmationModal2 from '../../components/modalConfirmacao2/index.jsx';
// import usePagination from '../../hook/usePagination';

export function Agendamentos() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenn, setIsModalOpenn] = useState(false);
    const navigate = useNavigate();
    const {
        agendamentos, setAgendamentos, totalPages, setTotalPages,
        page, setPage, query, setQuery

    } = useAgendamento();
    let {
        selectedAgendamentos
    } = useAgendamento();

    const [idPaciente, setIdPaciente] = useState([null]);
    const [idAgendamento, setIdAgendamento] = React.useState(null);

    const [pacientes, setPacientes] = React.useState([]);
    const [totalPagesPacientes, setTotalPagesPacientes] = React.useState(0);
    const [pagePacientes, setPagePacientes] = React.useState(1);

    const [queryPacientes, setQueryPacientes] = React.useState('');
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
    async function handlePesquisar() {
        if (query) {
            console.log("QUERY: ", query);
            selectedAgendamentos = selectedAgendamentos.filter(id => id !== agendamentoData.id_usuario);
            const usersResponse = await api.get(`/agendamentos/${page}?nome=${query}`);
            console.log(usersResponse)
            const agendamentoData = usersResponse.data;
            setAgendamentos(agendamentoData.data);

            const calculatedTotalPages = Math.ceil(agendamentoData.count / 8);
            setTotalPages(calculatedTotalPages);
        }

        else if (!query) {
            const usersResponse = await api.get(`/agendamentos/${page}`);
            const agendamentoData = usersResponse.data;
            setAgendamentos(agendamentoData.data);

            const calculatedTotalPages = Math.ceil(agendamentoData.count / 8);
            setTotalPages(calculatedTotalPages);
        }


        else {
            console.error('Erro ao pesquisar o usuário:', query);
        }
    };

    
    async function handlePesquisarPacientes() {
        if (queryPacientes) {
            console.log("queryPacientes: ", queryPacientes);
            selectedPacientes = selectedPacientes.filter(id => id !== pacientesData.id_paciente);
            const usersResponse = await api.get(`/listarPacientes/${pagePacientes}?nome=${queryPacientes}`);
            const pacientesData = usersResponse.data.data;
            console.log(usersResponse)
            setPacientes(pacientesData);

            const calculatedTotalPages = Math.ceil(pacientesData.count / 8);
            setTotalPagesPacientes(calculatedTotalPages);
        }

        else if (!queryPacientes) {
            const usersResponse = await api.get(`/listarPacientes/${page}`);
            const pacientesData = usersResponse.data;
            setPacientes(pacientesData.data);

            const calculatedTotalPages = Math.ceil(pacientesData.count / 8);
            setTotalPagesPacientes(calculatedTotalPages);
        }


        else {
            console.error('Erro ao pesquisar o usuário:', queryPacientes);
        }
    };


    const idpaciente = (pacienteItem) => {
        setIdPaciente(pacienteItem.id_paciente);
        console.log("idpaciente: ", idPaciente);
        setIsModalOpen(true);

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
    const handleDeletePaciente = async () => {
        try {
            const accessToken = sessionStorage.getItem("token");
            // Fazer a solicitação de exclusão do paciente com base no ID
            const response = await api.delete(`/deletarPacientes/${idPaciente}`);

            if (response.status === 204) {
                const response = await api.get(`/listarPacientes/${pagePacientes}`);
                const pacientesData = response.data.data;
                setPacientes(pacientesData); // Atualize o estado usando setPacientes

                const calculatedTotalPages = Math.ceil(response.data.count / 8);
                setTotalPagesPacientes(calculatedTotalPages); // Atualize o estado usando setTotalPagesPacientes
            } 
        } catch (error) {
            if(error.response.status === 400){
                alert("não pode excluir esse paciente, pois possui agendamentos");
            }
            console.error('Erro ao excluir paciente', error);
        }
    };


    // ------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // ------------------------------------------------------------------------------------------------------------------------------------------------------------------

    const tab1 = () => {
        const agenda = document.getElementById('agenda'); // Substitua 'agendamentos' pelo ID correto do elemento
        const pacie = document.getElementById('pacie'); // Substitua 'pacie' pelo ID correto do elemento

        agenda.style.display = "none";
        pacie.style.display = "block";
    }
    const tab2 = () => {
        const agenda = document.getElementById('agenda'); // Substitua 'agendamentos' pelo ID correto do elemento
        const pacie = document.getElementById('pacie'); // Substitua 'pacie' pelo ID correto do elemento

        agenda.style.display = "block";
        pacie.style.display = "none";
    }


    const handleDeleteAgendamento = async (idAgendamento) => {
        try {
            console.log("ID AGENDAMENTODELETE: ", idAgendamento)
            console.log("agendamentoItem: ", idAgendamento);
            const accessToken = sessionStorage.getItem("token");
            // Fazer a solicitação de exclusão do agendamento com base no ID
            const response = await api.delete(`/deletarAgendamento/${idAgendamento}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
       
            if (response.status === 204) {
                // Atualizar a lista de agendamentos após a exclusão
                const usersResponse = await api.get(`/agendamentos/${page}`);
                const agendamentoData = usersResponse.data;
                setAgendamentos(agendamentoData.data);

                const calculatedTotalPages = Math.ceil(agendamentoData.count / 8);
                setTotalPages(calculatedTotalPages);
                setIsModalOpen(false);
            } else {
                console.error('Erro ao excluir agendamento');
            }
        } catch (error) {
         
            console.error('Erro ao excluir agendamento', error);
        }
    };

    const handleRegistrarAgendamento = (agendamentoItem) => {
        debugger
        setIsModalOpenn(true);
        setIdAgendamento(agendamentoItem.id_agendamento);
        console.log("ID AGENDAMENTO: ", idAgendamento)
    }


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
                        <div className={styles.profilecontainer}>
                            <img onClick={handleVoltarParaPaginaInicial} alt="voltar" src="voltar.png" />
                            <div className={styles.profilecaption}>voltar</div>
                        </div>
                        <div className={styles.profilecontainer}>
                            <img onClick={handleSair} alt="sair" src="sair.png" />
                            <div className={styles.profilecaption}>sair</div>
                        </div>
                    </div>
                </header>
                <div id="agenda" style={{ display: "none", width: "100vw" }}>
                    <button style={{ cursor: "pointer" }} onClick={tab1}>
                        paciente
                    </button>
                    <button style={{ cursor: "pointer" }} onClick={tab2}>
                        agendamentos
                    </button>
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
                                        <th>id agendamento</th>
                                        <th>status</th>
                                        <th>Nome do paciente</th>
                                        <th>Nome do Medico</th>
                                        <th>Especialidade</th>
                                        <th>Data</th>
                                        <th>Hora</th>
                                        <th>editar</th>
                                        <th>excluir</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {agendamentos.map((agendamentoItem, index) => (
                                        <tr key={index}>
                                            <td>{agendamentoItem.id_agendamento}</td>
                                            <td>{agendamentoItem.status}</td>
                                            <td>{agendamentoItem.nome_paciente}</td>
                                            <td>{agendamentoItem.nome_medico}</td>
                                            <td>{agendamentoItem.especialidade}</td>
                                            <td>{(formatarData(agendamentoItem.data))}</td>
                                            <td>{agendamentoItem.horario}</td>
                                            <td><ModalEditar dados={agendamentoItem} fetchAgendamentos={fetchAgendamentos} /></td>
                                            <td>
                                                <div>
                                                    <button onClick={() => handleRegistrarAgendamento(agendamentoItem)}>Excluir</button>
                                                    <ConfirmationModal2
                                                        isOpenn={isModalOpenn}
                                                        message="Tem certeza de que deseja excluir este item?"
                                                        onClose={() => setIsModalOpenn(false)}
                                                        onConfir={() => handleDeleteAgendamento(idAgendamento)}
                                                    />
                                                </div>
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
                </div>
                <div id="pacie" style={{ display: "block" }} >
                    <button style={{ cursor: "pointer" }} onClick={tab1}>
                        paciente
                    </button>
                    <button style={{ cursor: "pointer" }} onClick={tab2}>
                        agendamentos
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
                                        <ModalSavePacientes dados={pacientes} setPacientes={setPacientes} setTotalPagesPacientes={setTotalPagesPacientes} page={pagePacientes} />
                                        <img className={styles.search} alt="Search" src="adicao.png" />
                                    </button>
                                </div>
                            </div>

                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>id do Paciente</th>
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
                                        <th>editar</th>
                                        <th>excluir</th>
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
                                            </td>
                                            <td>
                                                <button onClick={() => idpaciente(pacienteItem)}><img alt="deletar" src="lixo.png" /></button>
                                                <ConfirmationModal
                                                    isOpen={isModalOpen}
                                                    message="Tem certeza de que deseja excluir este item?"
                                                    onClose={() => setIsModalOpen(false)}
                                                    onConfirm={() => handleDeletePaciente(pacienteItem)}
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
            </div>
        </div >
    );
}
