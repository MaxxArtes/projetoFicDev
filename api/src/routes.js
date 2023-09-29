const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const { consultarAgendamentos } = require('./controllers/agendamento-controller.js');

//cria um array de validações
const loginValidations = [
  check('email').isEmail().withMessage('Invalid email'),
  check('password').isLength({ min: 6 }).withMessage('Senha tem que conter mais que 6 characters')
];

const UsuarioController = require('./controllers/usuario-controller');
const AgendamentoController = require('../src/controllers/agendamento-controller');
const PacienteController = require('../src/controllers/paciente-controller');
const ConsultaController = require('../src/controllers/consulta-controller');

const { authMiddleware } = require('../src/database/middleware/auth-middleware');



const routes = Router();

// usuarios
routes.post('/registerUsuario', UsuarioController.create);
routes.post('/loginUsuario', UsuarioController.login);
routes.put('/editarUsuario/:id', authMiddleware, UsuarioController.update);
routes.delete('/deletarUsuario/:id', authMiddleware, UsuarioController.delete);
routes.get('/listarUsuarios/:page', UsuarioController.getAll);
routes.get('/verificarUsuarioPorEmail/:email', UsuarioController.verificarUsuarioPorEmail);
routes.get('/buscarUsuarioPorNome/:nome', UsuarioController.buscarUsuarioPorNome);
routes.get('/buscarMedicos', UsuarioController.totalmedicos);
routes.get('/perfil/:token', UsuarioController.perfil);


// atendimento
routes.post('/registerAgendamento', authMiddleware, AgendamentoController.create);
routes.put('/editarAgendamento/:id', authMiddleware, AgendamentoController.update);
routes.delete('/deletarAgendamento/:id', authMiddleware, AgendamentoController.delete);
routes.delete('/deletarAgendamento/:id', authMiddleware, AgendamentoController.delete);
routes.get('/agendamentos/:page', AgendamentoController.consultarAgendamentosEndpoint);

// consulta
routes.post('/registrarProntuario', authMiddleware, ConsultaController.create);
routes.put('/editarProntuario', authMiddleware, ConsultaController.update);
routes.delete('/deletarProntuario/:id', authMiddleware, ConsultaController.delete);
routes.get('/listarConsultas/:page', authMiddleware, ConsultaController.getAll);

// paciente
routes.post('/registrarPaciente', authMiddleware, PacienteController.create);
routes.get('/listarPacientes/:page', PacienteController.getAll);
routes.delete('/deletarPacientes/:id', PacienteController.delete);
routes.delete('/editarPacientes/:id', PacienteController.update);

//dash
routes.get('/totalUsuarios', UsuarioController.totalUsuarios);
module.exports = { routes };