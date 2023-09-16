require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UsuarioModel } = require('../models/usuario-model');
// const { UserView } = require('../views/user-view');
const salt = bcrypt.genSaltSync(10);
const { check, validationResult } = require('express-validator')
const { Op } = require('sequelize');
const paginate = require('../utils/paginacao');



const loginValidations = [
  check('email').isEmail().withMessage('email invalido'),
  check('password').isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres')
];


class UsuarioController {
  async create(req, res) {
    try {
      const { nome, password, cpf, cargo, especialidade, email } = req.body;

      const passwordHash = bcrypt.hashSync(password, salt);

      console.log("o hash é :", passwordHash)

      const usuario = await UsuarioModel.create({
        nome,
        password: passwordHash,
        cpf,
        cargo,
        especialidade,
        email
      });
      return res.status(201).json(usuario);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, password, cpf, cargo, especialidade, email } = req.body;

      let passwordHash;
      if (password) {
        passwordHash = bcrypt.hashSync(password, salt)
      }

      const usuario = await UsuarioModel.update(
        {
          nome,
          password: passwordHash,
          cpf,
          cargo,
          especialidade,
          email
        },
        { where: { id_usuario: id } }
      );
      return res.status(200).json({ mensage: "usuario editado com sucesso!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await UsuarioModel.destroy({ where: { id_usuario: id } });
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
      let usuarios; // Variável para armazenar os usuários
  
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
      usuarios = await paginate(UsuarioModel, page, limit, filterOptions);
      
  
      return res.status(200).json(usuarios); // Retorna os usuários encontrados e paginados
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }  
  
  


  async login(req, res) {
    try {
      const errors = validationResult(req); //pega os erros das validações
      if (!errors.isEmpty()) {
        //se tiver algum erro, retorna um status 400 com os erros
        return res.status(400).json({ errors: errors.array() });
      }
      //se não tiver erro, continua com o login normalmente
      const { email, password } = req.body;
      const usuario = await UsuarioModel.findOne({
        where: { email }
      });
      if (!usuario) {
        return res.status(404).json({ error: 'User not found' });
      }


      if (!bcrypt.compareSync(password, usuario.password)) {
        return res.status(401).json({ error: 'Senha invalida' });
      }
      const token = jwt.sign({ id: usuario.id }, process.env.SECRET, {
        expiresIn: 86400
      });
      return res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

}

module.exports = new UsuarioController();
