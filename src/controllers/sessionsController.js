const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const clientes = require('../models/clientes');
const bcryptjs = require('bcryptjs');

function checkPassword(passwordEntry, password) {
    return bcryptjs.compareSync(passwordEntry, password);
}

exports.getToken = (req, res, next) => {
    const { name, password: passwordEntry } = req.body;
    const user = clientes.find(e => e.nome == name)

    if (!user) {
        return res.status(401).send({ mensagem: "Usuário não encontrado!" });
    }
    const { id, nome, hashPass } = user;

    try {
        checkPassword(passwordEntry, hashPass);
    } catch (e) {
        return res.status(401).send({ mensagem: "Senha inválida!" });
    }
    try {
        return res.send({
            user: {
                id,
                nome
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }) 
        })
    } catch (e) {
        return res.status(401).send({ error: 'erro' });
    }
}
