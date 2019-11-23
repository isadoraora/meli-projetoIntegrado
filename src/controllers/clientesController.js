const Clientes = require('../models/clientes');
const Joi = require('joi');

exports.get = (req, res) => {
    Clientes.find(function (err, clientes) {
        if (err) res.status(500).send(err);
        res.status(200).send(clientes);
    })
}

exports.post = (req, res) => {
    let cliente = new Clientes(req.body);
    cliente.save(function (err) {
        if (err) res.status(500).send(err);
        res.status(201).send({
            status: true,
            mensagem: "Cliente incluído com sucesso! :)"
        });
    })
}

// exports.getCompradoras = (req, res) => {
//     Clientes.find(function (err, clientes) {
//         if (err) res.status(500).send(err);
//         const compradora = clientes.filter(item => item.comprou === true)
//         const compradoras = compradora.map(item => item.nome + item.email);
//         res.status(200).send(compradoras)
//     })
// }
//outra opção pro getCompradoras
exports.getCompradoras = (req, res) => {
    Clientes.find({ comprou: true }, function (err, clientes) {
        if (err) res.status(500).send(err);
        const clientesRetorno = clientes.map(c => {
            return {
                nome: c.nome,
                email: c.email
            }
        })
        res.status(200).send(clientesRetorno)
    })
}
// exports.getClienteCpf = (req, res) => {
//     const cpfCli = req.params.cpf;
//     Clientes.find(cpfCli, function (err, cliente) {
//         if (err) res.status(500).send(err);

//         if (!cliente) {
//             return res.status(200).send({ message: `Infelizmente não localizamos essa cliente de cpf: ${cpfCli}` })
//         }
//         res.status(200).send(cliente);
//     })
// }

exports.getClienteCpf = (req, res) => {
    const cpf = req.params.cpf;
    Clientes.find({ cpf }, function (err, cliente) {
        if (err) res.status(500).send(err);

        res.status(200).send(cliente)
    })
}
// const valida = (campos) => {
//     const schema = {
//         nome: Joi.string().min(1).required(),
//         email: Joi.string().min(1).required(),
//     }
//     const validation = Joi.validate(campos, schema);
//     if (validation.error) {
//         return false
//     }
//     return true;
// }

// exports.updateCliente = (req, res) => {
//     if (!valida(req.body)) return res.status(400).send('Campos inválidos')

//     Clientes.update(
//         { cpf: req.params.cpf },
//         { $set: req.body },
//         { upsert: true },
//         function (err) {
//             if (err) return res.status(500).send(err)
//             res.status(200).send({ mensagem: "Atualizado com sucesso" })
//         }
//     )
// }
// exports.deletarCliente = (req, res) =>{
//     const idCliente
// }
exports.updateCliente = (req, res) => {

    if (!validaFormulario(req.body)) return res.status(400).send({ mensagem: "campos inválidos" });

    Clientes.update(
        { cpf: req.params.cpf },
        { $set: req.body },
        { upsert: true },
        function (err) {
            if (err) return res.status(500).send(err);
            res.status(200).send({ mensagem: "Atualizado com sucesso!" });
        })

}

const validaFormulario = (campos) => {

    const schema = {
        nome: Joi.string().min(1).required(),
        email: Joi.string().min(1).required(),
    }

    const validation = Joi.validate(campos, schema);

    if (validation.error) {
        return false;
    }

    return true;

}
exports.deletarCliente = (req, res) => {
    const cpf = req.params.cpf;

    Clientes.findOne({ cpf }, function (err, cliente) {
        if (err) return res.status(500).send(err);

        if (!cliente) return res.status(200).send({ mensagem: `Infelizmente não localizamos o cliente de cpf ${cpf}` })
        cliente.remove(function (err) {
            if (!err) {
                res.status(200).send({ mensagem: "Cliente removida com sucesso!" })
            }

        })
    })
}
