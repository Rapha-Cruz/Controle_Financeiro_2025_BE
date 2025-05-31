// models/movimentacaoModel.js
const conexao = require('../conexao');

const criarMovimentacao = async (id_usuario, tipo, valor, descricao, data_movimentacao, id_tipo_pagamento) => {
    const query = 'INSERT INTO movimentacoes (id_usuario, tipo, valor, descricao, data_movimentacao, id_tipo_pagamento) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const valores = [id_usuario, tipo, valor, descricao, data_movimentacao, id_tipo_pagamento];

    // console.log(query);
    // console.log(valores);

    const { rows } = await conexao.query(query, valores);
    return rows[0];
};

// a) Busca todas as movimentações
const getTodasMovimentacoes = async () => {
    const query = 'SELECT * FROM movimentacoes';
    const { rows } = await conexao.query(query);
    return rows;
};

// b) Busca movimentações por ID de usuário
const getMovimentacoesPorUsuario = async (id_usuario) => {
    const query = 'SELECT * FROM movimentacoes WHERE id_usuario = $1';
    const { rows } = await conexao.query(query, [id_usuario]);
    return rows;
};

// d) Atualiza uma movimentação
const atualizarMovimentacao = async (id, dados) => {
    const { descricao, valor, tipo, id_tipo_pagamento } = dados;
    const query = `
        UPDATE movimentacoes 
        SET descricao = $1, valor = $2, tipo = $3, id_tipo_pagamento = $4
        WHERE id = $5 RETURNING *`;
    const { rows } = await conexao.query(query, [descricao, valor, tipo, id_tipo_pagamento, id]);
    return rows[0];
};

// e) Exclui uma movimentação
const excluirMovimentacao = async (id) => {
    const query = 'DELETE FROM movimentacoes WHERE id = $1';
    await conexao.query(query, [id]);
};

// f) busca movimentações com nomes de usuario e tipo de pagamento
const getMovimentacoesUsuarioTipo = async () => {
    const query = 'SELECT m.id, m.descricao, m.valor, m.tipo, m.data_movimentacao, m.id_usuario, m.id_tipo_pagamento, u.nome, tp.nome_tipo_pagamento FROM movimentacoes m JOIN usuarios u ON m.id_usuario = u.id JOIN tipo_pagamentos tp ON m.id_tipo_pagamento = tp.id_tipo_pagamento';
    const { rows } = await conexao.query(query);
    return rows;
}

module.exports = {
    criarMovimentacao,  
    getTodasMovimentacoes,
    getMovimentacoesPorUsuario,
    atualizarMovimentacao,
    excluirMovimentacao,
    getMovimentacoesUsuarioTipo
};

