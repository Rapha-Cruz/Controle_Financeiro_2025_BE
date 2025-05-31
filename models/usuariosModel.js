// models/usuarioModel.js
const conexao = require('../conexao');
const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');

const criarUsuario = async (nome, email, senhaHash) => {
    const query = 'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email';
    // console.log("1");
    const valores = [nome, email, senhaHash];
    // console.log("2");
    // console.log(query)
    // console.log(valores)
    const { rows } = await conexao.query(query, valores);
    // console.log("3");
    return rows[0];
};

const buscarUsuarioPorEmail = async (email) => {
    const query = 'SELECT * FROM usuarios WHERE email = $1';
    const { rows } = await conexao.query(query, [email]);
    return rows[0];
};

const buscarUsuarioPorId = async (id) => {
    const query = 'SELECT id, nome, email, saldo FROM usuarios WHERE id = $1';
    const { rows } = await conexao.query(query, [id]);
    return rows[0];
};

const gerarSenhaHash = async (senha) => {
    console.log(bcrypt.hash(senha, 10));
    return bcrypt.hash(senha, 10);
};

const compararSenhas = async (senha, senhaHash) => {
    return bcrypt.compare(senha, senhaHash);
};

const gerarTokenJWT = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// c) Busca todos os usuários cadastrados
const buscarTodosUsuarios = async () => {
    const query = 'SELECT id, nome, email, saldo FROM usuarios';
    const { rows } = await conexao.query(query);
    return rows;
};

module.exports = {
    criarUsuario,
    buscarUsuarioPorEmail,
    buscarUsuarioPorId,
    gerarSenhaHash,
    compararSenhas,
    gerarTokenJWT,
    buscarTodosUsuarios
};