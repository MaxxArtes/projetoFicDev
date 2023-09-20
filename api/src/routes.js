const { Router } = require('express');
const { check, validationResult } = require('express-validator');

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


// atendimento
routes.post('/registerAgendamento', authMiddleware, AgendamentoController.create);
<<<<<<< HEAD
routes.put('/editarAgendamento/:id', authMiddleware, AgendamentoController.update);
routes.delete('/deletarAgendamento/:id', authMiddleware, AgendamentoController.delete);
=======
routes.put('/editarAgendamento', authMiddleware, AgendamentoController.update);
routes.delete('/deletarAgendamento', authMiddleware, AgendamentoController.delete);
routes.get('/listarAgendamento', authMiddleware, AgendamentoController.getAll);
>>>>>>> d5272bf347d5ce3a94ae5b68875e87d05541e457

// consulta
routes.post('/registrarProntuario', authMiddleware, ConsultaController.create);
routes.put('/editarProntuario', authMiddleware, ConsultaController.update);
routes.delete('/deletarProntuario', authMiddleware, ConsultaController.delete);

// paciente
routes.post('/registrarPaciente', authMiddleware, PacienteController.create);
routes.get('/listarPacientes/:page', PacienteController.getAll);

//dash
routes.get('/totalUsuarios', UsuarioController.totalUsuarios); 
module.exports = { routes };