const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // Extrai o token do cabeçalho Authorization
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ erro: 'Token não fornecido' });
        }

        // Verifica se o token é válido
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Armazena o id do usuário decodificado em req.usuarioId (caso queira usar no controller)
        req.usuarioId = decoded.id;

        // Se tudo deu certo, chama o próximo middleware/controller
        next();
    } catch (error) {
        return res.status(401).json({ erro: 'Token inválido ou expirado', detalhe: error.message });
    }
};
