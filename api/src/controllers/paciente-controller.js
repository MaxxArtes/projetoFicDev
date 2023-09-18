const { PacienteModel } = require('../models/paciente-model');
const paginate = require('../utils/paginacao');
const { Op } = require('sequelize');


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
        const { page } = req.params;
        const { nome, limit } = req.query; // Parâmetros da consulta
        let pacientes; // Variável para armazenar os pacientes
    
        // Opções de filtro para o Sequelize
        const filterOptions = {};
    
        if (nome) {
          // Adicione a opção de filtro por nome, ignorando acentuações
          filterOptions.where = {
            nome: {
              [Op.iLike]: `%${nome}%`
            }
          };
        }
    
        // Chama a função paginate com as opções de filtro
        pacientes = await paginate(PacienteModel, page, limit, filterOptions);
    
        return res.status(200).json(pacientes); // Retorna os pacientes encontrados e paginados
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

module.exports = new PacienteController()
