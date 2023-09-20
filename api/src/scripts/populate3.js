require('../database');
const { AgendamentoModel } = require('../models/agendamento-model');

const agendamentos = [
  {
    "id_paciente": 1,
    nome_medico: "Dr. Anderson",
    especialidade: "Cardiologia",
    data: "2023-09-20",
    horario: "08:30",
    unidade_saude: "Hospital Central"
  },
  {
    "id_paciente": 2,
    nome_medico: "Dra. Maria",
    especialidade: "Pediatria",
    data: "2023-09-22",
    horario: "10:00",
    unidade_saude: "Clinica Infantil"
  },
  {
    "id_paciente": 3,
    nome_medico: "Dr. Silva",
    especialidade: "Ortopedia",
    data: "2023-09-25",
    horario: "15:45",
    unidade_saude: "Hospital Ortopédico"
  },
  {
    "id_paciente": 4,
    nome_medico: "Dra. Garcia",
    especialidade: "Dermatologia",
    data: "2023-09-26",
    horario: "14:15",
    unidade_saude: "Clínica Dermatológica"
  },
  {
    "id_paciente": 5,
    nome_medico: "Dr. Souza",
    especialidade: "Oftalmologia",
    data: "2023-09-27",
    horario: "11:30",
    unidade_saude: "Clínica de Oftalmologia"
  },
  {
    "id_paciente": 6,
    nome_medico: "Dra. Lima",
    especialidade: "Ginecologia",
    data: "2023-09-28",
    horario: "09:00",
    unidade_saude: "Hospital da Mulher"
  },
  {
    "id_paciente": 7,
    nome_medico: "Dr. Pereira",
    especialidade: "Neurologia",
    data: "2023-09-29",
    horario: "13:45",
    unidade_saude: "Clínica Neurológica"
  },
  {
    "id_paciente": 8,
    nome_medico: "Dra. Santos",
    especialidade: "Oncologia",
    data: "2023-09-30",
    horario: "16:20",
    unidade_saude: "Hospital do Câncer"
  },
  {
    "id_paciente": 9,
    nome_medico: "Dr. Almeida",
    especialidade: "Urologia",
    data: "2023-10-03",
    horario: "08:15",
    unidade_saude: "Clínica Urológica"
  },
  {
    "id_paciente": 10,
    nome_medico: "Dra. Costa",
    especialidade: "Psiquiatria",
    data: "2023-10-05",
    horario: "10:30",
    unidade_saude: "Clínica Psiquiátrica"
  }

];

(async () => {
  try {
    for (let agendamento of agendamentos) {
      const novoAgendamento = await AgendamentoModel.create({
        nome_medico: agendamento.nome_medico,
        especialidade: agendamento.especialidade,
        data: agendamento.data,
        horario: agendamento.horario,
        unidade_saude: agendamento.unidade_saude,
        id_paciente: agendamento.id_paciente
      });

      console.log("Agendamento cadastrado:", novoAgendamento);
    }

    console.log('Todos os agendamentos fictícios cadastrados!');
  } catch (error) {
    console.error("Erro ao cadastrar agendamentos fictícios:", error);
  }
})();
