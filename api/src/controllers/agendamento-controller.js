const { AgendamentoModel } = require('../models/agendamento-model');
const { UsuarioModel } = require('../models/usuario-model');
const paginate = require('../utils/paginacao');
const { Op } = require('sequelize');
require('dotenv').config();




class AgendamentoController {
  async create(req, res) {
    try {
      const { nome, email, tel, cel, CNS, CPF, endereco, nome_medico, especialidade, data, horario } = req.body;
      const agendamento = await AgendamentoModel.create({
        nome,
        email,
        tel,
        cel,
        CNS,
        CPF,
        endereco,
        nome_medico,
        especialidade,
        data,
        horario
      });
      return res.status(201).json(agendamento);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async consultarAgendamentosEndpoint(req, res) {
    try {

      const agendamentoController = new AgendamentoController;
      const { page } = req.params;
      const { nome, limit } = req.query; // Parâmetros da consulta
      let agendamentos;
      
      // Opções de filtro para o Sequelize
       const filterOptions = {};
      
       if (nome) {
           filterOptions.where = {
               nome: {
                   [Op.iLike]: `%${nome}%`
                 }
               };
            
               // Adicione a opção de collation para ignorar acentuações
               filterOptions.where.nome = {
                   [Op.iLike]: `%${nome}%`
                 };
                 filterOptions.where.nome = {
                     [Op.iLike]: `%${nome}%`
                   };
                 }
                
                // Chama a função paginate com as opções de filtro
                agendamentos = await  agendamentoController.consultarAgendamentos();
                
       

      // Responda com os resultados da consulta
      return res.status(200).json(agendamentos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro interno do servidor', error });
    }
  }

  async consultarAgendamentos() {

    try {
      // Execute a consulta SQL
      const query = `
        SELECT
          a.id_paciente,
          a.id_agendamento,
          p.nome,
          a.nome_medico,
          a.especialidade,
          a.data,
          a.horario
        FROM
          public.agendamentos AS a
        INNER JOIN
          public.pacientes AS p
        ON
          a.id_paciente = p.id_paciente;
      `;
      const  rows  = await AgendamentoModel.sequelize.query(query);
      console.log(rows);
      return rows;
    } catch (error) {
      console.error('Erro ao executar a consulta:', error);
      throw error;
    }
  }



  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, email, tel, cel, CNS, CPF, endereco, nome_medico, especialidade, data, horario } = req.body;
      const agendamento = await AgendamentoModel.update(
        {
          nome,
          email,
          tel,
          cel,
          CNS,
          CPF,
          endereco,
          nome_medico,
          especialidade,
          data,
          horario
        },
        { where: { id_agendamento: id } }
      );
      return res.status(200).json(agendamento);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await AgendamentoModel.destroy({ where: { id_agendamento: id } });
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const agendamento = await AgendamentoModel.findByPk({ id_agendamento: id });
      if (!agendamento) {
        return res.status(404).json({ error: 'Appointment not found' });
      }
      return res.status(200).json(agendamento);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getAll(req, res) {
    try {
      const { nome } = req.query; //parâmetro da consulta
      let consultas; //variável para armazenar as consultas
      if (nome) {
        //se tiver o parâmetro de nome, filtra por nome
        consultas = await paginate(ConsultaModel, page, limit, { where: { nome: { [Op.iLike]: '%' + nome + '%' } } });
      } else {
        //se não tiver o parâmetro de nome, retorna todas as consultas
        consultas = await paginate(ConsultaModel, page, limit);
      }
      return res.status(200).json(consultas); //retorna as consultas encontradas e paginadas
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

}

module.exports = new AgendamentoController();