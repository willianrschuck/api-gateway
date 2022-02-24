const JWT = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).json({ 'auth': 'false', 'message': 'Token não informado' });
    }
    JWT.verify(token, process.env.PUBLIC_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ 'auth': 'false', 'message': 'Token inválido' });
        }
        req.userId = decoded.id;
        req.userEmail = decoded.email
        req.userName = decoded.username;
        next();
    })
}

module.exports = {
    verifyToken
}