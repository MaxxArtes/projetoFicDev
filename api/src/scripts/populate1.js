require('../database');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const { UsuarioModel } = require('../models/usuario-model');

const usuarios = [
    {
      nome: "João Paulo",
      password: "123456",
      cpf: "12345678901",
      cargo: "médico",
      especialidade: "clínico geral",
      email: "med1@mail.com"
    },
    {
      nome: "Maria Silva",
      password: "456789",
      cpf: "23456789012",
      cargo: "atendente",
      especialidade: "cardiologia",
      email: "atendente1@mail.com"
    },
    {
      nome: "Lucia Santos",
      password: "789123",
      cpf: "34567890123",
      cargo: "médico",
      especialidade: "pediatria",
      email: "med2@mail.com"
    },
    {
      nome: "José Almeida",
      password: "987654",
      cpf: "45678901234",
      cargo: "atendente",
      especialidade: "cirurgia",
      email: "atendente2@mail.com"
    },
    {
      nome: "Ana Pereira",
      password: "654321",
      cpf: "56789012345",
      cargo: "médico",
      especialidade: "dermatologia",
      email: "med3@mail.com"
    },
    {
      nome: "Pedro Costa",
      password: "321789",
      cpf: "67890123456",
      cargo: "atendente",
      especialidade: "ortopedia",
      email: "atendente3@mail.com"
    },
    {
      nome: "Rita Fernandes",
      password: "111222",
      cpf: "78901234567",
      cargo: "médico",
      especialidade: "psiquiatria",
      email: "med4@mail.com"
    },
    {
      nome: "Fernando Santos",
      password: "222333",
      cpf: "89012345678",
      cargo: "atendente",
      especialidade: "neurologia",
      email: "atendente4@mail.com"
    },
    {
      nome: "Luisa Oliveira",
      password: "333444",
      cpf: "90123456789",
      cargo: "médico",
      especialidade: "ginecologia",
      email: "med5@mail.com"
    },
    {
      nome: "Carlos Rodrigues",
      password: "444555",
      cpf: "01234567890",
      cargo: "atendente",
      especialidade: "radiologia",
      email: "atendente5@mail.com"
    }
  ];

(async () => {
    for (let usuario of usuarios) {
        const teste = await UsuarioModel.create({
            nome: usuario.nome,
            password: bcrypt.hashSync(usuario.password, salt), 
            cpf: usuario.cpf, 
            cargo: usuario.cargo,
            especialidade: usuario.especialidade,
            email: usuario.email 
        });

        console.log("seasesaesaesa", teste);
    }
    console.log('Tudo cadastrado!');
})();