require('../database');
const { PacienteModel } = require('../models/paciente-model');

const pacientes = [
  {
    nome: "Jane Doe",
    email: "janedoe@example.com",
    tel: "(111) 222-3333",
    cel: "(444) 555-6666",
    CNS: "7890123456789012",
    CPF: "987.654.321-00",
    sexo: "Feminino",
    data_nasc: "1985-03-15",
    endereco: "Avenida Imaginária, 456"
  },
  {
    nome: "João Silva",
    email: "joaosilva@example.com",
    tel: "(555) 555-5555",
    cel: "(777) 777-7777",
    CNS: "1234567890123456",
    CPF: "123.456.789-00",
    sexo: "Masculino",
    data_nasc: "1990-05-20",
    endereco: "Rua das Flores, 789"
  },
  {
    nome: "Maria Santos",
    email: "mariasantos@example.com",
    tel: "(999) 999-9999",
    cel: "(888) 888-8888",
    CNS: "5555555555555555",
    CPF: "555.555.555-00",
    sexo: "Feminino",
    data_nasc: "1980-12-10",
    endereco: "Rua dos Sonhos, 1234"
  },
  {
    nome: "Carlos Oliveira",
    email: "carlosoliveira@example.com",
    tel: "(777) 777-7777",
    cel: "(666) 666-6666",
    CNS: "9876543210987654",
    CPF: "987.654.321-11",
    sexo: "Masculino",
    data_nasc: "1982-08-25",
    endereco: "Avenida Principal, 567"
  },
  {
    nome: "Ana Souza",
    email: "anasouza@example.com",
    tel: "(222) 333-4444",
    cel: "(111) 222-3333",
    CNS: "1111222233334444",
    CPF: "111.222.333-44",
    sexo: "Feminino",
    data_nasc: "1977-06-03",
    endereco: "Rua da Praia, 7890"
  },
  {
    nome: "Pedro Fernandes",
    email: "pedrofernandes@example.com",
    tel: "(123) 456-7890",
    cel: "(987) 654-3210",
    CNS: "2222333344445555",
    CPF: "222.333.444-55",
    sexo: "Masculino",
    data_nasc: "1995-02-12",
    endereco: "Avenida Central, 1122"
  },
  {
    nome: "Luisa Costa",
    email: "luisacosta@example.com",
    tel: "(444) 555-6666",
    cel: "(111) 222-3333",
    CNS: "3333444455556666",
    CPF: "333.444.555-66",
    sexo: "Feminino",
    data_nasc: "1988-07-18",
    endereco: "Rua das Árvores, 789"
  },
  {
    nome: "Rafael Santos",
    email: "rafaelsantos@example.com",
    tel: "(999) 888-7777",
    cel: "(777) 888-9999",
    CNS: "1234987654321234",
    CPF: "123.498.765-43",
    sexo: "Masculino",
    data_nasc: "1984-11-30",
    endereco: "Avenida dos Pássaros, 4567"
  },
  {
    nome: "Isabela Almeida",
    email: "isabelaalmeida@example.com",
    tel: "(111) 333-5555",
    cel: "(777) 999-8888",
    CNS: "8765432112345678",
    CPF: "876.543.211-23",
    sexo: "Feminino",
    data_nasc: "1979-09-22",
    endereco: "Rua das Estrelas, 987"
  },
  {
    nome: "Marcos Ferreira",
    email: "marcosferreira@example.com",
    tel: "(555) 777-9999",
    cel: "(444) 333-2222",
    CNS: "9999888877776666",
    CPF: "999.888.877-76",
    sexo: "Masculino",
    data_nasc: "1983-04-05",
    endereco: "Avenida do Sol, 5678"
  }
];

(async () => {
  try {
      for (let paciente of pacientes) {
          const novoPaciente = await PacienteModel.create({
              nome: paciente.nome,
              email: paciente.email,
              tel: paciente.tel,
              cel: paciente.cel,
              CNS: paciente.CNS,
              CPF: paciente.CPF,
              sexo: paciente.sexo,
              data_nasc: paciente.data_nasc,
              endereco: paciente.endereco,
          });

          console.log("Paciente cadastrado:", novoPaciente);
      }
      console.log('Todos os 10 pacientes cadastrados!');
  } catch (error) {
      console.error("Erro ao cadastrar pacientes:", error);
  }
})();

