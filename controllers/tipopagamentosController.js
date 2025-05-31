const tipopagamentosModel = require('../models/tipopagamentosModel');

const getTipoPagamento = async (req, res) => {
    try {
        const tiposPagamento = await tipopagamentosModel.getTipoPagamento();
        res.json(tiposPagamento);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar tipo de pagamentos', detalhe: error.message });
    }
};

module.exports = {
    getTipoPagamento
};