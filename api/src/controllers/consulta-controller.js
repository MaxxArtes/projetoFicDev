const { ConsultaModel } = require('../models/consulta-model');
//const filtrarPorData = require('./util/filtroData');

// const { UserView } = require('../views/user-view');

class ConsultaController {
  async create(req, res) {
    try {
      const { historico_clinico, descricao, id_paciente, receita} = req.body;
      console.log("dsfsdfsdfsdfsd", historico_clinico, descricao, id_paciente, receita)
      const consulta = await ConsultaModel.create({
        id_paciente,
        receita,
        historico_clinico,
        descricao,
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

module.exports = new ConsultaController();