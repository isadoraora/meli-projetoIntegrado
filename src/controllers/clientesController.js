const Clientes = require('../models/clientes');

const fs = require('fs');

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
        res.status(201).send(cliente);
    })
}

exports.getCompradoras = (req, res) => {
    Clientes.find(function (err, clientes) {
        if (err) res.status(500).send(err);
        const compradora = clientes.filter(item => item.comprou === true)
        const compradoras = compradora.map(item => item.nome + item.email);
        res.status(200).send(compradoras)
    })
}

exports.getClienteCpf = (req, res) => {
    const cpfCli = req.params.cpf;
    Clientes.find(cpfCli, function (err, cliente) {
        if (err) res.status(500).send(err);
        
        if (!cliente) {
            return res.status(200).send({ message: `Infelizmente não localizamos essa cliente de cpf: ${cpfCli}` })
        }
        res.status(200).send(cliente);
    })
}