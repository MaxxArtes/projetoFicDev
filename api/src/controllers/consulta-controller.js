const { ConsultaModel } = require('../models/consulta-model');
// const { UserView } = require('../views/user-view');

class ConsultaController {
  async create(req, res) {
    try {
      const { name, sexo, data_nasc, endereco, historico_clinico, descricao } = req.body;
      const consulta = await ConsultaModel.create({
        name,
        sexo,
        data_nasc,
        endereco,
        historico_clinico,
        descricao
      });
      return res.status(201).json(consulta);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, sexo, data_nasc, endereco, historico_clinico, descricao } = req.body;
      const consulta = await ConsultaModel.update(
        {
          name,
          sexo,
          data_nasc,
          endereco,
          historico_clinico,
          descricao
        },
        { where: { id } }
      );
      return res.status(200).json(consulta);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await ConsultaModel.destroy({ where: { id } });
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const consulta = await ConsultaModel.findByPk(id);
      if (!consulta) {
        return res.status(404).json({ error: 'Consultation not found' });
      }
      return res.status(200).json(consulta);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getAll(req, res) {
    try {
      const consultas = await ConsultaModel.findAll();
      return res.status(200).json(consultas);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new ConsultaController();