const { Router } = require('express');

const UsuarioController = require('../src/controllers/usuario-controller');
const AgendamentoController = require('../src/controllers/agendamento-controller');
const ReceitaController = require('../src/controllers/receita-controller');
const ConsultaController = require('../src/controllers/consulta-controller');

const { authMiddleware } = require('../src/database/middleware/auth-middleware');




const routes = Router();

// usuarios
routes.post('/registerUsuario', UsuarioController.create);
routes.post('/loginUsuario', UsuarioController.login);
routes.put('/editarUsuario', authMiddleware,  UsuarioController.update);
routes.delete('/deletarUsuario', authMiddleware, UsuarioController.delete);

// atendimento
routes.post('/agendamento', authMiddleware, AgendamentoController.create);
routes.put('/editar', authMiddleware, AgendamentoController.update);
routes.delete('/deletar', authMiddleware, AgendamentoController.delete);

// consulta
routes.post('/prontuario', authMiddleware, ConsultaController.create);
routes.put('/editar', authMiddleware, ConsultaController.create);
routes.put('/editar', authMiddleware, ConsultaController.update);
routes.delete('/deletar', authMiddleware, ConsultaController.delete);

// receita
routes.post('/receita', authMiddleware, ReceitaController.create);

module.exports = { routes };