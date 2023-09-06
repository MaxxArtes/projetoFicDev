const { Sequelize } = require('sequelize');
const configDatabase = require('./config');

const { UsuarioModel } = require('../models/usuario-model');
const { ConsultaModel } = require('../models/consulta-model'); 
const { ReceitaModel } = require('../models/receita-model'); 
const { AgendamentoModel } = require('../models/agendamento-model'); 

const database = new Sequelize(configDatabase);

// init models
UsuarioModel.init(database);
ConsultaModel.init(database);
ReceitaModel.init(database);
AgendamentoModel.init(database);

// // relationships
// UsuarioModel.associate(database.models);
// ConsultaModel.associate(database.models);
// ReceitaModel.associate(database.models);
// AgendamentoModel.associate(database.models);

module.exports = {database};