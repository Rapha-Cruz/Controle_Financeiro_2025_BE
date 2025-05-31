const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

////////precisa incluir essa linha para o autenticar o token
const autenticar = require('../middlewares/autenticar');

// Rotas de autenticação e usuários
router.post('/registrar', usuariosController.registrarUsuario);
router.post('/login', usuariosController.loginUsuario);
// router.get('/getUsuarioPorId/:id', autenticar, usuariosController.getUsuarioPorId);
router.get('/getUsuarioPorId/:id', usuariosController.getUsuarioPorId);

// c) Seleção de todos os usuários cadastrados
router.get('/getTodosUsuarios', usuariosController.getTodosUsuarios);

module.exports = router;
