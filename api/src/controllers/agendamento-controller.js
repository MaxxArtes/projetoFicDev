const { AgendamentoModel } = require('../models/agendamento-model');
// const { UserView } = require('../views/user-view');

class AgendamentoController {
  async create(req, res) {
    try {
      const { name, email, tel, cel, CNS, CPF, endereco, nome_medico, especialidade, data, horario } = req.body;
      const agendamento = await AgendamentoModel.create({
        name,
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
      const { name, email, tel, cel, CNS, CPF, endereco, nome_medico, especialidade, data, horario } = req.body;
      const agendamento = await AgendamentoModel.update(
        {
          name,
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
        { where: { id } }
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
      await AgendamentoModel.destroy({ where: { id } });
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const agendamento = await AgendamentoModel.findByPk(id);
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
      const agendamentos = await AgendamentoModel.findAll();
      return res.status(200).json(agendamentos);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new AgendamentoController();