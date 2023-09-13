const { PacienteModel } = require('../models/paciente-model');
//const filtrarPorData = require('./util/filtroData');
class PacienteController {
  async create(req, res) {
    try {
      const { nome, email, tel, cel, CNS, CPF, sexo, data_nasc, endereco } = req.body;
      const paciente = await PacienteModel.create({
        nome,
        email,
        tel,
        cel,
        CNS,
        CPF,
        sexo,
        data_nasc,
        endereco
      });
      return res.status(201).json(paciente);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, email, tel, cel, CNS, CPF, sexo, data_nasc, endereco } = req.body;
      const paciente = await PacienteModel.update(
        {
          nome,
          email,
          tel,
          cel,
          CNS,
          CPF,
          sexo,
          data_nasc,
          endereco
        },
        { where: { id_paciente: id } }
      );
      return res.status(200).json(paciente);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;
      await PacienteModel.destroy({ where: { id_paciente: id } });
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  async getAll(req, res) {
    try {
      const { nome } = req.query; //parâmetro da consulta
      let pacientes; //variável para armazenar os pacientes
      if (nome) {
        //se tiver o parâmetro de consulta, filtra por nome
        pacientes = await PacienteModel.findAll({ where: { nome: { [Op.iLike]: '%' + nome + '%' } } });
      } else {
        //se não tiver o parâmetro de consulta, retorna todos os pacientes
        pacientes = await PacienteModel.findAll();
      } return res.status(200).json(pacientes); //retorna os pacientes encontrados 
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
} //adiciona essa chave extra para fechar a classe
module.exports = new PacienteController()
