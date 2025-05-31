const conexao = require('../conexao');

const getTipoPagamento = async() => {
    const query = 'SELECT * FROM tipo_pagamentos';
    const { rows } = await conexao.query(query);
    return rows;
};

module.exports = {
    getTipoPagamento
};