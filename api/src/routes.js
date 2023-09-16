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
routes.delete('/deletarUsuario', authMiddleware, UsuarioController.delete);
routes.get('/listarUsuarios/:page', UsuarioController.getAll);


// atendimento
routes.post('/registerAgendamento', authMiddleware, AgendamentoController.create);
routes.put('/editarAgendamento', authMiddleware, AgendamentoController.update);
routes.delete('/deletarAgendamento', authMiddleware, AgendamentoController.delete);

// consulta
routes.post('/registrarProntuario', authMiddleware, ConsultaController.create);
routes.put('/editarProntuario', authMiddleware, ConsultaController.update);
routes.delete('/deletarProntuario', authMiddleware, ConsultaController.delete);

// paciente
routes.post('/registrarPaciente', authMiddleware, PacienteController.create);

module.exports = { routes };