import { useState } from 'react';

function useAgendamento() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [query, setQuery] = useState('');
  const [agendamentoData, setAgendamentoData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  let nomePaciente = '';
  let email = '';
  let tel = '';
  let cel = '';
  let cns = '';
  let cpf = '';
  let sexo = '';
  let dataNasc = '';
  let endereco = '';
  let selectedAgendamentos = [];
  let nome = '';
  let nomeMedico = '';
  let especialidade = '';
  let data = '';
  let horario = '';

  // Funções e lógica associadas ao seu componente aqui

  return {
    nomeMedico,
    especialidade,
    data,
    horario,
    nome,
    agendamentos,
    setAgendamentos,
    totalPages,
    setTotalPages,
    page,
    setPage,
    mostrarModal,
    setMostrarModal,
    query,
    setQuery,
    agendamentoData,
    setAgendamentoData,
    isEditMode,
    setIsEditMode,
    selectedAgendamentos,
    nomePaciente,
    email,
    tel,
    cel,
    cns,
    cpf,
    sexo,
    dataNasc,
    endereco,
  };
}

export default useAgendamento;
