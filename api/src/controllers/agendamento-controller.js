const { AgendamentoModel } = require('../models/agendamento-model');
//const filtrarPorData = require('./util/filtroData');

// const { UserView } = require('../views/user-view');

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