const { ConsultaModel } = require('../models/consulta-model');
//const filtrarPorData = require('./util/filtroData');

// const { UserView } = require('../views/user-view');

class ConsultaController {
  async create(req, res) {
    try {
      const { historico_clinico, descricao, paciente } = req.body;
      const consulta = await ConsultaModel.create({
        historico_clinico,
        descricao,
        paciente
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
      const { historico_clinico, descricao, paciente } = req.body;
      const consulta = await ConsultaModel.update(
        {
          historico_clinico,
          descricao,
          paciente
        },
        { where: { id_consulta: id } }
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
      await ConsultaModel.destroy({ where: { id_consulta: id } });
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }


  async getAll(req, res) {
    try {
      const { name } = req.query; //parâmetro da consulta
      let consultas; //variável para armazenar as consultas
      if (name) {
        //se tiver o parâmetro de consulta, filtra por nome
        consultas = await ConsultaModel.findAll({ where: { name: { [Op.iLike]: '%' + name + '%' } } });
      } else {
        //se não tiver o parâmetro de consulta, retorna todas as consultas
        consultas = await ConsultaModel.findAll();
      }
      return res.status(200).json(consultas); //retorna as consultas encontradas
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new ConsultaController();