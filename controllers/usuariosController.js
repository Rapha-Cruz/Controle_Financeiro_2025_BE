// controllers/usuarioController.js
const usuarioModel = require('../models/usuariosModel');


const registrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
        //console.log(nome, email, senha);
        const senhaHash = await usuarioModel.gerarSenhaHash(senha);
        // console.log(senhaHash);
        const usuario = await usuarioModel.criarUsuario(nome, email, senhaHash);
        res.status(201).json(usuario);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao registrar usuário', detalhe: error.message });
    }
};

const loginUsuario = async (req, res) => {
    const { email, senha } = req.body;
    try {
        const usuario = await usuarioModel.buscarUsuarioPorEmail(email);
        // console.log("Login 1");
        if (!usuario) {
            return res.status(401).json({ erro: 'Usuário não encontrado' });
        }
        //console.log("Login 2");
        const senhaValida = await usuarioModel.compararSenhas(senha, usuario.senha);
        if (!senhaValida) {
            return res.status(401).json({ erro: 'Senha inválida' });
        }
        // console.log("Login 3");
        // console.log(usuario.id);
        // const token = usuarioModel.gerarTokenJWT(usuario.id);
        // console.log("Login 4");
        // console.log(usuario.id);
        //sem token
        res.json({ mensagem: 'Login realizado com sucesso', usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email } });
        //com token
        // res.json({ token, usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email } });
    } catch (error) {
        res.status(500).json({ erro: 'Erro no login', detalhe: error.message });
    }
};

const getUsuarioPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await usuarioModel.buscarUsuarioPorId(id);
        if (!usuario) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar usuário', detalhe: error.message });
    }
};


// c) Seleciona todos os usuários cadastrados
const getTodosUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioModel.buscarTodosUsuarios();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar usuários', detalhe: error.message });
    }
};

module.exports = {
    registrarUsuario,
    loginUsuario,
    getUsuarioPorId,
    getTodosUsuarios
};