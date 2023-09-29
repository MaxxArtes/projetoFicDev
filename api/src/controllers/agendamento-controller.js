const { AgendamentoModel } = require('../models/agendamento-model');
const paginate = require('../utils/pagination.js');
const { Op } = require('sequelize');
require('dotenv').config();




class AgendamentoController {
  async create(req, res) {
    try {
      const { nome_medico, especialidade, data, horario, unidade_saude, id_paciente } = req.body;
      const agendamento = await AgendamentoModel.create({
        nome_medico,
        especialidade,
        data,
        horario,
        unidade_saude,
        id_paciente
      });
      return res.status(201).json(agendamento);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async consultarAgendamentosEndpoint(req, res) {
    try {
      const { page } = req.params;
      const { nome } = req.query; // Parâmetros da consulta
      let filterOptions = "";
      // Opções de filtro para o Sequelize
      if(nome) {
      filterOptions = `${nome}`;
      
      // Chama a função paginate com as opções de filtro
      const agendamentos = await paginate(AgendamentoModel, page, filterOptions);
  
      // Responda com os resultados da consulta
      return res.status(200).json(agendamentos);
    }
    const agendamentos = await paginate(AgendamentoModel, page, filterOptions);
  
      // Responda com os resultados da consulta
      return res.status(200).json(agendamentos);
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro interno do servidor', error });
    }
  }
  




  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome_medico, especialidade, data, horario, unidade_saude } = req.body;
      const agendamento = await AgendamentoModel.update(
        {
          nome_medico,
          especialidade,
          data,
          horario,
          unidade_saude,
          especialidade,
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
      let agendamentos; //variável para armazenar as consultas
      if (nome) {
        //se tiver o parâmetro de nome, filtra por nome
        agendamentos = await paginate(AgendamentoModel, page, limit, { where: { nome: { [Op.iLike]: '%' + nome + '%' } } });
      } else {
        //se não tiver o parâmetro de nome, retorna todas as consultas
        agendamentos = await paginate(AgendamentoModel, page, limit);
      }
      return res.status(200).json(agendamentos); //retorna as consultas encontradas e paginadas
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  // async totalAgendamentos(req, res) {
  //   try {
  //     const result = await AgendamentoModel.sequelize.query("SELECT id_agendamento, COUNT(*) FROM agendamentos GROUP BY especialidade");

  //     return res.status(200).json({totalAtendentes: result[0][0], totalMedicos: result[0][1]}); 
      
  //     } catch (error) {
  //     // Trate erros aqui
  //     console.error(error);
  //     res.status(500).send('Erro interno do servidor ', error);
  //   }
  // }

}

module.exports = new AgendamentoController();