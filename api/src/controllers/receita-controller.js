const { ReceitaModel } = require('./models/receitaModel');
const { UserView } = require('../views/user-view');

class ReceitaController {
  async create(req, res) {
    try {
      const { name, data, horario, unidade_saude, descricao } = req.body;
      const receita = await ReceitaModel.create({
        name,
        data,
        horario,
        unidade_saude,
        descricao
      });
      return res.status(201).json(receita);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, data, horario, unidade_saude, descricao } = req.body;
      const receita = await ReceitaModel.update(
        {
          name,
          data,
          horario,
          unidade_saude,
          descricao
        },
        { where: { id } }
      );
      return res.status(200).json(receita);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await ReceitaModel.destroy({ where: { id } });
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const receita = await ReceitaModel.findByPk(id);
      if (!receita) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
      return res.status(200).json(receita);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getAll(req, res) {
    try {
      const receitas = await ReceitaModel.findAll();
      return res.status(200).json(receitas);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new ReceitaController();
