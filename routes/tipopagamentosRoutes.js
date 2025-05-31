const express = require('express');
const router = express.Router();
const tipopagamentosController = require('../controllers/tipopagamentosController');

router.get('/getTipoPagamento', tipopagamentosController.getTipoPagamento);

module.exports = router;