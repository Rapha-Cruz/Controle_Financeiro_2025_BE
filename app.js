require('dotenv').config();
const express = require('express');
const cors = require('cors');
const conexao = require('./conexao'); // Importa a conexão com o banco
const usuariosRoutes = require('./routes/usuariosRoutes'); // Rotas de usuários
const movimentacoesRoutes = require('./routes/movimentacoesRoutes'); // Rotas de movimentações
const tipopagamentosRoutes = require('./routes/tipopagamentosRoutes'); // Rotas de tipo de pagamentos

const app = express();

// Middlewares
app.use(cors()); // Habilita CORS
app.use(express.json()); // Permite receber JSON no body das requisições

// Rotas
app.use('/usuarios', usuariosRoutes);       
app.use('/movimentacoes', movimentacoesRoutes);
app.use('/tipopagamentos', tipopagamentosRoutes);

// Rota principal (teste de conexão)
//app.get('/', (req, res) => {
app.get('/', async (req, res) => {
    //res.send('API funcionando!');
    try {
        const result = await conexao.query('SELECT NOW()');
        res.send(`Banco conectado com sucesso: ${result.rows[0].now}`);
    } catch (err) {
        res.status(500).send('Erro ao conectar ao banco: ' + err.message);
    }
});

// Inicia o servidor
//const port = 3000;
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor executando em: http://localhost:${port}`);
});
