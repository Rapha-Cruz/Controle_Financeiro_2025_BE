// controllers/movimentacaoController.js
const movimentacaoModel = require('../models/movimentacoesModel');

const adicionarMovimentacao = async (req, res) => {
    const { id_usuario, tipo, valor, descricao, data_movimentacao, id_tipo_pagamento }
        = req.body;

    try {
        const movimentacao = await
            movimentacaoModel.criarMovimentacao(id_usuario, tipo,
                valor, descricao, data_movimentacao, id_tipo_pagamento);
        res.status(201).json(movimentacao);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao adicionar movimentação', detalhe: error.message });
    }
};

// a) Seleciona todas as movimentações
const getTodasMovimentacoes = async (req, res) => {
    try {
        const movimentacoes = await movimentacaoModel.getTodasMovimentacoes();
        res.json(movimentacoes);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar movimentações', detalhe: error.message });
    }
};

// b) Seleciona movimentações de um usuário pelo ID
const getMovimentacoesPorUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const movimentacoes = await movimentacaoModel.getMovimentacoesPorUsuario(id);
        res.json(movimentacoes);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar movimentações do usuário', detalhe: error.message });
    }
};

// d) Atualiza uma movimentação
const atualizarMovimentacao = async (req, res) => {
    const { id } = req.params;
    const { descricao, valor, tipo, id_tipo_pagamento } = req.body;
    try {
        const movimentacaoAtualizada = await movimentacaoModel.atualizarMovimentacao(id, { descricao, valor, tipo, id_tipo_pagamento });
        res.json(movimentacaoAtualizada);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao atualizar movimentação', detalhe: error.message });
    }
};

// e) Exclui uma movimentação
const excluirMovimentacao = async (req, res) => {
    const { id } = req.params;
    try {
        await movimentacaoModel.excluirMovimentacao(id);
        res.json({ mensagem: 'Movimentação excluída com sucesso' });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao excluir movimentação', detalhe: error.message });
    }
};

//f) selecionar valores para o relatorio ou dashboard
const getMovimentacoesUsuarioTipo = async (req, res) => {
    try {
        const movimentacao = await movimentacaoModel.getMovimentacoesUsuarioTipo();
        res.json(movimentacao);
    } catch(error){
        res.status(500).json({ erro: 'Erro ao buscar movimentação', detalhe: error.message});
    }
};

module.exports = {
    adicionarMovimentacao,    
    getTodasMovimentacoes,    
    getMovimentacoesPorUsuario,
    atualizarMovimentacao,
    excluirMovimentacao,
    getMovimentacoesUsuarioTipo
};