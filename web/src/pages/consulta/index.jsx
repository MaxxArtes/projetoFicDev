import React, { useEffect } from 'react';
import { api } from '../../services/api';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';
import ModalRegistrarConsulta from '../../components/modalregistrarconsulta/index.jsx';

export function Consultas() {
    const navigate = useNavigate();
    const [query, setQuery] = React.useState('');
    const [consultas, setConsultas] = React.useState([]);
    const [totalPages, setTotalPages] = React.useState(0);
    const [page, setPage] = React.useState(1);

    const [agendamentos, setAgendamentos] = React.useState([]);
    let selectedAgendamentos = [];




    const handleVoltarParaPaginaInicial = () => {
        navigate('/PaginaInicial');
    };

    const handleSair = () => {
        sessionStorage.removeItem('token');
        navigate('/');
    };

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
    };

    const handleDeleteAgendamento = async (id) => {
        try {
            const accessToken = sessionStorage.getItem("token");
            // Fazer a solicitação de exclusão do agendamento com base no ID
            const response = await api.delete(`/deletarAgendamento/${id}`,{
                headers: {
                Authorization: `Bearer ${accessToken}`,
            },});
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
                            <h1>consultas</h1>
                        </div>
                    </div>
                    <div className={styles.navdiv}>
                        <img onClick={handleVoltarParaPaginaInicial} alt="voltar" src="voltar.png" />
                        <img alt="perfil" src="perfil.png" />
                        <img onClick={handleSair} alt="sair" src="sair.png" />
                    </div>
                </header>
                <div className={styles.bloco}>
                    <div className={styles.content}>
                        <div className={styles.pesquisa}>
                            <div className={styles.h1}>
                                <h1>Consultas</h1>
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
                                    <th>consultar</th>
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
                                            <ModalRegistrarConsulta dados={agendamentoItem} fetchAgendamentos={fetchAgendamentos} />
                                        </td>
                                        <td>
                                            <button onClick={() => handleDeleteAgendamento(agendamentoItem.id_agendamento)}
                                            >   <img alt="Excluir" src="lixo.png" />
                                            </button>
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
        </div >
    );

}