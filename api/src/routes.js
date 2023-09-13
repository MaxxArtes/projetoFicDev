const { Router } = require('express');
const { check, validationResult } = require('express-validator');

//cria um array de validações
const loginValidations = [
  check('email').isEmail().withMessage('Invalid email'),
  check('password').isLength({ min: 6 }).withMessage('Password must have at least 6 characters')
];

const UsuarioController = require('../src/controllers/usuario-controller');
const AgendamentoController = require('../src/controllers/agendamento-controller');
const PacienteController = require('../src/controllers/paciente-controller');
const ConsultaController = require('../src/controllers/consulta-controller');

const { authMiddleware } = require('../src/database/middleware/auth-middleware');



const routes = Router();

// usuarios
routes.post('/registerUsuario', UsuarioController.create);
routes.post('/login', loginValidations, UsuarioController.login);
routes.put('/editarUsuario', authMiddleware,  UsuarioController.update);
routes.delete('/deletarUsuario', authMiddleware, UsuarioController.delete);
routes.get('/listarUsuarios', UsuarioController.getAll);


// atendimento
routes.post('/agendamento', authMiddleware, AgendamentoController.create);
routes.put('/editar', authMiddleware, AgendamentoController.update);
routes.delete('/deletar', authMiddleware, AgendamentoController.delete);

// consulta
routes.post('/prontuario', authMiddleware, ConsultaController.create);
routes.put('/editar', authMiddleware, ConsultaController.update);
routes.delete('/deletar', authMiddleware, ConsultaController.delete);

// paciente
routes.post('/paciente', authMiddleware, PacienteController.create);

module.exports = { routes };